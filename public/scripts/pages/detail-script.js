import { renderDetailsPost } from '../components/post-component.js';
import { addCommentToList } from '../components/comment-component.js';
import { createModal, openModal, closeModal } from '../components/modal-component.js';
import { fetchPostDetails, fetchComments, deletePost, deleteComment, addComment, updatePostLikes, updatePostCommentsCount, updateComment, updatePostViews, getLikeStatus} from '../api/api.js';



let isEditing = false; 
let editingCommentId = null; 

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');
    let likeBtn;
    let likeCntSpan;

    let currentUserId;

    try {
        
        const postData = await fetchPostDetails(post_id);
        currentUserId=postData.user_id;

        await updatePostViews(post_id); 
        renderDetailsPost(postData.posts[0],postData.user_id); 

        likeBtn = document.getElementById('likeBtn');
        likeCntSpan = document.getElementById('likeCnt');

    
        const result = await getLikeStatus(post_id);

        if (result.success && result.isLiked) {
            likeBtn.classList.add('liked'); 
        }

     
        const results = await fetchComments(post_id);
        
    
        const user_id=results.user_id
        results.comments.forEach(c=> addCommentToList(c,user_id)); 
        
        document.querySelectorAll('.delete-comment-button').forEach(button => {
            button.addEventListener('click', () => {
                const comment_id = button.closest('.comment-details').getAttribute('data-comment-id');
                const { modal, confirmButton } = createModal({
                    title: '댓글을 삭제하시겠습니까?',
                    message: '삭제한 내용은 복구할 수 없습니다.',
                    confirmText: '확인',
                    cancelText: '취소'
                });
                openModal(modal);

                confirmButton.addEventListener('click', async () => {
                    try {
                       
                       const result = await deleteComment(post_id, comment_id);
                       if(result.success){
                        closeModal(modal);
                        document.querySelector(`.comment-details[data-comment-id="${comment_id}"]`).parentElement.remove();
                        window.location.href = `/detail-post?post_id=${post_id}`;
                       }
                    } catch (error) {
                        console.error(error);
                        alert('댓글 삭제에 실패했습니다.');
                    }
                });
            });
        });

        const deleteButton = document.querySelector('.delete-post-button');
        const modifyButton = document.querySelector('.modify-post-button');

        if(deleteButton){
            deleteButton.addEventListener('click', () => {
            const { modal, confirmButton } = createModal({
                title: '게시글을 삭제하시겠습니까?',
                message: '삭제한 내용은 복구할 수 없습니다.',
                confirmText: '확인',
                cancelText: '취소'
            });
            openModal(modal);

            confirmButton.addEventListener('click', async () => {
                try {
                    const result = await deletePost(post_id);
                    closeModal(modal);
                    window.location.href = 'board';
                } catch (error) {
                    console.error(error);
                    alert('게시글 삭제에 실패했습니다.');
                }
                });
            });
            modifyButton.addEventListener('click', () => {     
            window.location.href = `/edit-post?post_id=${post_id}`;
                });
        }


       

        document.querySelectorAll('.modify-comment-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const commentElement = event.target.closest('.comment-details');
                const commentContent = commentElement.querySelector('.comment-content').textContent; 
        
                
                const commentInput = document.getElementById('commentInput');
                commentInput.value = commentContent;
        
                
                const submitButton = document.getElementById('comment-submit');
                submitButton.textContent = '댓글 수정';
        
                isEditing=true;
                editingCommentId = commentElement.getAttribute('data-comment-id'); 
            });
        });

    } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }


    document.getElementById('likeBtn').addEventListener('click',async()=>{
       
        let likeCount = parseInt(likeCntSpan.textContent, 10); 
        const liked = likeBtn.classList.contains('liked'); 

        if (liked) {
            likeCount -= 1; 
            likeBtn.classList.remove('liked');
        } else {
            likeCount += 1; 
            likeBtn.classList.add('liked');
        }
        likeCntSpan.textContent = likeCount;

            
            try{
                const result = await updatePostLikes(post_id,currentUserId);
                    if(!result.success){
                        throw new Error('좋아요 실패');
                    }
                } catch(error){
                    console.error('좋아요 클릭 오류:',error);
                }
            
            })
})


    



document.getElementById('comment-submit').addEventListener('click', async () => {
    const commentContent = document.getElementById('commentInput').value;
    const urlParams = new URLSearchParams(window.location.search);
    const post_id =  parseInt(urlParams.get('post_id'), 10);

    if (!commentContent.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
    }

    if(!isEditing){
    try {
        
        const result = await addComment(post_id, commentContent);
        if(result.success){
            document.getElementById('commentInput').value = ''; 
            addCommentToList(result.comment, result.comment.user_id);
            //await updatePostCommentsCount(post_id);
            window.location.href = `/detail-post?post_id=${post_id}`;
        } else {
            alert(result.message);
        }
       
    } catch (error) {
        console.error("댓글 작성 중 오류:", error);
    } 
    } else{
        try {
        
            const result = await updateComment(post_id,editingCommentId, commentContent);
            if(result.success){
                document.getElementById('commentInput').value = ''; 
                window.location.href = `/detail-post?post_id=${post_id}`;
            } else {
                alert(result.message);
            }
           
        } catch (error) {
            console.error("댓글 수정 중 오류:", error);
        } 
    }

});
