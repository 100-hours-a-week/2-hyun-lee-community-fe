import { formatDate } from "../utils/format-Date.js";

const BASE_URL ='http://localhost:3000';
export function addCommentToList(commentData, user_id){
    const commentList = document.getElementById('commentList');
    const newComment = document.createElement('div');
    newComment.classList.add('comment-author');
    
    const isOwner = commentData.user_id === user_id;
    const editButtons = isOwner

        ? `  <div class="comment">
            <button class="modify-comment-button">수정</button>
            <button class="delete-comment-button">삭제</button>
            </div>`
        : ''; 

    newComment.innerHTML = `
       <img class="author-avatar" src=${BASE_URL}/${commentData.profile}></img>
        <div class="comment-details" data-comment-id=${commentData.comment_id}>
            <span class="author-name">${commentData.nickname}</span>
            <span class="comment-date">${formatDate(commentData.create_at)}</span>
            <p class="comment-content">${commentData.content}</p>
             ${editButtons}
        </div>
    `;
    commentList.appendChild(newComment);
}