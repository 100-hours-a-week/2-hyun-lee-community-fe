import { login } from "../api/api.js";
import { validateEmail, validatePassword } from "../utils/validators.js";


let isEmailValid = false;
let isPasswordValid = false;


document.getElementById('useremail').addEventListener('input',async (e)=>{
    const email =e.target.value;
    const emailHelper =document.getElementById('emailHelper');
    isEmailValid =validateEmail(email,emailHelper);
  

    const password = document.getElementById('password').value;
    const passwordHelper = document.getElementById('passwordHelper');

    isPasswordValid = validatePassword(password,passwordHelper);
    
    if (isEmailValid && isPasswordValid) {
        try {
            const result = await login(email, password);
            if (result.success) {
                updateLoginButton(true);
            } else {
                passwordHelper.textContent = "*비밀번호가 다릅니다.";
                passwordHelper.style.visibility = "visible";
                updateLoginButton(false);
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            alert('로그인 중 오류가 발생하였습니다. 다시 시도해주세요.');
            updateLoginButton(false);
        }
    } else {
        updateLoginButton(false);
    }
})

document.getElementById('password').addEventListener('input', handlePasswordInput);



document.getElementById('registerBtn').addEventListener('click', () => {
    window.location.href = 'register'; 
});


document.getElementById('login').addEventListener('submit', async(e) => {
    e.preventDefault();
    window.location.href='board';
});




async function handlePasswordInput(e){
    const password = e.target.value;
    const email = document.getElementById('useremail').value;
    const passwordHelper = document.getElementById('passwordHelper');

    isPasswordValid = validatePassword(password, passwordHelper);


    if(isPasswordValid && isEmailValid){
    try {
        const result = await login(email, password);

        if (result.success) {
            updateLoginButton(true);
        } else {
            passwordHelper.textContent = "*비밀번호가 다릅니다.";
            passwordHelper.style.visibility = "visible";
            updateLoginButton(false);
        }
    } catch (error) {
        console.error('로그인 요청 중 오류 발생:', error);
        alert('로그인 중 오류가 발생하였습니다. 다시 시도해주세요.');
        updateLoginButton(false);
     }
    } else{
        updateLoginButton(false);
    }
}



function updateLoginButton(isEnabled) {
    const loginButton = document.getElementById('loginBtn');
    if (isEnabled) {
        loginButton.style.backgroundColor = '#7F6AEE';
        loginButton.disabled = false;
        loginButton.style.cursor='pointer';
    } else {
        loginButton.style.backgroundColor = '#ACA0EB';
        loginButton.disabled = true;
        loginButton.style.cursor = 'not-allowed';
        
    }
}