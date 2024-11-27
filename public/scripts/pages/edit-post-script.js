import { renderEditPost } from '../components/post-component.js';
import { validatePostTitle, validatePostContent } from '../utils/validators.js';
import {fetchPostDetails, updatePost } from '../api/api.js'

const BASE_URL ='http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');
  
  
    const postData= await fetchPostDetails(post_id);
    

    renderEditPost(postData.posts[0]);

    const uploadButton = document.getElementById('uploadButton');
    const fileNameSpan = document.getElementById('fileName');
    const deleteImage = document.getElementById('deleteImage');
    const fileInput = document.getElementById('postImage');
    const existingFilePath = postData.posts[0].page_image;
    let fileName;

    let postImage;
    if(existingFilePath){
    const response = await fetch(`${BASE_URL}/${existingFilePath}`);
    const blob = await response.blob();
    fileName = existingFilePath.match(/[^-]+$/)[0];
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
    })

    document.getElementById('postForm').addEventListener('submit',async (e)=>{
        e.preventDefault();
        const postTitle=document.getElementById('postTitle').value;
        const postContent=document.getElementById('postContent').value;


       
        const titleHelper = document.getElementById('titleHelper');
        const contentHelper = document.getElementById('contentHelper');
    
        let isValid=true;
        
        isValid=validatePostTitle(postTitle,titleHelper) && isValid;
        isValid=validatePostContent(postContent,contentHelper) && isValid;
    
    
        if(isValid){
        const formData = new FormData();
        formData.append('postTitle',postTitle);
        formData.append('postContent',postContent);
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


 