

export function editUser(userData){
    const userContainer = document.querySelector('.container');
    userContainer.innerHTML=`
        <div class="edit-header">
        <p>회원정보수정</p>
    </div>
    <form id="userForm">
        <div class="user-container-profile">
            <div class="profile-container"><label for="profile_image">프로필 사진*</label></div>
            <div class="profile-picture-container">
                <label for="profileImage" class="circle">
                    <canvas id="profileCanvas" width="100" height="100" style="border-radius: 50%;"></canvas>
                    <span for="profileImage" class="change-button">변경</span>
                </label>
                <input type="file" id="profileImage" name="profileImage" accept="image/*" style="display: none;">
                <p class="helper-text" id="profileHelper" style="visibility: hidden;">*helper text</p>
            </div>
        </div>
        <div class="user-container">
            <div class="user-container-email">
                <label for="email">이메일</label>
                <p id="fix-email">${userData.email}</p>
            </div>
            <div class="user-container-nickname">
                <label for="nickname">닉네임</label>
                <input type="text" id="nickname" class="input-field2" value="${userData.nickname}">
                <p class="helper-text" id="nicknameHelper">&nbsp;</p>
            </div>
            <button type="submit" id="editBtn" >수정하기</button>
        </div>
    </form>
    <button type="button" id="withdrawBtn">회원탈퇴</button>
    <span id ="editSuccess">수정완료</span>

    `
}


