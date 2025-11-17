import { signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { query, where, doc, addDoc, updateDoc, deleteDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { auth, db, providerGG } from "../../config/firebase.js";

// ----------------- Google Sign-in -----------------
export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, providerGG);
    if (!result.user.email) {
        alert('Please login with email and password');
        return;
    }
    const email = result.user.email;

    const usersSnap = await getDocs(collection(db, 'users'));
    const usersData = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    let user = usersData.find(item => item.email === email);

    if (!user) {
        const userRef = await registerUser({
            email: email,
            name: result.user.displayName,
            password: "123456",
        });

        const snap = await getDoc(userRef);  // fetch data
        user = { id: snap.id, ...snap.data() };
    }

    localStorage.setItem('activeUser', JSON.stringify(user));
    alert('Sign in successful');
    window.location.href = '../../user/todo-app/';
};

export const registerUser = async (userData) => {
    const user = {
        ...userData,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const userRef = await addDoc(collection(db, 'users'), user);
    await updateDoc(userRef, { id: userRef.id });

    alert('Register successful');
    return userRef;
};

export const addUser = async (userData) => {
    const user = {
        ...userData,
        status: userData.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const userRef = await addDoc(collection(db, 'users'), user);
    await updateDoc(userRef, { id: userRef.id });

    alert('Add user successful');
    return userRef;
};

// ----------------- Update User -----------------
export const updateUser = async (id, userData) => {
    const user = {
        ...userData,
        updatedAt: new Date().toISOString(),
    };
    await updateDoc(doc(db, 'users', id), user);
    alert('Update user successful');
};

// ----------------- Delete User -----------------
export const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    alert('Delete user successful');
};

// ----------------- Get User by ID -----------------
export const getUserById = async (id) => {
    const snap = await getDoc(doc(db, 'users', id));
    if (!snap.exists()) return undefined;
    return { id: snap.id, ...snap.data() };
};

// ----------------- Sign In -----------------
export const signIn = async (email, password) => {
    const usersSnap = await getDocs(collection(db, 'users'));
    const usersData = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const user = usersData.find(item => item.email === email && item.password === password);
    return user;
};