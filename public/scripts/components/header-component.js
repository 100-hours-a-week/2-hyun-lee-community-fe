import { getImageUrl } from "../api/api.js";

export function headerComponent(userInfo,showBackButton = false){
    const userProfile=userInfo.profile_image;
    const profileImageUrl = getImageUrl(userProfile);
    const topContainer = document.querySelector('.top');
    topContainer.innerHTML=`
     <div class="top-content">
     ${showBackButton ? `<button class="back-button" onclick="history.back()|| 'board'">&#60;</button>` : ''}
  <h1 class="top-title">아무말 대잔치</h1>
    <img id="imagePreview" class="preview" src="${profileImageUrl}" alt="">
        <div id= "dropdownMenu"class="dropdown-menu" style="display: none;">
            <div class="menu">
            <button id="editUserBtn" type="button">회원정보수정</button>
            <button id= "editPasswordBtn"type="button">비밀번호수정</button>
            <button id = "logoutBtn"type="button">로그아웃</button>
            </div>
        </div>
      </div>`;

const titleElement = topContainer.querySelector('.top-title');
  if (titleElement) {
    titleElement.addEventListener('click', () => {
      window.location.href = '/board';
    });
  }

}