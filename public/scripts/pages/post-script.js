import { createPost } from '../api/api.js';
import { validatePostTitle, validatePostContent } from '../utils/validators.js';

let titleIsValid = false;
let contentIsValid = false;


document.getElementById('postTitle').addEventListener('input', (e) => {
    titleIsValid = !!e.target.value.trim(); 
    updateRegisterButton();
});


document.getElementById('postContent').addEventListener('input', (e) => {
    contentIsValid = !!e.target.value.trim();
    updateRegisterButton();
});


function updateRegisterButton() {
    const registerBtn = document.getElementById('registerBtn');

    if (titleIsValid && contentIsValid) {
        registerBtn.style.backgroundColor = '#7F6AEE';
        registerBtn.disabled = false;
        registerBtn.style.cursor = 'pointer';
    } else {
        registerBtn.style.backgroundColor = '#ACA0EB';
        registerBtn.disabled = true;
        registerBtn.style.cursor = 'not-allowed';
    }
}




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
        console.log("result",result);
           if(result.success){
           window.location.href='board';
         } else{
             window.location.href='create-post'
             }
    } catch(error){
        console.error('Error:',error);
        alert('서버 오류 발생');
    }
}
})