function getBaseUrl() {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:3001/api'; 
    } else {
      return 'd2m8tt5bgy55i.cloudfront.net/api'; 
    }
  }
  
const BASE_URL = getBaseUrl();
const CDN_URL = 'https://d2m8tt5bgy55i.cloudfront.net/';
const S3_URL = 'https://s3.ap-northeast-2.amazonaws.com/hyun.lee.bucket/';
  



// 사용자 인증 관련
export async function login(email,password){
    const response = await fetch(`${BASE_URL}/users/login`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'  
        },    
        credentials: 'include',
        body: JSON.stringify({email, password}),
    });

    const result= await response.json();
    console.log(result);
    return result;
}


export async function checkEmailExists(email) {
    try {
        const encodedEmail = encodeURIComponent(email);
        const response = await fetch(`${BASE_URL}/users/email/check?email=${encodedEmail}`,{
            method : 'GET',
            credentials: 'include'
        });
        return response.json();
    } catch (error) {
        console.error('이메일 중복 확인 중 오류 발생:', error);
        return true; 
    }
}


export async function checkNicknameExists(nickname) {
    try {
        const response = await fetch(`${BASE_URL}/users/nickname/check?nickname=${nickname}`,{
            method: 'GET',
            credentials: 'include'
        });
        return response.json();
    } catch (error) {
        console.error('닉네임 중복 확인 중 오류 발생:', error);
        return true; 
    }
}

export async function checkNicknameExistsForUpdate(nickname,user_id) {
    try {
        const response = await fetch(`${BASE_URL}/users/nickname/update/check?nickname=${nickname}&user_id=${user_id}`,{
            method: 'GET',
            credentials: 'include'
        });
        return response.json();
    } catch (error) {
        console.error('닉네임 중복 확인 중 오류 발생:', error);
        return true; 
    }
}


export async function registerUser(formData) {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });
    return response.json();
}

export async function logout(){
    const response =await fetch(`${BASE_URL}/users/logout`,{
        method :'GET',
        credentials: 'include'
    });
    return response.json();
}

// 사용자 정보 관련
export async function updateUserProfile(formData) {
    const response = await fetch(`${BASE_URL}/user/profile`,{
        method:'PATCH',
        body: formData,
        credentials: 'include'
    });
    return response.json();
    
}


export async function deleteUserAccount(user_id){
    const response = await fetch(`${BASE_URL}/user/${user_id}`,{
        method:'DELETE',
        credentials: 'include'
    });
    return response.json();
}   



export async function updateUserPassword(formData){
    const response = await fetch(`${BASE_URL}/user/password`,{
        method:'PATCH',
        body: formData,
        credentials: 'include'
    });
    return response.json();
}   



export async function getUserProfile(){
    const response = await fetch(`${BASE_URL}/user/profile`,{
        method :'GET',
        credentials: 'include'
    })
    return response.json();
}




// 게시글 관련
export async function fetchPosts(){
    const response = await fetch(`${BASE_URL}/posts`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json'  
        },
        credentials: 'include',     
    });
    return response.json();
}


export async function fetchPostDetails(post_id){
    const response = await fetch(`${BASE_URL}/posts/${post_id}`,{
        method:'GET',
        credentials: 'include'
    });
    return response.json();
}

export async function updatePostViews(post_id){
    const response = await fetch(`${BASE_URL}/posts/${post_id}`,{
        method:'PATCH',
        credentials: 'include'
    });
    return response.json();
}



export async function createPost(formData){
    const response= await fetch(`${BASE_URL}/posts`,{
        method: 'POST',
        body: formData,
        credentials: 'include'
    });
    return response.json();
}


export async function updatePost(formData,post_id) {
    const response = await fetch(`${BASE_URL}/posts/update/${post_id}`,{
        method:'PATCH',
        body: formData,
        credentials: 'include'
    });
    return response.json();
    
}

export async function deletePost(post_id){
    const response = await fetch(`${BASE_URL}/posts/${post_id}`,{
        method:'DELETE',
        credentials: 'include'
    });
    return response.json();
}   


export async function userLikeStatus(post_id){
    const response = await fetch(`${BASE_URL}/likes/user/status/${post_id}`,{
        method:'GET',
        credentials: 'include'
    });
    return response.json();
}


export async function updatePostLikes(post_id,user_id){
    const response = await fetch(`${BASE_URL}/posts/likes/${post_id}/${user_id}`,{
        method:'PATCH',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({post_id:post_id}),
        credentials: 'include'
    });
    return response.json();
}

export async function updatePostCommentsCount(post_id){
    const response = await fetch(`${BASE_URL}/posts/comments/counts/${post_id}`,{
        method:'PATCH',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({post_id:post_id}),
        credentials: 'include'
    });
    return response.json();
}


//댓글 관련
export async function fetchComments(post_id){
    const response = await fetch(`${BASE_URL}/posts/${post_id}/comments`,{
        method:'GET',
        credentials: 'include'
    });
    return response.json();
}

export async function getComment(comment_id){
    const response = await fetch(`${BASE_URL}/posts/${comment_id}/comment`,{
        method:'GET',
        credentials: 'include'
    });
    return response.json();
}


export async function addComment(post_id,content){
    const response = await fetch(`${BASE_URL}/posts/${post_id}/comment`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({content}),
        credentials: 'include'
    });
    return response.json();
}

export async function updateComment(post_id,comment_id,content){
    const response = await fetch(`${BASE_URL}/posts/${post_id}/comment/${comment_id}`,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({content}),
        credentials: 'include'
    });
    return response.json();
}


export async function deleteComment(post_id, comment_id){
    const response = await fetch(`${BASE_URL}/posts/${post_id}/comment/${comment_id}`,{
        method:'DELETE',
        credentials: 'include'
    }); 
    return response.json();
}


// 사용자 삭제시 게시글/댓글 일괄 삭제
export async function deleteUserComments(user_id){
    const response = await fetch(`${BASE_URL}/user/${user_id}/comments`,{
        method:'DELETE',
        credentials: 'include'
    });
    return response.json();
}

export async function deleteUserPosts(user_id){
    const response = await fetch(`${BASE_URL}/user/${user_id}/posts`,{
        method:'DELETE',
        credentials: 'include'
    });
    return response.json();
}

//이미지 업로드
export function getImageUrl(image){
    if(!image || image.trim()===''){
        return '';
    }
    return `${image}`;
}

//파일 리소스
export async function fetchResource(filePath){
    const response = await fetch(`${filePath.replace(CDN_URL,S3_URL)}`);
    return response;
}




