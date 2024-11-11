const BASE_URL ='http://localhost:3000';



export async function loginUser(useremail,password){
    const response = await fetch(`/${BASE_URL}/login`,{
        method:'POST',
        body: JSON.stringify({useremail, password}),
    });
    const result= await response.json();
    return { ok: response.ok, message:result.message};
}


export async function isLoginDuplicated(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/check-login`, {
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

export async function isEmailDuplicated(email) {
    try {
        const response = await fetch(`${BASE_URL}/check-email?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }
        const data = await response.json();
        return data.isDuplicated;
    } catch (error) {
        console.error('이메일 중복 확인 중 오류 발생:', error);
        return true; 
    }
}


export async function isNicknameDuplicated(nickname) {
    try {
        const response = await fetch(`${BASE_URL}/check-nickname?nickname=${encodeURIComponent(nickname)}`);
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
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        body: formData,
    });
    return response.json();
}


export async function fetchPosts(){
    const response = await fetch(`${BASE_URL}/posts`);
    return response.json();
}


export async function fetchPostDetails(boardId){
    const response = await fetch(`${BASE_URL}/api/detail-post?board_id=${boardId}`);
    return response.json();
}

export async function fetchComments(boardId){
    const response = await fetch(`${BASE_URL}/comments?board_id=${boardId}`);
    return response.json();
}

export async function deletePost(boardId){
    const response = await fetch(`${BASE_URL}/details-post/deletePost?board_id=${boardId}`,{
        method:'DELETE'
    });
    return response.json();
}   

export async function deleteComment(boardId, commentId){
    const response = await fetch(`${BASE_URL}/comment/${boardId}/deleteComment/${commentId}`,{
        method:'DELETE'
    }); 
    return response.json();
}

export async function addComment(boardId,content){
    const response = await fetch(`${BASE_URL}/comment`,{
        method:'POST',
        body: JSON.stringify({boardId,content})
    });
    return response.json();
}

export async function createPost(formData){
    const response= await fetch(`${BASE_URL}/createPost`,{
        method: 'POST',
        body: formData,
    });
    return response.json();
}

export async function editPost(boardId,formData) {
    const response = await fetch(`${BASE_URL}/detail-post/{boardId}`,{
        method:'PATCH',
        body: formData,
    });
    return response.json();
    
}

export async function editUser(userId,formData) {
    const response = await fetch(`${BASE_URL}/user/{UserId}`,{
        method:'PATCH',
        body: formData,
    });
    return response.json();
    
}


export async function deleteUser(userId){
    const response = await fetch(`${BASE_URL}/user/deleteUser/{user_id}`,{
        method:'DELETE'
    });
    return response.json();
}   