import { editUser } from '../components/user-component.js';
import { validateNickname } from '../utils/validators.js'
import { isNicknameDuplicated } from "../api/api.js";

const withdrawBtn = document.getElementById('withdrawBtn');
const withdrawModal = document.getElementById('withdrawModal');
const withdrawCancelBtn = document.getElementById('withdrawCancelBtn');
const withdrawConfirmBtn = document.getElementById('withdrawConfirmBtn');

const profileImageInput = document.getElementById('profileImage');
const profileCanvas = document.getElementById('profileCanvas');
const ctx = profileCanvas.getContext('2d');


const dummyUser = 
        {
            user_id: 1,
            useremail: 'test1@naver.com',
            reg_date: '2024-11-08T12:00:00Z',
            profile: 'https://via.placeholder.com/36',
            nickname: 'test1'
        }
    
    window.addEventListener('DOMContentLoaded', async() => {
         //세션에 있는 로그인 정보 가져오기?

        editUser(dummyUser);
        loadImageToCanvas(dummyUser);
        setupProfileImageChange();
        

        document.getElementById('userForm').addEventListener('submit',async (e)=>{
            e.preventDefault();
            
            const nickname=document.getElementById('nickname').value;
            const profileImage = document.getElementById('profileImage').files[0];
        
            const nicknameHelper = document.getElementById('nicknameHelper');
              
            let isValid=true;
        
            isValid=validateNickname(nickname,nicknameHelper) && isValid;
        
            console.log(isValid);
            if (isValid && !await isNicknameDuplicated(nickname)) {
                nicknameHelper.style.visibility = "hidden";
            } else {
                nicknameHelper.textContent = '*중복된 닉네임입니다.';
                nicknameHelper.style.visibility = "visible";
                isValid = false;
            }
        
            if(isValid){
                const formData = new FormData();
                formData.append('profileImage',profileImage);
                formData.append('nickname',nickname);
               
                try{
                    //    //const result = await editUser(formData);
                    //    alert(result.message);
                    //    window.location.href='/user/${userId}';
                    } catch(error){
                        console.error('Error:',error);
                        alert('서버 오류 발생');
                    }
                }
        
        
        })

    });



withdrawBtn.addEventListener('click', () => {
    withdrawModal.style.display = 'flex';
});


withdrawCancelBtn.addEventListener('click', () => {
    withdrawModal.style.display = 'none';
});

withdrawConfirmBtn.addEventListener('click', () => {
    withdrawModal.style.display = 'none';
    alert("회원 탈퇴되었습니다.")
    window.location.href = '/'; 
});















function loadImageToCanvas(dummyUser) {
    const profileCanvas = document.getElementById('profileCanvas');
    const ctx = profileCanvas.getContext('2d');
    const img = new Image();
   console.log(dummyUser.profile);
    img.src =dummyUser.profile;

    img.onload = function() {
        ctx.clearRect(0, 0, profileCanvas.width, profileCanvas.height);
        ctx.drawImage(img, 0, 0, profileCanvas.width, profileCanvas.height);
    };
}



function setupProfileImageChange() {
    const profileImageInput = document.getElementById('profileImage');
    const profileCanvas = document.getElementById('profileCanvas');
    const ctx = profileCanvas.getContext('2d');

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
                    ctx.globalAlpha = 0.7; 
                    ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
                    ctx.globalAlpha = 1.0;
                };
            };

            reader.readAsDataURL(file);
        }
    });
}