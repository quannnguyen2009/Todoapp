import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { db } from "../../config/firebase.js";

export const getUsers = async () => {
    const users = await getDocs(collection(db, 'users'));
    return users.docs.map(doc => doc.data());
}