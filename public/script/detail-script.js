document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('board_id')

    try {
        const response = await fetch(`/details-post?board_id=${boardId}`); 
        const post = await response.json(); 
        renderPost(post); 
    } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
});


function renderPost(posts){
    const postTableBody = document.getElementById('container');
    const post=posts[0];
    postTableBody.innerHTML=`
     <div class="top">
        <h1 class="top-title">아무말 대잔치</h1>
        </div>
        <div class="container">
   
            <span class="title">${post.page_title}</span>
            <div class="post-header">
                <div class="post-footer">
                    <div class="author-avatar"></div>
                    <span class="author-name">더미 작성자 1</span>
                    <span class="post-date">2021-01-01 00:00:00</span>
                </div>
                <span class="work-post">
                    <button class="modify-post-button">수정</button>
                    <button class="delete-post-button">삭제</button>
                </span>
            </div>
        <div class="post-details">
            <div class="post-image">
              <img src="sample_image.png" alt="본문 이미지">
            </div>
        </div>
        <div class="post-content">
            <p>
                무엇을 얘기할까요? 아무말이라면, 삶은 항상 놀라운 모험이라고 생각합니다. 우리는 매일 새로운 경험을 하고 배우며 성장합니다. 때로는 어려움과 도전이 있지만, 그것들이 우리를 더 강하고 지혜롭게 만듭니다. 또한 우리는 주변의 사람들과 연결되며 사랑과 지지를 받습니다. 그래서 우리의 삶은 소중하고 의미가 있습니다.
                자연도 아름다운 이야기입니다. 우리 주변의 자연은 끝없는 아름다움과 신비로움을 담고 있습니다. 산, 바다, 숲, 하늘 등 모든 것이 우리를 놀라게 만들고 감동시킵니다. 자연은 우리의 생명과 안정을 지키며 우리에게 힘을 주는 곳입니다.
                마지막으로, 지식을 향한 탐구는 항상 흥미로운 여정입니다. 우리는 끝없는 지식의 바다에서 배우고 발견할 수 있으며, 이것이 우리를 더 깊이 이해하고 세상을 더 넓게 보게 해줍니다.
                그런 의미에서, 삶은 놀라움과 경이로움으로 가득 차 있습니다. 새로운 경험을 즐기고 항상 앞으로 나아가는 것이 중요하다고 생각합니다.
            </p>
        </div>

     
        <div class="post-stats">
            <div class="stat-item">
                 <span class="stat-number">123</span>
                 <span class="stat-label">좋아요수</span>
            </div>

            <div class="stat-item">
                <span class="stat-number">123</span>
                <span class="stat-label">조회수</span>
            </div>

            <div class="stat-item">
            <span class="stat-number">123</span>
            <span class="stat-label">댓글</span>
            </div>
        </div>

     
          <div class="comment-section">
            <textarea placeholder="댓글을 남겨주세요! "></textarea>
            <button class="comment-submit">댓글 등록</button>
        </div>

   
        <div class="comment">
                <div class="comment-author">
                    <div class="author-avatar"></div>
                    <div class="comment-details">
                    <span class="author-name">더미 작성자 1</span>
                    <span class="comment-date">2021-01-01 00:00:00</span>
                    <p class="comment-content">댓글 내용</p>
                    </div>
                </div>
                <div class="comment-author">
                    <div class="author-avatar"></div>
                    <div class="comment-details">
                    <span class="author-name">더미 작성자 1</span>
                    <span class="comment-date">2021-01-01 00:00:00</span>
                    <p class="comment-content">댓글 내용</p>
                    </div>
                </div>
                <div class="comment-author">
                    <div class="author-avatar"></div>
                    <div class="comment-details">
                    <span class="author-name">더미 작성자 1</span>
                    <span class="comment-date">2021-01-01 00:00:00</span>
                    <p class="comment-content">댓글 내용</p>
                    </div>
                </div>
                <div class="comment-author">
                    <div class="author-avatar"></div>
                    <div class="comment-details">
                    <span class="author-name">더미 작성자 1</span>
                    <span class="comment-date">2021-01-01 00:00:00</span>
                    <p class="comment-content">댓글 내용</p>
                    </div>
                </div>
                <div class="action">
                <button class="comment-action">수정</button>
                <button class="comment-action">삭제</button>
                </div>

        </div>
    </div>`;
  
        
    
}