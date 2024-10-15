import { useState } from "react"
import { type Recipe, defaultRecipe } from "@/util/types/recipe"
import { type Meal } from "@/util/types/meal"
import { useInputChange } from "@/util/hooks"
import { Clipboard, Clock, Heart, Microwave, MoveLeft, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Placeholder from "@/components/theme/Placeholder"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { ReactHookFormTypes } from "@/util/types/form"
import { LucideIcon } from "@/util/types/app"
import { cn } from "@/lib/utils"
import Error from "../theme/Error"

type AddWindowProps = {
  className?: string
  recipes: Recipe[]
} & Pick<ReactHookFormTypes<Meal>, "setValue" | "getValues" | "error"> & React.HTMLAttributes<HTMLDivElement>

type SelectedRecipeProps = {
  onReturn: () => void
  recipe: Recipe
} & React.HTMLAttributes<HTMLDivElement> & Pick<ReactHookFormTypes<Meal>, "setValue" | "getValues">

type Type = {
  type: string
}

const AddWindow: React.FC<AddWindowProps> = ({ className, recipes, error, setValue, getValues }) => {  
  const navigate = useNavigate()
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(defaultRecipe)
  
  return (
    <>
    {
      error.contents &&
      <Error>{error.contents.message}</Error>
    }
    <Dialog onOpenChange={() => setSelectedRecipe(defaultRecipe)}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn("bg-slate-300 hover:bg-slate-400 active:bg-slate-500 border-slate-500 hover:border-slate-600 active:border-slate-700 text-slate-600 hover:text-slate-700 active:text-slate-800 flex flex-col items-center p-4 rounded-md transition-colors", className)}
        >
          <Plus size={36}/>
          <span className="font-[600]">Add a Recipe</span>
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-hidden w-[clamp(350px,67vw,500px)] h-[clamp(400px,80vh,1000px)] p-0">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Saved Recipes List</DialogTitle>
            <DialogDescription>
              This section is composed of recipes that the user can add to their meal.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        {
          selectedRecipe.id
          ? <SelectedRecipe onReturn={() => setSelectedRecipe(defaultRecipe)} recipe={selectedRecipe} setValue={setValue} getValues={getValues}/>
          : <ScrollArea type="always" className="size-full">
              <div className="space-y-2 p-3 lg:p-6">
                <h2 className="font-bold text-xl lg:text-3xl">Saved Recipes</h2>
                {
                  recipes.length > 0 
                  ? recipes.map((recipe, index) => <Recipe key={index} onClick={() => setSelectedRecipe(recipe)} recipe={recipe}/>)
                  : <Placeholder icon={<X size={64}/>}>
                      <Placeholder.Message>No Recipes Found!</Placeholder.Message>
                      <Placeholder.Tip>Try Creating One!</Placeholder.Tip>
                      <Placeholder.Action onClick={() => navigate("/recipes/create")} className="text-sm">Create Recipe</Placeholder.Action>
                    </Placeholder>
                }
              </div>
            <ScrollBar/>
          </ScrollArea>
        }
      </DialogContent>
    </Dialog>
    </>
  )
}

const Time: React.FC<{ Icon: LucideIcon, children: React.ReactNode }> = ({ Icon, children }) => (
  <div className="flex-1 flex justify-between items-center text-sm lg:text-lg bg-orange-500 text-white p-3 rounded-sm">
    <Icon/>
    <div className="flex gap-2">
      <h1><b>{children}</b> mins</h1>
    </div>
  </div>
)

const Recipe: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement>, recipe: Recipe }> = ({ onClick, recipe }) => (
  <button
    onClick={onClick}
    type="button"
    className="overflow-hidden group border border-slate-300 h-[125px] w-full flex justify-between items-start hover:bg-orange-500 hover:border-orange-500 transition-colors rounded-md"
  >
    <img
      src={recipe.image}
      alt={recipe.title}
      className="bg-white w-1/3 h-full object-cover"
    />
    <div className="flex-1 p-2">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-[600] group-hover:text-white truncate max-w-[175px] text-nowrap">{recipe.title}</h1>
        {recipe.isFavorite && <Heart size={18} className="text-rose-500 group-hover:text-white"/>}
      </div>
      <p className="line-clamp-3 text-left text-sm font-[600] text-muted-foreground group-hover:text-white">{recipe.description}</p>
    </div>
  </button>
)

const SelectedRecipe: React.FC<SelectedRecipeProps> = ({ onReturn, recipe, setValue, getValues }) => {
  const { input, handleChange } = useInputChange<Type>({ type: "" })
  
  return (
    <>
    <ScrollArea type="always" className="relative h-full">
      <div className="min-h-full flex flex-col">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[33vh] object-cover"
        />
        <button
          type="button"
          onClick={onReturn}
          className="absolute top-2 left-2 lg:top-3 lg:left-3 flex items-center gap-2 w-fit bg-orange-500 text-sm text-white px-3 py-2 rounded-sm font-[600] hover:bg-orange-700 active:bg-orange-800 transition-colors"
        >
          <MoveLeft size={16}/>
          Return
        </button>
        <div className="flex-1 flex flex-col gap-3 p-4">
          <h1 className="text-center font-bold text-lg">{recipe.title}</h1>
          <div className="flex justify-between gap-2">
            <Time Icon={Clock}>{recipe.times.readyTime}</Time>
            <Time Icon={Microwave}>{recipe.times.cookTime}</Time>
            <Time Icon={Clipboard}>{recipe.times.prepTime}</Time>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-2">
            {
              recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="odd:last:col-span-2 flex-1 border border-slate-400 rounded-md min-w-[100px] p-2">
                  <h1 className="font-bold text-sm">{ingredient.amount} {ingredient.unit}</h1>
                  <span className="font-[600] text-sm text-muted-foreground">{ingredient.name}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <ScrollBar/>
    </ScrollArea>
    <div className="sticky bottom-0 left-0 z-10 w-full flex justify-between gap-3 p-3 border-t border-t-slate-400 bg-white">
      <Input
        name="type"
        value={input.type}
        onChange={handleChange}
        placeholder="Type..."
        autoComplete="off"
        className="flex-1"
      />
      <button
        onClick={() => { input.type && setValue("contents", [...getValues("contents"), { type: input.type, recipe: recipe }])}}
        type="button"
        className="size-10 flex justify-center items-center bg-orange-500 rounded-md hover:bg-orange-700 active:bg-orange-800 transition-colors"
      >
        <Plus size={18} className="text-white"/>
      </button>
    </div>
    </>
  )
}

export default AddWindow