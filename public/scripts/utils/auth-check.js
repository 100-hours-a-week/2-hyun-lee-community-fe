import { getUserProfile } from "../api/api.js";

export async function checkAuth(){
const authData = await getUserProfile();
if (!authData.success) {
    alert("로그인을 해주세요!");
    window.location.href = '/login';
    return false; 
    }
    return true; 
}

