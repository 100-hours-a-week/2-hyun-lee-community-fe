import { registerUser } from "../api/api.js";
import { validateProfile, validateEmail, validatePassword, validateConfirmPassword, validateNickname } from '../utils/validators.js';


const profileImageInput = document.getElementById('profileImage');
const profileCanvas = document.getElementById('profileCanvas');
const ctx = profileCanvas.getContext('2d');
let resizedImageBlob;

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

                
                profileCanvas.toBlob((blob) => {
                    resizedImageBlob = blob;
                }, 'image/png');
            };
        };

        reader.readAsDataURL(file);
    }
});




document.getElementById('registerForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
   
    const profile = document.getElementById('profileImage').value;
    const email = document.getElementById('useremail').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const nickname = document.getElementById('nickname').value;
    

    const profileHelper = document.getElementById('profileHelper');
    const emailHelper = document.getElementById('emailHelper');
    const passwordHelper = document.getElementById('passwordHelper');
    const confirmPasswordHelper = document.getElementById('confirmPasswordHelper');
    const nicknameHelper = document.getElementById('nicknameHelper');

    profileHelper.textContent="";
    emailHelper.textContent = "";
    passwordHelper.textContent = "";
    confirmPasswordHelper.textContent = "";
    nicknameHelper.textContent = "";

  
   
    let isValid=true;


    isValid = validateProfile(profile,profileHelper) && isValid;
    isValid = validateEmail(email,emailHelper) && isValid;
    isValid = validatePassword(password,passwordHelper) && isValid;
    isValid = validateConfirmPassword(password,confirmPassword,confirmPasswordHelper) && isValid;
    isValid = validateNickname(nickname,nicknameHelper) && isValid;

    // if (isValid) {
    //     const [isEmailDup, isNicknameDup] = await Promise.all([
    //         isEmailDuplicated(email),
    //         isNicknameDuplicated(nickname)
    //     ]);
    

    //     if (isEmailDup) {
    //         emailHelper.textContent = "*중복된 이메일입니다.";
    //         emailHelper.style.visibility = "visible";
    //         isValid = false;
    //     } else {
    //         emailHelper.style.visibility = "hidden";
    //     }
    
     
    //     if (isNicknameDup) {
    //         nicknameHelper.textContent = "*중복된 닉네임입니다.";
    //         nicknameHelper.style.visibility = "visible";
    //         isValid = false;
    //     } else {
    //         nicknameHelper.style.visibility = "hidden";
    //     }
    // }


    if(isValid){
    const formData = new FormData(document.getElementById('registerForm'));

    try{
        
        const response = await registerUser(formData);
        if(response.result==="email"){
            emailHelper.textContent = "*중복된 이메일입니다.";
            emailHelper.style.visibility = "visible";
        } else if (response.result==="nickname"){
            nicknameHelper.textContent = "*중복된 닉네임입니다.";
            nicknameHelper.style.visibility = "visible";
        } 

        console.log(response.message);
        if(response.ok){
            window.location.href = '/public/login.html';
        } 
    } catch(error){
        console.error('Error:',error);
        alert('서버 오류 발생');
    }
    }
})

