import { 
  updateProfile, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut as logOff,
	sendPasswordResetEmail,
  type UserCredential
} from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"
import { auth, googleProvider, firestore } from "../../firebaseConfig"

export type UserInput = {
  name: {
    first: string
    last: string
    display: string
  }
  email: string
  password: string
  confirmPassword: string
}

export async function createUser(userInput: UserInput) {
	const usersCollectionRef = collection(firestore, "users")
	const { name: { first, last, display }, email, password } = userInput
	
	try {
		const userInfo: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
		await updateProfile(userInfo.user, { displayName: display })
		await addDoc(usersCollectionRef, {
			email: email,
			displayName: display,
			firstName: first,
			lastName: last,
			userId: userInfo.user.uid
		})
	} catch (err: any) {
		console.error(err.message)
	}
}

export async function signIn(email: string, password: string) {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (err: any) {
		throw err
	}
}

export async function signInWithGoogle() {
	try {
		await signInWithPopup(auth, googleProvider)
	} catch (err: any) {
		console.error(err.message)
	}
}

export async function signOut() {
	try {
		await logOff(auth)
	} catch (err: any) {
		console.error(err.message)
	}
}

export async function resetPassword(email: string) {
	try {
		await sendPasswordResetEmail(auth, email)
	} catch (err: any) {
		throw err
	}
}
