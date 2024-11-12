import { renderDetailsPost } from '../components/post-component.js';
import { addCommentToList } from '../components/comment-component.js';
import { createModal, openModal, closeModal } from '../components/modal-component.js';
import { fetchPostDetails, fetchComments, deletePost, deleteComment, addComment, likes, commentsCount } from '../api/api.js';


//더미 데이터
const dummyPost = {
    board_id: 1,
    page_title: "더미 게시글 제목",
    nickname: "작성자",
    create_at: "2024-11-08T12:00:00Z",
    page_image: "https://via.placeholder.com/150",
    page_content: "이것은 더미 게시글 내용입니다.",
    likes_count: 10,
    view_count: 100,
    comment_count: 5
};

const dummyComments = [
    {
        comment_id: 1,
        user_id: 1,
        nickname: "사용자1",
        create_at: "2024-11-08T12:30:00Z",
        content: "첫 번째 더미 댓글입니다.",
        profile: "https://via.placeholder.com/36"
    },
    {
        comment_id: 2,
        user_id: 2,
        nickname: "사용자2",
        create_at: "2024-11-08T13:00:00Z",
        content: "두 번째 더미 댓글입니다.",
        profile: "https://via.placeholder.com/36"
    }
];





document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('board_id');
    let liked=false;

    try {
        
        const post = await fetchPostDetails(boardId); 
        renderDetailsPost(post); 
     
         const results = await fetchComments(boardId);
   
         const userId=results.userId
        
         results.comment.forEach(c=> addCommentToList(c,userId)); 

         document.querySelector('.delete-post-button').addEventListener('click', () => {
            const { modal, confirmButton } = createModal({
                title: '게시글을 삭제하시겠습니까?',
                message: '삭제한 내용은 복구할 수 없습니다.',
                confirmText: '확인',
                cancelText: '취소'
            });
            openModal(modal);

            confirmButton.addEventListener('click', async () => {
                try {
                    const result = await deletePost(boardId);
                    closeModal(modal);
                    window.location.href = '/board';
                } catch (error) {
                    console.error(error);
                    alert('게시글 삭제에 실패했습니다.');
                }
            });
        });

        document.querySelectorAll('.delete-comment-button').forEach(button => {
            button.addEventListener('click', () => {
                const commentId = button.closest('.comment-details').getAttribute('data-comment-id');
                const { modal, confirmButton } = createModal({
                    title: '댓글을 삭제하시겠습니까?',
                    message: '삭제한 내용은 복구할 수 없습니다.',
                    confirmText: '확인',
                    cancelText: '취소'
                });
                openModal(modal);

                confirmButton.addEventListener('click', async () => {
                    try {
                       
                       await deleteComment(boardId, commentId);
                        closeModal(modal);
                        document.querySelector(`.comment-details[data-comment-id="${commentId}"]`).parentElement.remove();
                    } catch (error) {
                        console.error(error);
                        alert('댓글 삭제에 실패했습니다.');
                    }
                });
            });
        });

        document.querySelector('.modify-post-button').addEventListener('click', () => {     
            window.location.href = `/edit-post/${boardId}`;
        });
    } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }


    document.getElementById('likeBtn').addEventListener('click',async()=>{
        const likeButton=document.getElementById('likeBtn');
        const likeCnt = document.getElementById('likeCnt');
        
        if(!liked){
        
        let currentLikes = parseInt(likeCnt.textContent, 10);
        currentLikes += 1;
        likeCnt.textContent = currentLikes;
        liked=true;
        try{
            const result = await likes(boardId,likeCnt);
            if(!result.success){
                throw new Error('좋아요 실패');
            }
        } catch(error){
            console.error('좋아요 클릭 오류:',error);
        }
    }
    
    })

});
    

document.getElementById('comment-submit').addEventListener('click', async () => {
    const commentContent = document.getElementById('commentInput').value;
    const urlParams = new URLSearchParams(window.location.search);
    const boardId =  parseInt(urlParams.get('board_id'), 10);

    if (!commentContent.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
    }

    try {
        console.log(boardId,commentContent);

        const result = await addComment(boardId, commentContent);
        console.log(result);
        if(result.success){
            document.getElementById('commentInput').value = ''; 
            addCommentToList(result.comment, result.userId);
            await commentsCount(boardId);
            window.location.href = `/public/detail-post.html?board_id=${boardId}`;
        } else {
            alert(result.message);
        }
       
    } catch (error) {
        console.error("댓글 작성 중 오류:", error);
    }
});