const BASE_URL ='http://localhost:3000';

export function headerComponent(data,showBackButton = false){
    const topContainer = document.querySelector('.top');
    topContainer.innerHTML=` <h1 class="top-title">아무말 대잔치</h1>
      ${showBackButton ? `<button class="back-button" onclick="window.location.href=document.referrer || '/public/board.html'">&#60;</button>` : ''}
        <img id="imagePreview" class="preview" src="${BASE_URL}/${data}" alt="">
        <div id= "dropdownMenu"class="dropdown-menu" style="display: none;">
            <div class="menu">
            <button id="editUserBtn" type="button">회원정보수정</button>
            <button id= "editPasswordBtn"type="button">비밀번호수정</button>
            <button id = "logoutBtn"type="button">로그아웃</button>
            </div>
        </div>`;

}