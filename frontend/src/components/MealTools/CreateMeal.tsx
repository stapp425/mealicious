import { useContext } from "react"
import { MealEditContext } from "./MealTools"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type Meal, defaultMeal } from "@/types/meal"
import { AnimatePresence } from "framer-motion"
import { useFirestorePost } from "@/util/hooks"
import { AppContext } from "@/App"
import ToolWindow from "./ToolWindow"
import AddWindow from "./AddWindow"

const CreateMeal: React.FC = () => {
  const { isAddRecipeActive } = useContext(MealEditContext)
  const { user }  = useContext(AppContext)

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
      addMeal({ ...data, userId: user.uid }, { name: "meals" })
    }
  }

  function sendProps() {
    return {
      register, control,
      setValue, reset,
      error: errors,
      setError, clearErrors
    }
  }
  
  return (
    <form onSubmit={handleSubmit(submitMeal)} className="overflow-hidden h-[calc(100vh-150px)] w-screen flex justify-between gap-4">
      <ToolWindow {...sendProps()}/>
      <AnimatePresence>
        { isAddRecipeActive && <AddWindow setValue={setValue} getValues={getValues}/> }
      </AnimatePresence>
    </form>
  )
}

export default CreateMeal