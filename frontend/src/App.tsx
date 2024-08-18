import { useState, useEffect, createContext } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
// @ts-ignore
import { auth, firestore } from "../../firebaseConfig"
import { useMediaQuery } from "usehooks-ts"
import { type App, type CurrentUser, type Breakpoints, type FetchQueries, modifyData } from "@/types/app"
import Login from "./components/Login"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./components/Meals/Dashboard"
import NewRecipeSearch from "./components/NewRecipeSearch/NewRecipeSearch"
import AuthLayout from "./layouts/AuthLayout"
import Register from "./components/Register"
import AllRecipes from "./components/AllRecipes/AllRecipes"
import RecipeDetails from "./components/RecipeDetails/RecipeDetails"
import CreateRecipe from "./components/RecipeTools/CreateRecipe"
import EditRecipe from "./components/RecipeTools/EditRecipe"
import MealCalendar from "./components/Calendar/MealCalendar"
import AllMeals from "./components/AllMeals/AllMeals"
import MealTools from "./components/MealTools/MealTools"
import { now, useFirestoreFetch } from "./util/hooks"
import { defaultMeal, formatMeals, type Meal } from "./types/meal"
import { defaultRecipe, type Recipe } from "./types/recipe"
import { collection, query, where } from "firebase/firestore"
import { type Plan, defaultPlan, isTimestamp } from "./types/plan"

export const AppContext = createContext<App>({
  date: now,
  user: null,
  screenSizes: {
    any: false, sm: false,
    md: false, lg: false,
    xl: false, xxl: false
  },
  meals: [defaultMeal],
  recipes: [defaultRecipe],
  plans: [defaultPlan],
  isMealsFetching: false,
  isRecipesFetching: false,
  isPlansFetching: false,
  setMeals: () => {},
  setRecipes: () => {},
  setPlans: () => {},
})

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null)
  const [queries, setQueries] = useState<FetchQueries>({
    meals: undefined,
    recipes: undefined,
    plans: undefined
  })
  const { isFetching: isMealsFetching, data: meals, setData: setMeals } = useFirestoreFetch<Meal>([defaultMeal], queries.meals)
  const { isFetching: isRecipesFetching, data: recipes, setData: setRecipes } = useFirestoreFetch<Recipe>([defaultRecipe], queries.recipes)
  const { isFetching: isPlansFetching, data: plans, setData: setPlans } = useFirestoreFetch<Plan>([defaultPlan], queries.plans)
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

  useEffect(() => {
    if(currentUser) {
      setQueries({
        meals: query(collection(firestore, "meals"), where("userId", "==", currentUser.uid)),
        recipes: query(collection(firestore, "recipes"), where("userId", "==", currentUser.uid)),
        plans: query(collection(firestore, "plans"), where("userId", "==", currentUser.uid))
      })
    }
  }, [currentUser])

  useEffect(() => {
    recipes[0].title && setMeals(formatMeals(modifyData<Meal>(meals, "format"), recipes))
  }, [recipes])

  useEffect(() => {
    if(plans[0].title) formatPlans()

    function formatPlans() {
      const list = plans.map(plan => 
        isTimestamp(plan.date)
          ? { ...plan, date: plan.date.toDate() }
          : plan
      )
      setPlans(list)
    }
  }, [])
  
  return (
    <AppContext.Provider value={{
      date: now,
      user: currentUser,
      screenSizes: matches,
      meals,
      recipes,
      plans,
      setMeals,
      setRecipes,
      setPlans,
      isMealsFetching,
      isRecipesFetching,
      isPlansFetching
    }}>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="meals">
            <Route path="all" element={<AllMeals/>}/>
            <Route path="search" element={<NewRecipeSearch/>}/>
            <Route path="create" element={<MealTools mode="create"/>}/>
            <Route path="edit">
              <Route path=":mealId" element={<MealTools mode="edit"/>}/>
            </Route>
            <Route path="calendar" element={<MealCalendar/>}/>
          </Route>
          <Route path="recipes">
            <Route index element={<AllRecipes/>}/>
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