import { signIn, signInWithGoogle } from '../../../components/firebase/auth.js';
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signinBtn = document.getElementById('signin-btn');

signinBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    const user = await signIn(email, password);
    if (user) {
        localStorage.setItem('activeUser', JSON.stringify(user));
        alert('Sign in successfully');
        window.location.href = '../../user/todo-app/';
    } else {
        alert('Invalid email or password');
    }
});

const btnSignInWithGoogle = document.getElementById('signin-with-google-btn');
btnSignInWithGoogle.addEventListener('click', () => {
    signInWithGoogle();
});