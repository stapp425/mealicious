import { useEffect, useContext } from "react"
import { AppContext } from "@/App"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type Meal, defaultMeal } from "@/types/meal"
import { AnimatePresence } from "framer-motion"
import { useFirestoreGet, useFirestoreUpdate } from "@/util/hooks"
import ToolWindow from "./ToolWindow"
import AddWindow from "./AddWindow"
import { useParams } from "react-router-dom"
import { MealEditContext } from "./MealTools"
import { modifyData } from "@/types/app"

const EditMeal: React.FC = () => {
  const { isAddRecipeActive } = useContext(MealEditContext)
  const { mealId } = useParams()
<<<<<<< HEAD
  const { user } = useContext(AppContext)
  const { data: meal } = useFirestoreGet<Meal>(defaultMeal, { name: "meals", id: mealId as string })
=======
  const { user, meals, setMeals, formatMeals } = useContext(AppContext)
  const { data: mealData } = useFirestoreGet<Meal>(defaultMeal, { name: "meals", id: mealId as string })
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
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
      const editedData = { ...data, userId: user.uid }
    
<<<<<<< HEAD
=======
      setMeals(formatMeals(modifyData<Meal>(meals, "update", editedData)))
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
      updateMeal(editedData, { name: "meals", id: mealId as string })
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