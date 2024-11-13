import { loadProfile } from "../api/api.js";
import { headerComponent } from "../components/header-component.js";
import { initializeProfileDropdown } from "./user-menu.js";



document.addEventListener("DOMContentLoaded", async()=>{
    try {
        const result = await loadProfile();

        const isBoardPage = window.location.pathname.includes('/public/board.html');
        headerComponent(result.profileImage, !isBoardPage); 
        initializeProfileDropdown();
    } catch (error) {
        console.error('프로필 이미지 불러오기 실패:', error);
    }


});