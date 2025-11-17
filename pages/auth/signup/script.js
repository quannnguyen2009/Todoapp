import { registerUser } from '../../../components/firebase/auth.js';

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const signupBtn = document.getElementById('signup-button');

signupBtn.addEventListener('click', handleRegisterUser);

async function handleRegisterUser() {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    const user = {
        name: name,
        email: email,
        password: password,
    }
    await registerUser(user);
    window.location.href = '../../auth/signin/';
}