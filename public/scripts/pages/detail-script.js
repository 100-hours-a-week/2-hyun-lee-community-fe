import { renderDetailsPost } from '../components/post-component.js';
import { addCommentToList } from '../components/comment-component.js';
import { createModal, openModal, closeModal } from '../components/modal-component.js';
import { fetchPostDetails, fetchComments, deletePost, deleteComment, addComment, updatePostLikes, updateComment, updatePostViews,getComment, userLikeStatus} from '../api/api.js';
import {formatDate} from '../utils/format-Date.js';


let isEditing = false; 
let editingCommentId = null; 
let commentCntSpan;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');
    let likeBtn;
    let likeCntSpan;
   
    let currentUserId;

    try {
        await updatePostViews(post_id);
        const postData = await fetchPostDetails(post_id);
        currentUserId=postData.user_id;
        console.log("post",postData.posts[0]);
        renderDetailsPost(postData.posts[0],postData.user_id); 

        likeBtn = document.getElementById('likeBtn');
        likeCntSpan = document.getElementById('likeCnt');
        commentCntSpan = document.getElementById('commentCnt');

     
        const results = await fetchComments(post_id);
        
    
        const user_id=results.user_id
        results.comments.forEach(c=> addCommentToList(c,user_id)); 
        
        document.body.addEventListener('click', async (event) => {
            if (event.target.classList.contains('delete-comment-button')) {
                const button = event.target;
                const commentElement = button.closest('.comment-details');
                const comment_id = commentElement.getAttribute('data-comment-id');
        
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
                        if (result.success) {
                            closeModal(modal);
                            commentElement.parentElement.remove();
        
                            
                            let commentCount = parseInt(commentCntSpan.textContent, 10);
                            commentCount--;
                            commentCntSpan.textContent = commentCount;
                        }
                    } catch (error) {
                        console.error(error);
                        alert('댓글 삭제에 실패했습니다.');
                    }
                });
            }
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


       

    
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('modify-comment-button')) {
         const commentElement = event.target.closest('.comment-details');
         const commentContent = commentElement.querySelector('.comment-content').textContent; 

         const commentInput = document.getElementById('commentInput');
          commentInput.value = commentContent;

          const submitButton = document.getElementById('comment-submit');
          submitButton.textContent = '댓글 수정';

         isEditing = true;
         editingCommentId = commentElement.getAttribute('data-comment-id');
    }
    });


    } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }


    document.getElementById('likeBtn').addEventListener('click',async()=>{
       
        let likeCount = parseInt(likeCntSpan.textContent, 10); 
        const result=await userLikeStatus(post_id);
        const { is_exist: is_exist } = result.result;
        if (is_exist) {
            likeBtn.classList.add('liked'); 
        }
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
        const oneComment = await getComment(result.comment.comment_id);
        if(result.success){
            document.getElementById('commentInput').value = ''; 
            addCommentToList(oneComment.comments[0], result.comment.user_id);
            let commentCount = parseInt(commentCntSpan.textContent, 10); 
            commentCount++;
            commentCntSpan.textContent=commentCount; 
        } else {
            alert(result.message);
        }
       
    } catch (error) {
        console.error("댓글 작성 중 오류:", error);
    } 
    } else{
        try {
        
            const oneComment = await updateComment(post_id,editingCommentId, commentContent);
            
            if(oneComment.success){
                const element= document.querySelector(`[data-comment-id="${oneComment.comments[0].comment_id}"]`);
                
                const date = element.querySelector('.comment-date');
                const content = element.querySelector('.comment-content');
            
                content.textContent = oneComment.comments[0].comment_content;
                date.textContent = formatDate(oneComment.comments[0].create_at);
                document.getElementById('commentInput').value = ''; 
                const submitButton = document.getElementById('comment-submit');
                submitButton.textContent = '댓글 등록';
                isEditing = false;
            } else {
                alert(oneComment.message);
            }
           
        } catch (error) {
            console.error("댓글 수정 중 오류:", error);
        } 
    }

});
