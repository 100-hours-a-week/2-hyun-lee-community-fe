import { renderEditPost } from '../components/post-component.js';
import { validatePostTitle, validatePostContent } from '../utils/validators.js';
import { getUserProfile, fetchPostDetails, updatePost, fetchResource } from '../api/api.js'
import { checkAuth } from '../utils/auth-check.js';
import { escapeHtml } from '../utils/escape.js';

document.addEventListener('DOMContentLoaded', async () => {

    const isAuthenticated =await checkAuth();
    if(!isAuthenticated) return;
    const result = await getUserProfile();
    const userInfo=result.userInfo;
    const user_id=userInfo.user_id;
    
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');
  
    const postData= await fetchPostDetails(post_id);
  
    if(user_id !== postData.posts[0].user_id) {
        alert("권한이 없습니다!");
        window.location.href = '/board';
        return ;
    }


    renderEditPost(postData.posts[0]);

    const uploadButton = document.getElementById('uploadButton');
    const fileNameSpan = document.getElementById('fileName');
    const deleteImage = document.getElementById('deleteImage');
    const fileInput = document.getElementById('postImage');
    const existingFilePath = postData.posts[0].post_image;
    let fileName;

    let postImage;
    if(existingFilePath){
    const response = await fetchResource(existingFilePath);
    const blob = await response.blob();
    fileName = existingFilePath.match(/[^-]+$/)[0];
    fileName = decodeURIComponent(fileName);

    console.log("filename",fileName);
    postImage = new File([blob], fileName, { type: blob.type });
    }
    
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', () => {
        fileNameSpan.textContent = fileInput.files[0] ? fileInput.files[0].name :fileName;
        postImage = fileInput.files[0] ? fileInput.files[0] :existingFilePath ;
        console.log(postImage);
    });


    deleteImage.addEventListener('click',async()=>{
        fileNameSpan.textContent = '이미지를 선택하세요.';
        fileInput.value='';
        postImage = fileInput.files[0];
    });

    document.getElementById('postTitle').addEventListener('input', (e) => {
        const titleHelper = document.getElementById('titleHelper');
        let postTitle = e.target.value;
        
        const contentHelper = document.getElementById('contentHelper');
        const postContent=document.getElementById('postContent').value;
        
        let contentValid=validatePostContent(postContent,contentHelper);
        let titleValid = validatePostTitle(postTitle,titleHelper);
        
        updateRegisterButton(contentValid,titleValid);
    });
    
    
    document.getElementById('postContent').addEventListener('input', (e) => {
        const contentHelper = document.getElementById('contentHelper');
        let postContent = e.target.value;
    
        const titleHelper = document.getElementById('titleHelper');
        const postTitle=document.getElementById('postTitle').value;
    
        let contentValid = validatePostContent(postContent,contentHelper);
        let titleValid = validatePostTitle(postTitle,titleHelper);
    
        updateRegisterButton(contentValid,titleValid);
    });


    document.getElementById('postForm').addEventListener('submit',async (e)=>{
        e.preventDefault();
        const postTitle=document.getElementById('postTitle').value;
        const postContent=document.getElementById('postContent').value;


       
        const titleHelper = document.getElementById('titleHelper');
        const contentHelper = document.getElementById('contentHelper');
    
        let isValid=true;
        
        isValid=validatePostTitle(postTitle,titleHelper) && isValid;
        isValid=validatePostContent(postContent,contentHelper) && isValid;
    
        console.log(isValid);
        if(isValid){
        const formData = new FormData();
        formData.append('postTitle',escapeHtml(postTitle));
        formData.append('postContent',escapeHtml(postContent));
        if (!postImage) {
            formData.append('postDelete', true); 
        } else {
            formData.append('postDelete',false);
            formData.append('postImage',postImage);
        }
        try{

        const result = await updatePost(formData,post_id);
        if(result.success){
                window.location.href=`detail-post?post_id=${post_id}`;
            } else{
                window.location.href=`edit-post?post_id=${post_id}`;
                }
        } catch(error){
            console.error('Error:',error);
            alert('서버 오류 발생');
        }
    }
     })
})



function updateRegisterButton(contentValid,titleValid) {
    const registerBtn = document.getElementById('registerBtn');

    if (contentValid && titleValid) {
        registerBtn.style.backgroundColor = '#7F6AEE';
        registerBtn.disabled = false;
        registerBtn.style.cursor = 'pointer';
    } else {
        registerBtn.style.backgroundColor = '#ACA0EB';
        registerBtn.disabled = true;
        registerBtn.style.cursor = 'not-allowed';
    }
}
