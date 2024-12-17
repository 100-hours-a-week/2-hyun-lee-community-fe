import {formatDate} from '../utils/format-Date.js';
import {formatCount} from '../utils/format-count.js';
import {getImageUrl} from '../api/api.js';

export function renderPosts(posts){
    const postTableBody = document.getElementById('postTableBody');
    postTableBody.innerHTML='';
    posts.forEach(post => {
        const imageUrl = getImageUrl(post.profile_image);
        const newRow=document.createElement('tr');
        newRow.className = 'post-item'; 
        newRow.innerHTML=`
             <div class="post-header">
                    <h2 class=post-title data-id=${post.post_id}> ${post.post_title}</h2>
                </div>
                <div class="post-details">
                    <div class="post-details2"><span>좋아요 ${formatCount(post.likes_count)}</span> <span>댓글 ${formatCount(post.comment_count)}</span> <span>조회수 ${formatCount(post.view_count)}</span></div>
                    <span class="post-date">${formatDate(post.create_at)}</span>
                </div>
                <div class="post-footer">
                    <img class="author-avatar" src="${imageUrl}"></img>
                    <span class="author-name">${post.nickname}</span>
                </div>
        `;
        postTableBody.appendChild(newRow);
        newRow.querySelector('.post-header').addEventListener('click', () => {
            window.location.href = `/detail-post?post_id=${post.post_id}`;
        });
        
    });
}

export function renderDetailsPost(post,user_id){
    const postContainer = document.getElementById('container');
    
    const profileImageUrl = getImageUrl(post.profile_image);
    const pageImageUrl = getImageUrl(post.page_image);
    const isOwner = post.user_id === user_id;
    const editButtons = isOwner ? `   <span class="work-post">
                <button class="modify-post-button">수정</button>
                <button class="delete-post-button">삭제</button>
            </span>`
    : ''; 
    const pageImage = post.page_image !==''
    ? ` <img src="${pageImageUrl}" >` 
    : '<span class="no-image">이미지가 없습니다</span>';
    
    postContainer.innerHTML = `
        <span class="title">${post.post_title}</span>
        <div class="post-header">
            <div class="post-footer">
                <div class="author-avatar">
                 <img class="author-avatar" src="${profileImageUrl}"></img>
                 </div>
                <span class="author-name">${post.nickname}</span>
                <span class="post-date">${formatDate(post.create_at)}</span>
            </div>
            ${editButtons}
        </div>
        <div class="post-details">
            <div class="post-image">
                ${pageImage}
            </div>
        </div>
        <div class="post-content">
            <p>${post.post_content}</p>
        </div>
        <div class="post-stats">
            <button class="stat-item" id="likeBtn">
                <span class="stat-number" id="likeCnt">${formatCount(post.likes_count)}</span>
                <span class="stat-label">좋아요수</span>
            </button>
            <div class="stat-item">
                <span class="stat-number" id="viewCnt">${formatCount(post.view_count)}</span>
                <span class="stat-label">조회수</span>
            </div>
            <div class="stat-item">
                <span class="stat-number" id="commentCnt">${formatCount(post.comment_count)}</span>
                <span class="stat-label">댓글</span>
            </div>
        </div>
    `;
}

export function renderEditPost(post){
    const postContainer = document.querySelector('.container');
    postContainer.innerHTML = `
        <form id="postForm">
            <div>
                <label for="postTitle"> 제목* </label>
                <input type="text" id="postTitle" name="postTitle" value="${post.post_title}">
                <p class="helper-text" id="titleHelper" style="visibility: hidden;">*helper text</p>
            </div>
            <div>
            <label for="postContent">내용* </label>
            <textarea id="postContent" name="postContent" >${post.post_content}</textarea>
            <p class="helper-text" id="contentHelper"></p> 
            </div>
            <div>
                <label for="postImage"> 이미지 </label>
                  <div class="post-image">
                    <input type="file" id="postImage" name="postImage" accept="image/*" style="display: none;">
                    <button type="button" id="uploadButton">파일 선택</button>
                    <span id="fileName">${post.page_image ?decodeURIComponent(post.page_image.match(/[^-]+$/)[0]) : "이미지를 선택하세요."}</span>
                    <input type="hidden" name="existingImage" value="기존파일명.jpg">
                  </div>
                  <button type="button" id="deleteImage">이미지 삭제</button>
            </div>
            <button type="submit">수정하기</button>
        </form>
    </div>
    `
    
}