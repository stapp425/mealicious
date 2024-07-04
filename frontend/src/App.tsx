import { useState, useEffect, createContext } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { onAuthStateChanged, type User } from "firebase/auth"
// @ts-ignore
import { auth } from "../../firebaseConfig"
import Login from "./components/Login"
import Layout from "./layouts/MainLayout"
import Meals from "./components/Meals"
import NewMealSearchBar from "./components/NewMealSearchBar"
import AuthLayout from "./layouts/AuthLayout"
import Register from "./components/Register"

export const UserContext = createContext<User | null>(null)

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      navigate(user ? "/meals" : "/")
    })

    return unsubscribe
  }, [])
  
  return (
    <UserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="meals">
            <Route index element={<Meals/>}/>
            <Route path="search" element={<NewMealSearchBar/>}/>
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}