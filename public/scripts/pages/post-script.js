import { createPost } from '../api/api.js';
import { validatePostTitle, validatePostContent } from '../utils/validators.js';
import { checkAuth } from '../utils/auth-check.js';
import { escapeHtml } from '../utils/escape.js';


window.addEventListener('DOMContentLoaded', async() => {
    const isAuthenticated =await checkAuth();
    if(!isAuthenticated) return;

})
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
    const postImage = document.getElementById('postImage').files[0];
    
    const titleHelper = document.getElementById('titleHelper');
    const contentHelper = document.getElementById('contentHelper');

    let isValid=true;
    
    isValid=validatePostTitle(postTitle,titleHelper) && isValid;
    isValid=validatePostContent(postContent,contentHelper) && isValid;


    if(isValid){

    const formData = new FormData();
    formData.append('postTitle',escapeHtml(postTitle));
    formData.append('postContent',escapeHtml(postContent));
    if(postImage){
        formData.append('postImage',postImage);
    }
    try{
        const post = await createPost(formData);
           if(post.success){
             window.location.href=`/detail-post?post_id=${post.post.post_id}`;
         } else{
             window.location.href='create-post'
             }
    } catch(error){
        console.error('Error:',error);
        alert('서버 오류 발생');
    }
}
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
