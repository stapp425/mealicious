import { useState, useEffect, createContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
// @ts-ignore
import { auth, firestore } from "../../firebaseConfig"
import { useMediaQuery } from "usehooks-ts"
import { type App, type CurrentUser, type Breakpoints } from "@/types/app"
import Login from "./components/Auth/Login"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./components/Meals/Dashboard"
import NewRecipeSearch from "./components/NewRecipeSearch/NewRecipeSearch"
import AuthLayout from "./layouts/AuthLayout"
import Register from "./components/Auth/Register"
import AllRecipes from "./components/AllRecipes/AllRecipes"
import RecipeDetails from "./components/RecipeDetails/RecipeDetails"
import CreateRecipe from "./components/RecipeTools/CreateRecipe"
import EditRecipe from "./components/RecipeTools/EditRecipe"
import MealCalendar from "./components/Calendar/MealCalendar"
import AllMeals from "./components/AllMeals/AllMeals"
import MealTools from "./components/MealTools/MealTools"
import { now } from "./util/hooks"

export const AppContext = createContext<App>({
  date: now,
  user: null,
  screenSizes: {
    any: false, sm: false,
    md: false, lg: false,
    xl: false, xxl: false
  }
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
    document.title = "Mealicious"
    
    const unsubscribe = onAuthStateChanged(auth, user => {
      if(user?.uid) {
        setCurrentUser(user)
        location.pathname.match(/^\/(auth\/.+)?$/) && navigate("/dashboard", { replace: true })
      } else {
        setCurrentUser(null)
        navigate("/auth/login", { replace: true })
      }
    })

    return unsubscribe
  }, [])
  
  return (
    <AppContext.Provider value={{
      date: now,
      user: currentUser,
      screenSizes: matches,
    }}>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="meals">
            <Route path="all" element={<AllMeals/>}/>
            <Route path="create" element={<MealTools mode="create"/>}/>
            <Route path="edit/:mealId" element={<MealTools mode="edit"/>}/>
            <Route path="calendar" element={<MealCalendar/>}/>
          </Route>
          <Route path="recipes">
            <Route index element={<AllRecipes/>}/>
            <Route path="search" element={<NewRecipeSearch/>}/>
            <Route path="create" element={<CreateRecipe/>}/>
            <Route path="edit">
              <Route path=":recipeId" element={<EditRecipe/>}/>
            </Route>
            <Route path=":recipeId" element={<RecipeDetails/>}/>
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </AppContext.Provider>
  )
}