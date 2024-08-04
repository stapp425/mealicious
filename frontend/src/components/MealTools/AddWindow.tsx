import { useState, useRef, useEffect, useContext } from "react"
import { MealEditContext } from "./EditMeal"
import { type Obj } from "@/types/app"
import { type Recipe, defaultRecipe } from "@/types/recipe"
import { type Meal } from "@/types/meal"
import { type UseFormGetValues, type UseFormSetValue } from "react-hook-form"
import { animate, motion } from "framer-motion"
import { useInputChange } from "@/util/hooks"
import { Clipboard, Clock, Heart, Microwave, MoveLeft, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

type Props<T extends Obj> = {
  setValue: UseFormSetValue<T>
  getValues: UseFormGetValues<T>
}

type Type = {
  type: string
}

const AddWindow: React.FC<Props<Meal>> = ({ setValue, getValues }) => {  
  const { fetchedRecipeData } = useContext(MealEditContext)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(defaultRecipe)
  const [isRecipeSelected, setIsRecipeSelected] = useState<boolean>(false)
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  const { input, handleChange } = useInputChange<Type>({ type: "" })

  const addWindow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(addWindow.current && !isFirstRender) {
      animate(addWindow.current, 
        { x: isRecipeSelected ? [0, "-50%"] : ["-50%", 0] },
        { duration: 0.25, ease: "easeInOut" }
      )
    }
  }, [isRecipeSelected])
  
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "just", duration: 0.25 }}
      className="overflow-hidden border border-orange-400 w-[425px] rounded-l-2xl"
    >
      <div ref={addWindow} className="w-[200%] h-full flex">
        <div className="w-1/2 flex flex-col gap-2 p-4">
          {
            !isRecipeSelected &&
            <>
              <h1 className="font-bold text-3xl">Saved Recipes</h1>
              <div>
                {
                  fetchedRecipeData.map((recipe, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsRecipeSelected(true)
                        setIsFirstRender(false)
                        setSelectedRecipe(recipe)
                      }}
                      type="button"
                      className="group border border-slate-300 min-h-[100px] w-full flex justify-between gap-3 items-start hover:bg-orange-500 hover:border-orange-500 transition-colors p-3 rounded-md"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="h-[100px] bg-white rounded-sm"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h1 className="font-[600] group-hover:text-white line-clamp-1">{recipe.title}</h1>
                          {recipe.isFavorite && <Heart size={18} className="text-rose-500 group-hover:text-white"/>}
                        </div>
                        <p className="line-clamp-3 text-left text-sm font-[600] text-muted-foreground group-hover:text-white">{recipe.description}</p>
                      </div>
                    </button>
                  ))
                }
              </div>
            </>
          }
        </div>
        <div className="w-1/2 p-4">
          {
            isRecipeSelected &&
            <>
              <div className="h-full flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsRecipeSelected(false)
                    setSelectedRecipe(defaultRecipe)
                  }}
                  className="flex items-center gap-2 w-fit bg-orange-500 text-sm text-white px-3 py-2 rounded-sm font-[600] hover:bg-orange-700 active:bg-orange-800 transition-colors"
                >
                  <MoveLeft size={16}/>
                  Back to Recipes
                </button>
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                />
                <h1 className="text-center font-bold text-lg">{selectedRecipe.title}</h1>
                <div className="flex justify-between gap-2">
                  <div className="flex-1 flex justify-between items-center text-lg bg-orange-500 text-white p-3 rounded-sm">
                    <Clock/>
                    <div className="flex gap-2">
                      <h1>
                        <b>{selectedRecipe.times.readyTime}</b> mins
                      </h1>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-center text-lg bg-orange-500 text-white p-3 rounded-sm">
                    <Microwave/>
                    <div className="flex gap-2">
                      <h1>
                        <b>{selectedRecipe.times.cookTime}</b> mins
                      </h1>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-center text-lg bg-orange-500 text-white p-3 rounded-sm">
                    <Clipboard/>
                    <div className="flex gap-2">
                      <h1>
                        <b>{selectedRecipe.times.prepTime}</b> mins
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-wrap justify-between gap-2">
                  {
                    selectedRecipe.ingredients.slice(0, 4).map((ingredient, index) => (
                      <div key={index} className="flex-1 border border-slate-400 rounded-md min-w-[100px] p-2">
                        <h1 className="font-bold text-sm">{ingredient.amount} {ingredient.unit}</h1>
                        <span className="font-[600] text-sm text-muted-foreground">{ingredient.name}</span>
                      </div>
                    ))
                  }
                </div>
                <div className="flex justify-between gap-3">
                  <Input
                    name="type"
                    value={input.type}
                    onChange={handleChange}
                    placeholder="Type..."
                    autoComplete="off"
                    className="flex-1"
                  />
                  <button
                    onClick={() => { input.type && setValue("contents", [...getValues("contents"), { type: input.type, recipe: selectedRecipe.id as string }])}}
                    type="button"
                    className="size-10 flex justify-center items-center bg-orange-500 rounded-md hover:bg-orange-700 active:bg-orange-800 transition-colors"
                  >
                    <Plus size={18} className="text-white"/>
                  </button>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </motion.div>
  )
}

export default AddWindow