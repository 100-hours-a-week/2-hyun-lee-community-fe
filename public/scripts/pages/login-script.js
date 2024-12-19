import { login } from "../api/api.js";
import { validateEmail, validatePassword } from "../utils/validators.js";


document.getElementById('email').addEventListener('input',async (e)=>{
    const email =e.target.value;
    const emailHelper =document.getElementById('emailHelper');
    
    const password = document.getElementById('password').value;
    const passwordHelper = document.getElementById('passwordHelper');
    
    let emailValid = validateEmail(email,emailHelper);
    let passwordValid =validatePassword(password,passwordHelper);

    updateLoginButton(emailValid,passwordValid);
  

})

document.getElementById('password').addEventListener('input', handlePasswordInput);



document.getElementById('registerBtn').addEventListener('click', () => {
    window.location.href = 'register'; 
});


document.getElementById('login').addEventListener('submit', async(e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const emailHelper =document.getElementById('emailHelper');

    const password = document.getElementById('password').value;
    const passwordHelper = document.getElementById('passwordHelper');

    let isValid=true;
        
    isValid=validateEmail(email, emailHelper) && isValid;
    isValid=validatePassword(password, passwordHelper) && isValid;

    if(isValid){
        try {
            const result = await login(email, password);
    
            if (result.message ==="*비밀번호가 다릅니다.") {
                passwordHelper.textContent = "*비밀번호가 다릅니다.";
                passwordHelper.style.visibility = "visible";
            } else if(result.message ==="*이메일이 존재하지않습니다."){
                emailHelper.textContent ="*이메일이 존재하지않습니다.";
                emailHelper.style.visibility = "visible";
            } else{
                window.location.href='board';
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            alert('로그인 중 오류가 발생하였습니다. 다시 시도해주세요.');
         }
    } 
    
});




async function handlePasswordInput(e){
    const email = document.getElementById('email').value;
    const emailHelper =document.getElementById('emailHelper');

    const password = e.target.value;
    const passwordHelper = document.getElementById('passwordHelper');

    let emailValid = validateEmail(email,emailHelper);
    let passwordValid =validatePassword(password,passwordHelper);

    updateLoginButton(emailValid,passwordValid);

}



function updateLoginButton(emailValid,passwordValid) {
    const loginButton = document.getElementById('loginBtn');

    if (emailValid && passwordValid) {
        loginButton.style.backgroundColor = '#7F6AEE';
        loginButton.disabled = false;
        loginButton.style.cursor = 'pointer';
    } else {
        loginButton.style.backgroundColor = '#ACA0EB';
        loginButton.disabled = true;
        loginButton.style.cursor = 'not-allowed';
    }
}
