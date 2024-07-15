import { useState, useEffect, createContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
// @ts-ignore
import { auth } from "../../firebaseConfig"
import { useMediaQuery } from "usehooks-ts"
import { type CurrentUser, type Breakpoints } from "@/types/other"
import Login from "./components/Login"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./components/Meals/Dashboard"
import NewRecipeSearch from "./components/NewRecipeSearch/NewRecipeSearch"
import AuthLayout from "./layouts/AuthLayout"
import Register from "./components/Register"
import AllRecipes from "./components/AllRecipes/AllRecipes"
import RecipeDetails from "./components/RecipeDetails"

export const UserContext = createContext<CurrentUser>(null)
export const ScreenContext = createContext<Breakpoints>({
  any: false, sm: false,
  md: false, lg: false,
  xl: false, xxl: false
})

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null)
  const navigate = useNavigate()
  const location = useLocation()
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
      if(user) {
        setCurrentUser(user)
        location.pathname.match(/^\/(auth\/.+)?$/) && navigate("/dashboard")
      } else {
        setCurrentUser(null)
        navigate("/")
      }
    })

    return unsubscribe
  }, [])
  
  return (
    <ScreenContext.Provider value={matches}>  
      <UserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="meals">
              <Route path="search" element={<NewRecipeSearch/>}/>
            </Route>
            <Route path="recipes">
              <Route index element={<AllRecipes/>}/>
              <Route path=":recipeId" element={<RecipeDetails/>}/>
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