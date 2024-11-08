import { renderDetailsPost } from '../components/post-component.js';
import { addCommentToList } from '../components/comment-component.js';
import { createModal, openModal, closeModal } from '../components/modal-component.js';
import { fetchPostDetails, fetchComments, deletePost, deleteComment, addComment } from '../api/api.js';


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
    

    try {
        //const response = await fetchPostDetails(boardId); 
        //const post = await response.json(); 
        renderDetailsPost(dummyPost); 

         //const results = await fetchComments(boardId);
         //console.log(results.resultData);
        // const comments=results.resultData;
         const userId=1// 유저 아이디 임의 설정 results.userId; 
         
         dummyComments.forEach(comment => addCommentToList(comment,userId)); 

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
                   // const result = await deletePost(boardId);
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
                        //await deleteComment(boardId, commentId);
                        closeModal(modal);
                        document.querySelector(`.comment-details[data-comment-id="${commentId}"]`).parentElement.remove();
                    } catch (error) {
                        console.error(error);
                        alert('댓글 삭제에 실패했습니다.');
                    }
                });
            });
        });
    } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
});
    

document.getElementById('comment-submit').addEventListener('click', async () => {
    const commentContent = document.getElementById('commentInput').value;
    const urlParams = new URLSearchParams(window.location.search);
    const boardId =  parseInt(urlParams.get('board_id'), 10);

    if (!commentContent.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
    }
    // 임시 더미 댓글 추가
    const newDummyComment = {
        board_id : 1,
        comment_id: Date.now(),  // 고유 ID 대체
        user_id: 1,
        nickname: "현재 사용자",
        create_at: new Date().toISOString(),
        content: commentContent,
        profile: "https://via.placeholder.com/36"
    };

    try {
        // const result = await addComment(boardId, commentContent);
        // if(result){
        //     document.getElementById('commentInput').value = ''; 
        //     addCommentToList(result.resultData, result.userId);
         
        // } else {
        //     alert(result.message);
        // }
        document.getElementById('commentInput').value = ''; 
        addCommentToList(newDummyComment, newDummyComment.user_id);

    } catch (error) {
        console.error("댓글 작성 중 오류:", error);
    }
});

