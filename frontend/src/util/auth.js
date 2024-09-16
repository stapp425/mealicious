import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut as logOff, sendPasswordResetEmail } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, googleProvider, firestore } from "../../../firebaseConfig";
export async function createUser(userInput) {
    const usersCollectionRef = collection(firestore, "users");
    const { name: { first, last, display }, email, password } = userInput;
    try {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userInfo.user, { displayName: display });
        await addDoc(usersCollectionRef, {
            email: email,
            displayName: display,
            firstName: first,
            lastName: last,
            userId: userInfo.user.uid
        });
    }
    catch (err) {
        console.error(err.message);
    }
}
export async function signIn(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
        throw err;
    }
}
export async function signInWithGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
    }
    catch (err) {
        console.error(err.message);
    }
}
export async function signOut() {
    try {
        await logOff(auth);
    }
    catch (err) {
        console.error(err.message);
    }
}
export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
    }
    catch (err) {
        throw err;
    }
}
