import { registerUser,checkEmailExists, checkNicknameExists } from "../api/api.js";
import { validateProfile, validateEmail, validatePassword, validateConfirmPassword, validateNickname } from '../utils/validators.js';
//import { loadImage } from "../utils/format-count.js"

const profileImageInput = document.getElementById('profileImage');
const profileCanvas = document.getElementById('profileCanvas');
const ctx = profileCanvas.getContext('2d');
let resizedImageBlob;

const formValidity = {
    profile: false,
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
};



profileImageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;

            img.onload = function() {
    
                const targetWidth = 100; 
                const targetHeight = 100; 

              
                const aspectRatio = img.width / img.height;
                let drawWidth = targetWidth;
                let drawHeight = targetHeight;

                if (aspectRatio > 1) { 
                    drawHeight = targetHeight;
                    drawWidth = targetHeight * aspectRatio;
                } else { 
                    drawWidth = targetWidth;
                    drawHeight = targetWidth / aspectRatio;
                }

                
                ctx.clearRect(0, 0, profileCanvas.width, profileCanvas.height);
                ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

                
            };
        };

        reader.readAsDataURL(file);
    } else {
        ctx.clearRect(0, 0, profileCanvas.width, profileCanvas.height);
    }
});


document.getElementById('registerForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
    const formData = new FormData(document.getElementById('registerForm'));
    try{
        
        const response = await registerUser(formData);

        console.log(response.message);
        if(response.success){
            window.location.href = 'login';
        } 
    } catch(error){
        console.error('Error:',error);
        alert('서버 오류 발생');
    }
})




function updateRegisterButton() {
    const allValid = Object.values(formValidity).every((isValid) => isValid);
    const registerButton = document.getElementById('registerBtn');

    if (allValid) {
        registerButton.style.background = '#7F6AEE';
        registerButton.disabled = false;
        registerButton.style.cursor = 'pointer';
    } else {
        registerButton.style.background = '#ACA0EB';
        registerButton.disabled = true;
        registerButton.style.cursor = 'not-allowed';
    }
}


document.getElementById('profileImage').addEventListener('input', (e) => {
    const profile = e.target.value;
    const profileHelper = document.getElementById('profileHelper');
    formValidity.profile = validateProfile(profile, profileHelper);
    updateRegisterButton();
});

document.getElementById('useremail').addEventListener('input', async (e) => {
    const email = e.target.value;
    const emailHelper = document.getElementById('emailHelper');
    const isValid = validateEmail(email, emailHelper);
    formValidity.email = isValid;

    if (isValid) {
        try {
            const response = await checkEmailExists(email);
            if (!response.success) {
                emailHelper.textContent = "*중복된 이메일입니다.";
                emailHelper.style.visibility = "visible";
                formValidity.email = false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버 오류 발생');
        }
    }
    updateRegisterButton();
});

document.getElementById('password').addEventListener('input', (e) => {
    const password = e.target.value;
    const passwordHelper = document.getElementById('passwordHelper');
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordHelper = document.getElementById('confirmPasswordHelper');

    formValidity.password = validatePassword(password, passwordHelper);
    if (confirmPassword) {
        formValidity.confirmPassword = validateConfirmPassword(password, confirmPassword, confirmPasswordHelper);
    }
    updateRegisterButton();
});

document.getElementById('confirmPassword').addEventListener('input', (e) => {
    const password = document.getElementById('password').value;
    const confirmPassword = e.target.value;
    const confirmPasswordHelper = document.getElementById('confirmPasswordHelper');
    formValidity.confirmPassword = validateConfirmPassword(password, confirmPassword, confirmPasswordHelper);
    updateRegisterButton();
});

document.getElementById('nickname').addEventListener('input', async (e) => {
    const nickname = e.target.value;
    const nicknameHelper = document.getElementById('nicknameHelper');
    const isValid = validateNickname(nickname, nicknameHelper);
    formValidity.nickname = isValid;

    if (isValid) {
        try {
            const response = await checkNicknameExists(nickname);
            if (!response.success) {
                nicknameHelper.textContent = "*중복된 닉네임입니다.";
                nicknameHelper.style.visibility = "visible";
                formValidity.nickname = false;
            }
        } catch (error) {
            console.error(error);
        }
    }
    updateRegisterButton();
});
