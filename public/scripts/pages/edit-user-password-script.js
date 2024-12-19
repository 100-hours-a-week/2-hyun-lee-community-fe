import { validatePassword, validateConfirmPassword } from '../utils/validators.js';
import { updateUserPassword, getUserProfile ,logout} from '../api/api.js';
import { checkAuth } from '../utils/auth-check.js';

window.addEventListener('DOMContentLoaded', async() => {

const isAuthenticated =await checkAuth();
if(!isAuthenticated) return;
const result = await getUserProfile();
const userInfo=result.userInfo;
const user_id=userInfo.user_id;


document.getElementById('password').addEventListener('input', (e) => {
    const password = e.target.value;
    const passwordHelper = document.getElementById('passwordHelper');
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordHelper = document.getElementById('confirmPasswordHelper');
    let isValid = validatePassword(password, passwordHelper);

    
    if (confirmPassword) {
        isValid = validateConfirmPassword(password, confirmPassword, confirmPasswordHelper);
    }
    if(!isValid){
        updateEditButton(false);
        return;
    }
    isValid = validatePassword(password, passwordHelper);
    if(isValid && confirmPassword){
        updateEditButton(true);
        return;
    }
});

document.getElementById('confirmPassword').addEventListener('input', (e) => {
    const password = document.getElementById('password').value;
    const confirmPassword = e.target.value;
    const confirmPasswordHelper = document.getElementById('confirmPasswordHelper');
    let isValid = validateConfirmPassword(password, confirmPassword, confirmPasswordHelper);

    if (!isValid) {
        updateEditButton(false);
        return;
    }
    updateEditButton(true);
       
});




document.getElementById('passwordForm').addEventListener('submit',async (e)=>{
    
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const formData = new FormData();
    formData.append('password',password);
    formData.append('confirmPassword',confirmPassword);
    formData.append('user_id',user_id);
       
    

       
        try{
               const result = await updateUserPassword(formData);
               if(result){
                    alert(result.message);
                    
                    const logoutResult= await logout();
                    if(logoutResult.success){
                        window.location.href = 'login';
                    } else{
                        alert(logoutResult.message);
                    }
               }

            } catch(error){
                console.error('Error:',error);
                alert('서버 오류 발생');
            }
        }

)
})


function updateEditButton(isEnabled) {
    const editBtn = document.getElementById('editBtn');
    if (isEnabled) {
        editBtn.style.backgroundColor = '#7F6AEE';
        editBtn.disabled = false;
        editBtn.style.cursor='pointer';
    } else {
        editBtn.style.backgroundColor = '#ACA0EB';
        editBtn.disabled = true;
        editBtn.style.cursor = 'not-allowed';
        
    }
}