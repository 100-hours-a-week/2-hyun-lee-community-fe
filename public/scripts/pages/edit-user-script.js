import { editUser } from '../components/user-component.js';
import { validateNickname, validateProfile } from '../utils/validators.js'
import { getUserProfile,updateUserProfile,deleteUserComments,deleteUserPosts,deleteUserAccount } from "../api/api.js";
import { createModal, openModal, closeModal } from '../components/modal-component.js';
import { loadImageToCanvas, setupProfileImageChange } from '../utils/loadImage.js';

const BASE_URL ='http://localhost:3000';


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

        const result = await getUserProfile();
        const userInfo=result.userInfo;
        const user_id=userInfo.user_id;

        editUser(userInfo);
        loadImageToCanvas(userInfo);
        setupProfileImageChange();
        
        
        document.getElementById('userForm').addEventListener('submit',async (e)=>{
            e.preventDefault();
            
            const nickname=document.getElementById('nickname').value;
            let profileImage = document.getElementById('profileImage').files[0];
        
            if(!profileImage){
                const response = await fetch(`${BASE_URL}/${userInfo.profile}`);
                const blob = await response.blob();

                profileImage = new File([blob], 'profile.jpg', { type: blob.type });
            }
            const profileHelper = document.getElementById('profileHelper');
            const nicknameHelper = document.getElementById('nicknameHelper');
             
            
            let isValid=true;
        
            isValid = validateProfile(profileImage,profileHelper) && isValid;
            isValid=validateNickname(nickname,nicknameHelper) && isValid;
        
            
            // if (isValid && !await isNicknameDuplicated(nickname)) {
            //     nicknameHelper.style.visibility = "hidden";
            // } else {
            //     nicknameHelper.textContent = '*중복된 닉네임입니다.';
            //     nicknameHelper.style.visibility = "visible";
            //     isValid = false;
            // }

        
            if(isValid){
                const formData = new FormData();
                formData.append('profileImage',profileImage);
                formData.append('nickname',nickname);
                formData.append('user_id',user_id);
               
                console.log("user_id:",user_id);
                console.log("profile:",profileImage);
                console.log("nickname:",nickname);
                try{

                       const result = await updateUserProfile(formData);
                        if (result.result==="nickname"){
                        nicknameHelper.textContent = "*중복된 닉네임입니다.";
                        nicknameHelper.style.visibility = "visible";
                        } else {
                                alert(result.message);
                        }
                    } catch(error){
                        console.error('Error:',error);
                        alert('서버 오류 발생');
                    }
                }
        
        
        })

        document.getElementById('withdrawBtn').addEventListener('click', () => {
            const { modal, confirmButton } = createModal({
                title: '회원탈퇴 하시겠습니까?',
                message: '작성된 게시글과 댓글은 삭제됩니다.',
                confirmText: '확인',
                cancelText: '취소'
            });
            openModal(modal);

            confirmButton.addEventListener('click', async () => {
                try {
                    // 유저 댓글 전부 삭제
                    const comment=await deleteUserComments(user_id);
                    if(!comment.success){
                        alert(comment.message);
                    }
                    //유저 게시글 전부 삭제
                    const post= await deleteUserPosts(user_id);
                    if(!post.success){
                        alert(post.message);
                    }
                    const result = await deleteUserAccount(user_id);
                    if(!result.success){
                        alert(result.message);
                    }
                    
                    closeModal(modal);
                    window.location.href = '/public/login.html';
                } catch (error) {
                    console.error(error);
                    alert('회원탈퇴에 실패했습니다.');
                }
            });
        });

});


