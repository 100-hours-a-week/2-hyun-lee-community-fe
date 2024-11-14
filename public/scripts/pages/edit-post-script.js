import { renderEditPost } from '../components/post-component.js';
import { validatePostTitle, validatePostContent } from '../utils/validators.js';
import {fetchPostDetails, updatePost } from '../api/api.js'

const dummyPost = {
    board_id: 1,
    page_title: "더미 게시글 제목",
    edit_at: "2024-11-09T12:00:00Z",
    page_image: "https://via.placeholder.com/150",
    page_content: "이것은 더미 게시글 내용입니다.",
};

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('board_id');
  
    const postData= await fetchPostDetails(boardId);
    
    renderEditPost(postData.post);


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
        formData.append('boardId',boardId);
        try{

        const result = await updatePost(formData);
            if(result.success){
                window.location.href=`/public/detail-post.html?board_id=${boardId}`;
            } else{
                window.location.href=`/public/edit-post.html?board_id=${boardId}`;
                }
        } catch(error){
            console.error('Error:',error);
            alert('서버 오류 발생');
        }
    }
     })
})


 