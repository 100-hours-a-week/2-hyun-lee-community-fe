import {formatDate} from '../utils/format-Date.js';

export function renderPosts(posts){
    const postTableBody = document.getElementById('postTableBody');
    postTableBody.innerHTML='';
    posts[0].forEach(post => {
        const newRow=document.createElement('tr');
        newRow.className = 'post-item'; 
        newRow.innerHTML=`
             <div class="post-header">
                    <h2 class=post-title data-id=${post.board_id}> ${post.page_title}</h2>
                </div>
                <div class="post-details">
                    <div class="post-details2"><span>좋아요 ${post.likes_count}</span> <span>댓글 ${post.comment_count}</span> <span>조회수 ${post.view_count}</span></div>
                    <span class="post-date">${formatDate(post.create_at)}</span>
                </div>
                <div class="post-footer">
                    <img class="author-avatar" src=${post.profile}></img>
                    <span class="author-name">${post.nickname}</span>
                </div>
        `;
        postTableBody.appendChild(newRow);
        newRow.querySelector('.post-header').addEventListener('click', () => {
            window.location.href = `/detail-post?board_id=${post.board_id}`;
        });
        
    });
}

export function renderDetailsPost(post){
    const postContainer = document.getElementById('container');
    postContainer.innerHTML = `
        <span class="title">${post.page_title}</span>
        <div class="post-header">
            <div class="post-footer">
                <div class="author-avatar"></div>
                <span class="author-name">${post.nickname}</span>
                <span class="post-date">${formatDate(post.create_at)}</span>
            </div>
            <span class="work-post">
                <button class="modify-post-button">수정</button>
                <button class="delete-post-button">삭제</button>
            </span>
        </div>
        <div class="post-details">
            <div class="post-image">
                <img src="${post.page_image}" alt="본문 이미지">
            </div>
        </div>
        <div class="post-content">
            <p>${post.page_content}</p>
        </div>
        <div class="post-stats">
            <div class="stat-item">
                <span class="stat-number">${post.likes_count}</span>
                <span class="stat-label">좋아요수</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${post.view_count}</span>
                <span class="stat-label">조회수</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${post.comment_count}</span>
                <span class="stat-label">댓글</span>
            </div>
        </div>
    `;
}

function readerCreatePost(post){

}