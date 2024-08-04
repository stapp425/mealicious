import { useContext } from "react"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"
import { MealEditContext } from "./CreateMeal"

type Props = {
  className?: string
  onClick: (...params: any) => unknown
}

const AddRecipeButton: React.FC<Props> = ({ className, onClick }) => {
  const { isEditActive } = useContext(MealEditContext)
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `bg-slate-300 hover:bg-slate-400 active:bg-slate-500
         border-slate-500 hover:border-slate-600 active:border-slate-700
         text-slate-600 hover:text-slate-700 active:text-slate-800
         border border-dashed flex flex-col items-center p-4 rounded-md transition-colors`, className)}
      >
      {
        isEditActive
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