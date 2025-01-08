import { getUserProfile } from "../api/api.js";
import { headerComponent } from "../components/header-component.js";
import { initializeProfileDropdown } from "./user-menu.js";



document.addEventListener("DOMContentLoaded", async()=>{
    try {
        const result = await getUserProfile();
        const isBoardPage = window.location.pathname.includes('/board');
        headerComponent(result.userInfo, !isBoardPage); 
        initializeProfileDropdown();
    } catch (error) {
        console.error('프로필 이미지 불러오기 실패:', error);
    }


});