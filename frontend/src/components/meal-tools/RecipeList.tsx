import { useEffect } from "react"
import { MealType, type Meal } from "@/util/types/meal"
import { type ReactHookFormTypes } from "@/util/types/form"
import { cn } from "@/lib/utils"
import { useWatch } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { Heart } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type RecipeListProps = {
  className?: string
} & Pick<ReactHookFormTypes<Meal>, "control" | "setValue" | "setError" | "clearErrors">

const RecipeList: React.FC<RecipeListProps> = ({ control, setValue, className, setError, clearErrors }) => {  
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
    <ScrollArea type="always" className={cn("overflow-hidden w-full", className)}>
      <div className="flex flex-col space-y-2">
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
                className="overflow-hidden flex h-[150px] border border-slate-400 hover:border-red-500 hover:bg-red-300 rounded-md transition-colors"
              >
                <img
                  src={content.recipe.image}
                  alt={content.recipe.title}
                  className="w-1/3 h-full object-cover"
                />
                <div className="relative w-2/3 h-full p-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-left font-bold text-xl line-clamp-1">{content.recipe.title}</h1>
                    {content.recipe.isFavorite && <Heart size={20} className="text-rose-500 group-hover:text-white"/>}
                  </div>
                  <p className="text-left text-slate-400 text-sm font-[600] line-clamp-3">
                    {content.recipe.description}
                  </p>
                  <h1 className="absolute bottom-2 right-2 font-[600] text-white text-sm px-2 bg-orange-500 rounded-md">
                    {content.type}
                  </h1>
                </div>
              </motion.button>
            ))
          }
        </AnimatePresence>
      </div>
      <ScrollBar/>
    </ScrollArea>
  )
}

export default RecipeList