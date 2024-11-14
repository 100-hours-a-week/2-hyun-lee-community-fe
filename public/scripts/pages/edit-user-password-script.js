import { validatePassword, validateConfirmPassword } from '../utils/validators.js';
import { updateUserPassword, getUserProfile } from '../api/api.js';


const result = await getUserProfile();
const userInfo=result.userInfo;
const user_id=userInfo.userId;

document.getElementById('passwordForm').addEventListener('submit',async (e)=>{
    
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const passwordHelper = document.getElementById('passwordHelper');
    const confirmPasswordHelper = document.getElementById('confirmPasswordHelper');


    let isValid=true;

    isValid = validatePassword(password,passwordHelper) & isValid;
    isValid = validateConfirmPassword(password,confirmPassword,confirmPasswordHelper) & isValid;

    console.log(password);
    console.log(confirmPassword);

    if(isValid){
        const formData = new FormData();
        formData.append('password',password);
        formData.append('confirmPassword',confirmPassword);
        formData.append('user_id',user_id);   
    

       
        try{
               const result = await updateUserPassword(formData);
               //alert(result.message);
               //window.location.href='/user/${userId}';
            } catch(error){
                console.error('Error:',error);
                alert('서버 오류 발생');
            }
        }

})