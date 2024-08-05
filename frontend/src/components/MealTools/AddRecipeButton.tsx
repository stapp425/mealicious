import { useContext } from "react"
import { MealEditContext } from "./MealTools"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"

type Props = {
  className?: string
}

const AddRecipeButton: React.FC<Props> = ({ className }) => {
  const { toggleAddRecipe, isAddRecipeActive } = useContext(MealEditContext)
  
  return (
    <button
      type="button"
      onClick={toggleAddRecipe}
      className={cn(
        `bg-slate-300 hover:bg-slate-400 active:bg-slate-500
         border-slate-500 hover:border-slate-600 active:border-slate-700
         text-slate-600 hover:text-slate-700 active:text-slate-800
         border border-dashed flex flex-col items-center p-4 rounded-md transition-colors`, className)}
      >
      {
        isAddRecipeActive
          ? <>
              <X size={36}/>
              <span className="font-[600]">Cancel</span>
            </>
          : <>
              <Plus size={36}/>
              <span className="font-[600]">Add a Recipe</span>
            </>
      }
    </button>
  )
}

export default AddRecipeButton