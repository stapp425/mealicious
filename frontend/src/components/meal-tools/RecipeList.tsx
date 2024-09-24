import { useEffect } from "react"
import { MealType, type Meal } from "@/util/types/meal"
import { type Obj } from "@/util/types/app"
import { type RequiredFieldArray } from "@/util/types/form"
import { cn } from "@/lib/utils"
import { useWatch } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { Heart } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import AddRecipeButton from "./AddRecipeButton"

interface Props<T extends Obj> extends RequiredFieldArray<T> {
  contentClassName?: string
}

const RecipeList: React.FC<Props<Meal>> = ({ control, setValue, className, contentClassName, setError, clearErrors }) => {  
  const recipeList = useWatch({
    control,
    name: "contents"
  })

  function removeContent(content: MealType) {
    setValue("contents", recipeList.filter(entry => entry.recipe.id !== content.recipe.id))
  }

  useEffect(() => {
    if(recipeList.length === 0) {
      setError("contents", {
        type: "missing",
        message: "Recipe list must not be empty."
      })
    } else 
      clearErrors("contents")
  }, [recipeList])
  
  return (
    <ScrollArea type="always" className={cn("overflow-hidden max-w-full", className)}>
      <div className={cn("flex flex-col gap-2", contentClassName)}>
        <AnimatePresence>
          {
            recipeList.map((content, index) => (
              <motion.button
                type="button"
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => removeContent(content)}
                className="flex gap-2 h-[150px] border border-slate-400 hover:border-red-500 hover:bg-red-300 p-3 rounded-md transition-colors"
              >
                <img
                  src={content.recipe.image}
                  alt={content.recipe.title}
                  className="h-full rounded-md"
                />
                <div className="relative flex-1 h-full">
                  <div className="flex justify-between items-center">
                    <h1 className="text-left font-bold text-xl line-clamp-1">{content.recipe.title}</h1>
                    {content.recipe.isFavorite && <Heart size={20} className="text-rose-500 group-hover:text-white"/>}
                  </div>
                  <p className="text-left text-slate-400 text-sm font-[600] line-clamp-3">
                    {content.recipe.description}
                  </p>
                  <h1 className="absolute bottom-0 right-0 font-[600] text-white text-sm px-2 bg-orange-500 rounded-md">
                    {content.type}
                  </h1>
                </div>
              </motion.button>
            ))
          }
          <AddRecipeButton/>
        </AnimatePresence>
      </div>
      <ScrollBar/>
    </ScrollArea>
  )
}

export default RecipeList