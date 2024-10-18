import { useState, useEffect, createContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
// @ts-ignore
import { auth } from "../firebaseConfig"
import { useMediaQuery } from "usehooks-ts"
import { type App, type CurrentUser, type Breakpoints } from "@/util/types/app"
import Login from "./components/auth/Login"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./components/main/Dashboard"
import NewRecipeSearch from "./components/new-recipe-search/NewRecipeSearch"
import AuthLayout from "./layouts/AuthLayout"
import Register from "./components/auth/Register"
import AllRecipes from "./components/all-recipes/AllRecipes"
import RecipeDetails from "./components/recipe-details/RecipeDetails"
import CreateRecipe from "./components/recipe-tools/CreateRecipe"
import EditRecipe from "./components/recipe-tools/EditRecipe"
import MealCalendar from "./components/calendar/MealCalendar"
import AllMeals from "./components/all-meals/AllMeals"
import CreateMeal from "./components/meal-tools/CreateMeal"
import EditMeal from "./components/meal-tools/EditMeal"

export const AppContext = createContext<App>({
  date: new Date(),
  user: null,
  screenSizes: {
    any: false, sm: false,
    md: false, lg: false,
    xl: false, xxl: false
  }
})


const App: React.FC = () => {
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
      date: new Date(),
      user: currentUser,
      screenSizes: matches,
    }}>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="meals">
            <Route index element={<AllMeals/>}/>
            <Route path="create" element={<CreateMeal/>}/>
            <Route path="edit/:mealId" element={<EditMeal/>}/>
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

export default App