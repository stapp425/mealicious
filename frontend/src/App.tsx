import { useState, useEffect, createContext } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
// @ts-ignore
import { auth } from "../../firebaseConfig"
import { useMediaQuery } from "usehooks-ts"
import { type CurrentUser, type Breakpoints } from "@/types/other"
import Login from "./components/Login"
import MainLayout from "./layouts/MainLayout"
import Meals from "./components/Meals"
import NewMealSearch from "./components/NewRecipeSearch/NewRecipeSearch"
import AuthLayout from "./layouts/AuthLayout"
import Register from "./components/Register"

export const UserContext = createContext<CurrentUser>(null)
export const ScreenContext = createContext<Breakpoints>({
  any: false, sm: false,
  md: false, lg: false,
  xl: false, xxl: false
})

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null)
  const navigate = useNavigate()
  const matches: Breakpoints = {
    any: useMediaQuery("(min-width: 0px)"),
    sm: useMediaQuery("(min-width: 640px)"),
    md: useMediaQuery("(min-width: 768px)"),
    lg: useMediaQuery("(min-width: 1024px)"),
    xl: useMediaQuery("(min-width: 1280px)"),
    xxl: useMediaQuery("(min-width: 1536px)")
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      navigate(user ? "/meals" : "/")
    })

    return unsubscribe
  }, [])
  
  return (
    <ScreenContext.Provider value={matches}>  
      <UserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="meals">
              <Route index element={<Meals/>}/>
              <Route path="search" element={<NewMealSearch/>}/>
            </Route>
          </Route>
          <Route path="/auth" element={<AuthLayout/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
          </Route>
        </Routes>
      </UserContext.Provider>
    </ScreenContext.Provider>
  )
}