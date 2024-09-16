import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB3kUx_3yaahbwhh7ik7AJ9YxQQds3caiQ",
  authDomain: "meal-planner-34be0.firebaseapp.com",
  projectId: "meal-planner-34be0",
  storageBucket: "meal-planner-34be0.appspot.com",
  messagingSenderId: "684456958554",
  appId: "1:684456958554:web:f7944bb8aac2d934659663",
  measurementId: "G-DPDVTJ42HG"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const firestore = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app)