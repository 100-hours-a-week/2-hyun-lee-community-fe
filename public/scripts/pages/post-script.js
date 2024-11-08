import { createPost } from '../api/api.js';
import { validatePostTitle, validatePostContent } from '../utils/validators.js';


document.getElementById('postForm').addEventListener('submit',async (e)=>{
    e.preventDefault();

    const postTitle=document.getElementById('postTitle').value;
    const postContent=document.getElementById('postContent').value;
    const postImage = document.getElementById('postImage').files[0];



    let errorMessage = '';
    errorMessage += validatePostTitle(postTitle);
    errorMessage += validatePostContent(postContent);

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    const formData = new FormData();
    formData.append('postTitle',postTitle);
    formData.append('postContent',postContent);
    if(postImage){
        formData.append('postImage',postImage);
    }
    try{
       const result = await createPost(formData);
       alert(result.message);
        if(result.ok){
            window.location.href='/board';
        } else{
            window.location.href='/create-post'
            }
    } catch(error){
        console.error('Error:',error);
        alert('서버 오류 발생');
    }
})