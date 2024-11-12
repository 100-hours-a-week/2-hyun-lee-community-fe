import { loginUser, isLoginDuplicated } from "../api/api.js";
import { validateEmail, validatePassword } from "../utils/validators.js";





document.getElementById('registerBtn').addEventListener('click', () => {
    window.location.href = '/public/register.html'; 
});


document.getElementById('login').addEventListener('submit', async(e) => {
    e.preventDefault();
    const email=document.getElementById('useremail').value;
    const password=document.getElementById('password').value;
    const emailHelper=document.getElementById('emailHelper');
    const passwordHelper=document.getElementById('passwordHelper');

    let isValid=true;

    passwordHelper.textContent="";
    
    
    isValid = validateEmail(email, emailHelper) && isValid;

    if(!validatePassword(password,passwordHelper)){
        isValid=false;
    }
    
     
    if(isValid){
    //로그인 확인
    try{
        const {ok, message} = await loginUser(email,password);
        if(ok){
                window.location.href='/public/board.html';
        } else{
            passwordHelper.textContent="*비밀번호가 다릅니다.";
            passwordHelper.style.visibility = 'visible';
        }
    } catch(error){
        console.log('로그인 요청 중 오류 발생:',error);
        alert('로그인 중 오류가 발생하였습니다. 다시 시도해주세요.');
    }
}
});
