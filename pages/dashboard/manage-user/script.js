import { getUsers } from '../../../components/firebase/dashboard.js';
import { addUser, updateUser, deleteUser, getUserById } from '../../../components/firebase/auth.js';

let currentUpdatedUserId = null;

const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');
const userPasswordInput = document.getElementById('user-password');
const userConfirmPasswordInput = document.getElementById('user-confirm-password');
const userStatusSelect = document.getElementById('user-status');
const saveUserBtn = document.getElementById('save-user-btn');

const userNameInputUpd = document.getElementById('user-name-upd');
const userEmailInputUpd = document.getElementById('user-email-upd');
const userPasswordInputUpd = document.getElementById('user-password-upd');
const userConfirmPasswordInputUpd = document.getElementById('user-confirm-password-upd');
const userStatusSelectUpd = document.getElementById('user-status-upd');
const saveUserBtnUpd = document.getElementById('save-user-btn-upd');

const addUserModalEl = document.getElementById('addUser');
const updUserModalEl = document.getElementById('updUser');
const addUserModal = new bootstrap.Modal(addUserModalEl);
const updUserModal = new bootstrap.Modal(updUserModalEl);   

async function renderUI() {
    const users = await getUsers();
    let html = '';
    for (const user of users) {
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.email}</td>
                <td>${user.name}</td>
                <td>${user.status}</td>
                <td>${user.createdAt}</td>
                <td>${user.updatedAt}</td>
                <td>
                    <div class="dropdown">
                    
                        <a class="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-md font-bold text-white px-3 py-2 rounded-md mb-4" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ...
                        </a>

                        <ul class="dropdown-menu">
                            <li>
                                <button class="dropdown-item" type="button" onclick="updUser('${user.id}')">Update</button>
                            </li>
                            
                            <li>
                                <button class="dropdown-item" type="button" onclick="delUser('${user.id}')">Delete</button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        `;
    }
    usersTable.innerHTML = html;
}

const usersTable = document.getElementById('users-table');
renderUI();


async function updUser(id) {
    console.log("ID passed into updUser():", id);

    const user = await getUserById(id);
    console.log("getUserById() returned:", user);

    userNameInputUpd.value = user.name;
    userEmailInputUpd.value = user.email;
    userPasswordInputUpd.value = user.password;
    userConfirmPasswordInputUpd.value = user.password;
    userStatusSelectUpd.value = user.status;
    currentUpdatedUserId = id;

    updUserModal.show();
}

async function delUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        await deleteUser(id);
        renderUI();
    }
}

saveUserBtnUpd.addEventListener('click', async () => {
    const name = userNameInputUpd.value;
    const email = userEmailInputUpd.value;
    const password = userPasswordInputUpd.value;
    const confirmPassword = userConfirmPasswordInputUpd.value;
    const status = userStatusSelectUpd.value;
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        status: status,
        id: currentUpdatedUserId
    };
    await updateUser(currentUpdatedUserId, userData);
    renderUI();

    updUserModal.hide();
});

saveUserBtn.addEventListener('click', async () => {
    const name = userNameInput.value;
    const email = userEmailInput.value;
    const password = userPasswordInput.value;
    const confirmPassword = userConfirmPasswordInput.value;
    const status = userStatusSelect.value;

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        status: status
    };
    await addUser(userData);
    renderUI();

    addUserModal.hide();
    userNameInput.value = '';
    userEmailInput.value = '';
    userPasswordInput.value = '';
    userConfirmPasswordInput.value = '';
    userStatusSelect.value = 'active';
});

window.updUser = updUser;
window.delUser = delUser;