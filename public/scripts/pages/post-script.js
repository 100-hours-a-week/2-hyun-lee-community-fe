import { createPost } from '../api/api.js';
import { validatePostTitle, validatePostContent } from '../utils/validators.js';


document.getElementById('postForm').addEventListener('submit',async (e)=>{
    e.preventDefault();

    const postTitle=document.getElementById('postTitle').value;
    const postContent=document.getElementById('postContent').value;
    const postImage = document.getElementById('postImage').files[0];
    
    const titleHelper = document.getElementById('titleHelper');
    const contentHelper = document.getElementById('contentHelper');

    let isValid=true;
    
    isValid=validatePostTitle(postTitle,titleHelper) && isValid;
    isValid=validatePostContent(postContent,contentHelper) && isValid;



    if(isValid){

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
           window.location.href='/public/board.html';
         } else{
             window.location.href='/public/create-post.html'
             }
    } catch(error){
        console.error('Error:',error);
        alert('서버 오류 발생');
    }
}
})