import { renderEditPost } from '../components/post-component.js';
import { validatePostTitle, validatePostContent } from '../utils/validators.js';
import {fetchPostDetails, updatePost } from '../api/api.js'

const BASE_URL ='http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');
  
  
    const postData= await fetchPostDetails(post_id);
    
    renderEditPost(postData.post);

    const uploadButton = document.getElementById('uploadButton');
    const fileNameSpan = document.getElementById('fileName');
    const deleteImageCheckbox = document.getElementById('deleteImage');
    const fileInput = document.getElementById('postImage');
    const existingFilePath = postData.post.page_image;
    
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });
    console.log(postData.post.page_image);
    fileInput.addEventListener('change', () => {
        fileNameSpan.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : '파일을 선택하세요.';
    });


    document.getElementById('postForm').addEventListener('submit',async (e)=>{
        e.preventDefault();
        const postTitle=document.getElementById('postTitle').value;
        const postContent=document.getElementById('postContent').value;
        const deleteImage = deleteImageCheckbox.checked;

        let postImage = fileInput.files[0];
        if(!postImage && existingFilePath && !deleteImage){
            const response = await fetch(`${BASE_URL}/${existingFilePath}`);
            const blob = await response.blob();
            const fileName = existingFilePath.match(/[^-]+$/)[0];
            console.log("filename",fileName);
            postImage = new File([blob], fileName, { type: blob.type });
        }
        
        console.log(postImage);
        const titleHelper = document.getElementById('titleHelper');
        const contentHelper = document.getElementById('contentHelper');
    
        let isValid=true;
        
        isValid=validatePostTitle(postTitle,titleHelper) && isValid;
        isValid=validatePostContent(postContent,contentHelper) && isValid;
    
    
        if(isValid){
        const formData = new FormData();
        formData.append('postTitle',postTitle);
        formData.append('postContent',postContent);
        if (deleteImage) {
            formData.append('deleteImage', true); 
        } else if (postImage) {
            formData.append('postImage', postImage); 
        }
        try{

        const result = await updatePost(formData,post_id);
            if(result.success){
                //window.location.href=`/public/detail-post.html?post_id=${post_id}`;
            } else{
                window.location.href=`/public/edit-post.html?post_id=${post_id}`;
                }
        } catch(error){
            console.error('Error:',error);
            alert('서버 오류 발생');
        }
    }
     })
})


 