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


const EditMeal: React.FC = () => {
  const { isAddRecipeActive } = useContext(MealEditContext)
  const { mealId } = useParams()
  const { user } = useContext(AppContext)
  const { data: mealData } = useFirestoreGet<Meal>(defaultMeal, { name: "meals", id: mealId as string })
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
      updateMeal({ ...data, userId: user.uid }, { name: "meals", id: mealId as string })
  }

  function sendProps() {
    return {
      register: register,
      control: control,
      setValue: setValue,
      reset: reset,
      error: errors,
      setError: setError,
      clearErrors: clearErrors
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
    mealData && reset(mealData)
  }, [mealData])

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