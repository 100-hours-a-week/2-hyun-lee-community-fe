export function validateEmail(email,emailHelper){
    if (!email) {
        emailHelper.textContent = '*이메일을 입력해주세요.';
        emailHelper.style.visibility = 'visible';
        return false;
    } else if (!/^[a-zA-Z0-9.!_%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(email)) {
        emailHelper.textContent = '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        emailHelper.style.visibility = 'visible';
        return false;
    } else {
        emailHelper.style.visibility = 'hidden';
        return true;
    }
}

export function validatePassword(password, passwordHelper) {
    if (!password) {
        passwordHelper.textContent = '*비밀번호를 입력해주세요.';
        passwordHelper.style.visibility = 'visible';
        return false;
    } else if (password.length < 8 || password.length > 20 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordHelper.textContent = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        passwordHelper.style.visibility = 'visible';
        return false;
    } else {
        passwordHelper.style.visibility = 'hidden';
        return true;
    }
}


export function validateConfirmPassword(password, confirmPassword, confirmPasswordHelper) {
    if (!confirmPassword) {
        confirmPasswordHelper.textContent = '*비밀번호를 한 번 더 입력해주세요.';
        confirmPasswordHelper.style.visibility = 'visible';
        return false;
    } else if (password !== confirmPassword) {
        confirmPasswordHelper.textContent = '*비밀번호가 다릅니다.';
        confirmPasswordHelper.style.visibility = 'visible';
        return false;
    } else {
        confirmPasswordHelper.style.visibility = 'hidden';
        return true;
    }
}

export function validateNickname(nickname, nicknameHelper) {
    if (!nickname) {
        nicknameHelper.textContent = '*닉네임을 입력해주세요.';
        nicknameHelper.style.visibility = 'visible';
        return false;
    } else if (nickname.length > 10) {
        nicknameHelper.textContent = '*닉네임은 최대 10자까지 작성 가능합니다.';
        nicknameHelper.style.visibility = 'visible';
        return false;
    } else if (/\s/.test(nickname)) {
        nicknameHelper.textContent = '*띄어쓰기를 없애주세요.';
        nicknameHelper.style.visibility = 'visible';
        return false;
    } else {
        nicknameHelper.style.visibility = 'hidden';
        return true;
    }
}

export function validateProfile(profile_image,profileHelper){
    
    if(!profile_image){
        profileHelper.textContent = "*프로필 사진을 추가해주세요.";
        profileHelper.style.visibility="visible";
        return false;
    } else{
        profileHelper.style.visibility="hidden";
        return true;
    }
}


export function validatePostTitle(postTitle,titleHelper) {
    if (postTitle.length > 26) {
        titleHelper.textContent="*제목을 26자 이하로 작성해주세요.";
        titleHelper.style.visibility="visible";
        return false;
    } else if(!postTitle.trim()){
        titleHelper.textContent="*제목을 입력해주세요.";
        titleHelper.style.visibility="visible";
        return false;
    } else{
        titleHelper.style.visibility="hidden";
        return true;
    }
}

export function validatePostContent(postContent,contentHelper) {
    if (!postContent.trim()) {
        contentHelper.textContent = '내용을 입력해주세요.';
        contentHelper.style.visibility = "visible";
        return false;
    }   else{
        contentHelper.style.visibility="hidden";
        return true;
    }
}