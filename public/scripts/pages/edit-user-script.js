import { editUser } from '../components/user-component.js';
import { validateNickname, validateProfile } from '../utils/validators.js'
import { getUserProfile,updateUserProfile,deleteUserComments,deleteUserPosts,deleteUserAccount, checkNicknameExistsForUpdate } from "../api/api.js";
import { createModal, openModal, closeModal } from '../components/modal-component.js';
import { loadImageToCanvas, setupProfileImageChange } from '../utils/loadImage.js';
import { fetchResource } from '../api/api.js';




window.addEventListener('DOMContentLoaded', async() => {

        const result = await getUserProfile();
        const userInfo=result.userInfo;
        const user_id=userInfo.user_id;

        editUser(userInfo);
        loadImageToCanvas(userInfo);
        setupProfileImageChange(userInfo);
        

        document.getElementById('nickname').addEventListener('input', async (e) => {
            const nickname = e.target.value;
            const nicknameHelper = document.getElementById('nicknameHelper');

            const isValid = validateNickname(nickname,nicknameHelper);

            if (!isValid) {
                updateEditButton(false);
                return;
            }
            try {
                    const response = await checkNicknameExistsForUpdate(nickname,user_id);
                    if (!response.success) {
                        nicknameHelper.textContent = "*중복된 닉네임입니다.";
                        nicknameHelper.style.visibility = "visible";
                        updateEditButton(false);
                    } else {
                        updateEditButton(true);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('서버 오류 발생');
                }
            
        });
        
        document.getElementById('userForm').addEventListener('submit',async (e)=>{
            e.preventDefault();
            const nickname = document.getElementById('nickname').value;
            let profileImage = document.getElementById('profileImage').files[0];
        
            if(!profileImage){
                const response = await fetchResource(userInfo.profile);
                const blob = await response.blob();
                const fileName = userInfo.profile.match(/[^-]+$/)[0];
                console.log("filename",fileName);

                profileImage = new File([blob], fileName, { type: blob.type });
            }
            
            const profileHelper = document.getElementById('profileHelper');
               
            let isValid=true;
        
            isValid = validateProfile(profileImage,profileHelper) && isValid;
        

        
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
                    window.location.href = 'login';
                } catch (error) {
                    console.error(error);
                    alert('회원탈퇴에 실패했습니다.');
                }
            });
        });

});




function updateEditButton(isEnabled) {
    const editBtn = document.getElementById('editBtn');
    if (isEnabled) {
        editBtn.style.backgroundColor = '#7F6AEE';
        editBtn.disabled = false;
        editBtn.style.cursor='pointer';
    } else {
        editBtn.style.backgroundColor = '#ACA0EB';
        editBtn.disabled = true;
        editBtn.style.cursor = 'not-allowed';
        
    }
}