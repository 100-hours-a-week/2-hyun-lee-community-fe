import { logout } from "../api/api.js";


export function initializeProfileDropdown(){
    const profileImage = document.getElementById('imagePreview');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const editUserBtn = document.getElementById('editUserBtn');
    const editPasswordBtn = document.getElementById('editPasswordBtn');
    const logoutBtn = document.getElementById('logoutBtn');


profileImage.addEventListener('click',()=>{
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
})

document.addEventListener('click', (event) => {
    if (!profileImage.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});
editUserBtn.addEventListener('click', () => {
    window.location.href = '/public/edit-user.html';
});

editPasswordBtn.addEventListener('click', () => {
    window.location.href = '/public/edit-user-password.html'; 
});

logoutBtn.addEventListener('click', async() => {
    const result= await logout();
    if(result.success){
        window.location.href = '/public/login.html';
    } else{
        alert(result.message);
    }
    
});    
}