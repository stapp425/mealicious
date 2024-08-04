import { useState, useEffect, createContext, useContext,  } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type Meal, defaultMeal } from "@/types/meal"
import { type Recipe, defaultRecipe } from "@/types/recipe"
import { AnimatePresence } from "framer-motion"
import { useFirestoreFetch, useFirestorePost } from "@/util/hooks"
import { collection, query, type Query, where } from "firebase/firestore"
import { CurrentUser } from "@/types/app"
import { UserContext } from "@/App"
import { firestore } from "../../../../firebaseConfig"
import ToolWindow from "./ToolWindow"
import AddWindow from "./AddWindow"

export const MealEditContext = createContext<{isEditActive: boolean, fetchedRecipeData: Recipe[]}>({
  isEditActive: false,
  fetchedRecipeData: [defaultRecipe]
})

const CreateMeal: React.FC = () => {
  const user = useContext<CurrentUser>(UserContext)
  const [q, setQ] = useState<Query>()
  const { data } = useFirestoreFetch<Recipe>(q, [defaultRecipe])
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
  const { addFirestoreDoc: addMeal } = useFirestorePost()

  const submitMeal: SubmitHandler<Meal> = async (data) => {
    if(user) {
      addMeal("meals", { ...data, userId: user.uid })
    }
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
  
  return (
    <MealEditContext.Provider value={{ isEditActive: isAddRecipeActive, fetchedRecipeData: data }}>
      <form onSubmit={handleSubmit(submitMeal)} className="overflow-hidden h-[calc(100vh-150px)] w-screen flex justify-between gap-4">
        <ToolWindow {...sendProps()}/>
        <AnimatePresence>
          { isAddRecipeActive && <AddWindow setValue={setValue} getValues={getValues}/> }
        </AnimatePresence>
      </form>
    </MealEditContext.Provider>
  )
}

export default CreateMeal