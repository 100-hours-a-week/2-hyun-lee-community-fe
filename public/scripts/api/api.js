const BASE_URL ='http://localhost:3000';


// 사용자 인증 관련
export async function login(useremail,password){
    const response = await fetch(`${BASE_URL}/users/login`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'  
        },    
        credentials: 'include',
        body: JSON.stringify({useremail, password}),
    });

    const result= await response.json();
    console.log(result);
    return result;
}


export async function checkLogin(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/check`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('비밀번호 확인 중 오류 발생:', error);
        return false;
    }
}

export async function checkEmailExists(email) {
    try {
        const response = await fetch(`${BASE_URL}/users/email/check?email=${email}`);
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }
        const data = await response.json();
        console.log(data);
        return data.isDuplicated;
    } catch (error) {
        console.error('이메일 중복 확인 중 오류 발생:', error);
        return true; 
    }
}


export async function checkNicknameExists(nickname) {
    try {
        const response = await fetch(`${BASE_URL}/users/nickname/check?nickname=${nickname}`);
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }
        const data = await response.json();
        return data.isDuplicated;
    } catch (error) {
        console.error('닉네임 중복 확인 중 오류 발생:', error);
        return true; 
    }
}


export async function registerUser(formData) {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        body: formData,
    });
    return response.json();
}

export async function logout(){
    const response =await fetch(`${BASE_URL}/users/logout`,{
        method :'GET'
    });
    return response.json();
}

// 사용자 정보 관련
export async function updateUserProfile(formData) {
    const response = await fetch(`${BASE_URL}/user/profile`,{
        method:'PATCH',
        body: formData,
    });
    return response.json();
    
}


export async function deleteUserAccount(user_id){
    const response = await fetch(`${BASE_URL}/user/${user_id}`,{
        method:'DELETE'
    });
    return response.json();
}   



export async function updateUserPassword(formData){
    const response = await fetch(`${BASE_URL}/user/password`,{
        method:'PATCH',
        body: formData,
    });
    return response.json();
}   



export async function getUserProfile(){
    const response = await fetch(`${BASE_URL}/user/profile`)
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
        method:'PATCH'
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
/*
여기서부터 다시 하기
formdata 말고 post_id도 파라미터로 전달할수있도록
*/

export async function updatePost(formData,post_id) {
    const response = await fetch(`${BASE_URL}/posts/update/${post_id}`,{
        method:'PATCH',
        body: formData
    });
    return response.json();
    
}

export async function deletePost(post_id){
    const response = await fetch(`${BASE_URL}/posts/${post_id}`,{
        method:'DELETE'
    });
    return response.json();
}   




export async function updatePostLikes(post_id){
    const response = await fetch(`${BASE_URL}/posts/likes/${post_id}`,{
        method:'PATCH',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({post_id:post_id})
    });
    return response.json();
}

export async function updatePostCommentsCount(post_id){
    const response = await fetch(`${BASE_URL}/posts/comments/counts/${post_id}`,{
        method:'PATCH',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({post_id:post_id})
    });
    return response.json();
}


//댓글 관련
export async function fetchComments(post_id){
    const response = await fetch(`${BASE_URL}/comments?post_id=${post_id}`,{
        method:'GET'
    });
    return response.json();
}


export async function addComment(post_id,content){
    const response = await fetch(`${BASE_URL}/comment`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({post_id,content})
    });
    return response.json();
}

export async function updateComment(post_id,commentId,content){
    const response = await fetch(`${BASE_URL}/comment/${post_id}/updateComment/${commentId}`,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({content})
    });
    return response.json();
}


export async function deleteComment(post_id, commentId){
    const response = await fetch(`${BASE_URL}/comment/${post_id}/deleteComment/${commentId}`,{
        method:'DELETE'
    }); 
    return response.json();
}


// 사용자 삭제시 게시글/댓글 일괄 삭제
export async function deleteUserComments(userId){
    const response = await fetch(`${BASE_URL}/user/deleteUserComments/${userId}`,{
        method:'DELETE'
    });
    return response.json();
}

export async function deleteUserPosts(userId){
    const response = await fetch(`${BASE_URL}/user/deleteUserPosts/${userId}`,{
        method:'DELETE'
    });
    return response.json();
}




