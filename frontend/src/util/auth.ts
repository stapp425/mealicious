import { 
  updateProfile, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut as logOff,
  type UserCredential
} from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"
import { auth, googleProvider, firestore } from "../../../firebaseConfig"

export type UserInput = {
	firstName: string,
	lastName: string,
	displayName: string,
	email: string,
	password: string,
	confirmPassword: string
}

export async function createUser(userInput: UserInput) {
	const usersCollectionRef = collection(firestore, "users")
	const { firstName, lastName, displayName, email, password } = userInput
	
	try {
		const userInfo:UserCredential = await createUserWithEmailAndPassword(auth, email, password)
		await updateProfile(userInfo.user, { displayName: displayName })
		await addDoc(usersCollectionRef, {
			email: email,
			displayName: displayName,
			firstName: firstName,
			lastName: lastName,
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
