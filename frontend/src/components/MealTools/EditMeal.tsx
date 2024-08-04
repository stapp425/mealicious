import { useState, useEffect, createContext, useContext,  } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type Meal, defaultMeal } from "@/types/meal"
import { type Recipe, defaultRecipe } from "@/types/recipe"
import { AnimatePresence } from "framer-motion"
import { useFirestoreFetch, useFirestoreGet, useFirestoreUpdate } from "@/util/hooks"
import { collection, query, type Query, where } from "firebase/firestore"
import { CurrentUser } from "@/types/app"
import { UserContext } from "@/App"
import { firestore } from "../../../../firebaseConfig"
import ToolWindow from "./ToolWindow"
import AddWindow from "./AddWindow"
import { useParams } from "react-router-dom"

export const MealEditContext = createContext<{isEditActive: boolean, fetchedRecipeData: Recipe[]}>({
  isEditActive: false,
  fetchedRecipeData: [defaultRecipe]
})

const EditMeal: React.FC = () => {
  const { mealId } = useParams()
  const user = useContext<CurrentUser>(UserContext)
  const [q, setQ] = useState<Query>()
  const { data: mealData } = useFirestoreGet<Meal>("meals", mealId as string)
  const { data: recipesData } = useFirestoreFetch<Recipe>(q, [defaultRecipe])
  const [isAddRecipeActive, setIsAddRecipeActive] = useState<boolean>(false)
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<Meal>({ defaultValues: defaultMeal })
  const { updateFirestoreDoc: updateMeal } = useFirestoreUpdate()

  const submitMeal: SubmitHandler<Meal> = async (data) => {
    if(user)
      updateMeal("meals", mealId as string, { ...data, userId: user.uid })
  }

  function sendProps() {
    return {
      toggleEditMode: toggleEditMode,
      register: register,
      control: control,
      setValue: setValue,
      reset: reset,
      error: errors,
      setError: setError,
      clearErrors: clearErrors
    }
  }
  
  function toggleEditMode() {
    setIsAddRecipeActive(a => !a)
  }

  useEffect(() => {
    function handleUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
    }

    window.addEventListener("beforeunload", handleUnload)

    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [])

  useEffect(() => {
    user && setQ(query(collection(firestore, "recipes"), where("userId", "==", user.uid)))
  }, [user])

  useEffect(() => {
    mealData && reset(mealData)
  }, [mealData])

  return (
    <MealEditContext.Provider value={{ isEditActive: isAddRecipeActive, fetchedRecipeData: recipesData }}>
      <form onSubmit={handleSubmit(submitMeal)} className="overflow-hidden h-[calc(100vh-150px)] w-screen flex justify-between gap-4">
        <ToolWindow {...sendProps()}/>
        <AnimatePresence>
          { isAddRecipeActive && <AddWindow setValue={setValue} getValues={getValues}/> }
        </AnimatePresence>
      </form>
    </MealEditContext.Provider>
  )
}

export default EditMeal