import { useEffect, useContext } from "react"
import { AppContext } from "@/App"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type Meal, defaultMeal, formatMeal } from "@/types/meal"
import { AnimatePresence } from "framer-motion"
import { useFirestoreGet, useFirestoreUpdate } from "@/util/hooks"
import ToolWindow from "./ToolWindow"
import AddWindow from "./AddWindow"
import { useParams } from "react-router-dom"
import { MealEditContext } from "./MealTools"

const EditMeal: React.FC = () => {
  const { isAddRecipeActive } = useContext(MealEditContext)
  const { mealId } = useParams()
  const { user } = useContext(AppContext)
  const { data: meal } = useFirestoreGet<Meal>("meals", mealId as string, formatMeal, defaultMeal)
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
    if(user) {
      const editedData = { 
        ...data,
        contents: data.contents.map(content => ({
          type: content.type,
          recipe: content.recipe.id as string
        })),
        userId: user.uid }
      
      updateMeal("meals", mealId as string, editedData)
    }
  }

  function sendProps() {
    return {
      register, control,
      setValue, reset,
      error: errors,
      setError,
      clearErrors
    }
  }

  useEffect(() => {
    document.title = "Edit Meal | Mealicious"
    
    function handleUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
    }

    window.addEventListener("beforeunload", handleUnload)

    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [])

  useEffect(() => {
    meal && reset(meal)
  }, [meal])

  return (
    <form onSubmit={handleSubmit(submitMeal)} className="overflow-hidden h-[calc(100vh-150px)] w-screen flex justify-between gap-4">
      <ToolWindow {...sendProps()}/>
      <AnimatePresence>
        { isAddRecipeActive && <AddWindow setValue={setValue} getValues={getValues}/> }
      </AnimatePresence>
    </form>
  )
}

export default EditMeal