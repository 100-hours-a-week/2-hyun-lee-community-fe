import { validatePassword, validateConfirmPassword } from '../utils/validators.js';


document.getElementById('passwordForm').addEventListener('submit',async (e)=>{
    
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const passwordHelper = document.getElementById('passwordHelper');
    const confirmPasswordHelper = document.getElementById('confirmPasswordHelper');


    let isValid=true;

    isValid = validatePassword(password,passwordHelper) & isValid;
    isValid = validateConfirmPassword(password,confirmPassword,confirmPasswordHelper) & isValid;


    if(isValid){
        const formData = new FormData();
        formData.append('password',password);
        formData.append('confirmPassword',confirmPassword);
            
    
        try{
            //    //const result = await editPassword(formData);
            //    alert(result.message);
            //    window.location.href='/user/${userId}';
            } catch(error){
                console.error('Error:',error);
                alert('서버 오류 발생');
            }
        }

})