import { type Recipe as RecipeType } from "@/util/types/recipe"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ThemeButton from "@/components/theme/Button"
import { Bookmark, Clock, Earth, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { type Layout } from "@/util/types/app"
import Details from "./Details"
import { useFirestorePost } from "@/util/hooks"
import { useContext } from "react"
import { AppContext } from "@/App"
import Spinner from "../theme/Spinner"

type VariantProps = {
  recipe: RecipeType
  isSubmitting: boolean
  saveRecipe: () => void
}

const Recipe: React.FC<{ recipe: RecipeType, layout?: Layout }> = ({ layout = "list", recipe }) => {
  const { user } = useContext(AppContext)
  const { addFirestoreDoc, isWorking } = useFirestorePost()

  async function saveRecipe(recipe: RecipeType) {
    try {
      await addFirestoreDoc("recipes", { ...recipe, userId: user?.uid })
    } catch (err: any) {
      alert("Failed to add recipe.")
      console.error(err.message)
    }
  }
  
  const layoutMap = {
    list: List,
    card: Card,
    square: Square
  }

  const Variant = layoutMap[layout]

  return (
    <Variant
      recipe={recipe}
      saveRecipe={() => saveRecipe(recipe)}
      isSubmitting={isWorking}
    />)
}

const List: React.FC<VariantProps> = ({ recipe, saveRecipe, isSubmitting }) => (
  <div className="overflow-hidden min-h-[225px] w-full flex justify-between rounded-lg border-2 border-slate-200">
    <div className="relative group overflow-hidden flex justify-center items-center basis-1/3 shadow-lg">
      <Dialog>
        <DialogTrigger className="h-full">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full group-hover:scale-110 transition object-cover object-center"
          />
        </DialogTrigger>
        <DialogContent className="w-[90vw] md:w-[500px] h-[min(650px,90vh)] flex flex-col gap-0 p-0">
          <ScrollArea type="always" className="flex-1 size-full">
            <Details recipe={recipe}/>
            <ScrollBar/>
          </ScrollArea>
          <div className="p-3 border-t border-t-slate-300">
            <ThemeButton 
              disabled={isSubmitting}
              onClick={saveRecipe}
              className="w-full h-10 disabled:cursor-not-allowed disabled:bg-orange-300"
            >
              {
                isSubmitting
                ? <><Spinner className="inline mr-1.5"/> <span>Saving...</span></>
                : <><Bookmark className="inline mr-1.5"/> <span>Save</span></>
              }
            </ThemeButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    <div className="relative flex flex-col justify-between basis-2/3 py-3 px-4">
      <h1 className="font-bold text-lg mx-0 pr-2">{recipe.title}</h1>
      {
        recipe.diets && recipe.diets.length > 0 && 
        <div className="flex flex-wrap gap-1.5">
          {recipe.diets.slice(0, 3).map((diet, index) => <Badge key={index} className="pointer-events-none bg-orange-500">{diet}</Badge>)}
        </div>
      }            
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center gap-2 my-1">
          <Zap/>
          <span>
            <b>{Math.round(recipe.nutrition[0].amount)}</b> cal
          </span>
        </div>
        <div className="flex items-center gap-2 my-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Clock/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ready Time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span>
            <b>{recipe.times.readyTime}</b> mins
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {
          recipe.ingredients.slice(0, 3).map((ingredient, index) => (
            <div key={index} className="pointer-events-none min-w-8 text-sm p-2 border-2 border-slate-300 rounded-md">
              {ingredient.name}
            </div>
          ))
        }
      </div>
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground max-w-[90%]">{recipe.dishTypes?.slice(0, 5).join(" · ")}</p>
        {
          recipe.source &&
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link to={recipe.source.url} target="_blank">
                  <Earth color="#1e293b"/>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                {recipe.source.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      </div>
    </div>
  </div>
)

const Card: React.FC<VariantProps> = ({ recipe, saveRecipe }) => (
  <div className="overflow-hidden flex flex-col justify-between w-[275px] md:w-[225px] h-[500px] rounded-lg border-2 border-slate-200">
    <div className="group relative overflow-hidden basis-[30%]">
      <Dialog>
        <DialogTrigger>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="group-hover:scale-110 transition object-cover object-center"
          />
        </DialogTrigger>
        <DialogContent className="w-[90vw] md:w-[500px] h-[min(650px,90vh)] flex flex-col gap-0 p-0">
          <ScrollArea type="always" className="flex-1 size-full">
            <Details recipe={recipe}/>
            <ScrollBar/>
          </ScrollArea>
          <div className="p-3 border-t border-t-slate-300">
            <ThemeButton className="w-full h-fit" onClick={saveRecipe}>
              <Bookmark className="inline mr-1.5"/> <span>Save</span>
            </ThemeButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    <h1 className="text-center font-bold py-3 px-2">{recipe.title}</h1>
    {
      recipe.diets && recipe.diets.length > 0 &&
      <div className="flex flex-wrap justify-center items-center gap-[4px]">
        {recipe.diets.slice(0, 2).map((diet, index) => <Badge key={index} className="pointer-events-none bg-orange-500">{diet}</Badge>)}
      </div>
    }
    <div className="flex flex-wrap justify-between items-center py-1 px-3 gap-2">
      <div className="flex flex-wrap justify-center items-center gap-2 my-1">
        <Zap/>
        <span>
          <b>{Math.round(recipe.nutrition[0].amount)}</b> cal
        </span>
      </div>
      <div className="flex items-center gap-2 my-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Clock/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ready Time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>
          <b>{recipe.times.readyTime}</b> mins
        </span>
      </div>
    </div>
    <ScrollArea>
      <div className="text-center flex-1 flex flex-col justify-between gap-2 px-3 py-2">
        {
          recipe.ingredients.slice(0, 3).map((ingredient, index) => (
            <div key={index} className="pointer-events-none min-w-8 text-sm px-2 py-1 border-2 border-slate-300 rounded-md">
              {ingredient.name}
            </div>
          ))
        }
      </div>
    </ScrollArea>
    <div className="flex justify-between items-end px-3 py-2">
      <p className="text-muted-foreground max-w-[90%]">{recipe.dishTypes?.slice(0, 5).join(" · ")}</p>
      {
        recipe.source &&
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link to={recipe.source.url} target="_blank">
                <Earth color="#1e293b"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              {recipe.source.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    </div>
  </div>
)

const Square: React.FC<VariantProps> = ({ recipe, saveRecipe }) => (
  <div className="overflow-hidden relative flex flex-col w-full sm:w-[200px] rounded-lg shadow-md border border-slate-400">
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="flex-1 w-full hover:scale-110 hover:cursor-pointer object-cover transition-transform"
        />
      </DialogTrigger>
      <DialogContent className="w-[90vw] md:w-[500px] h-[min(650px,90vh)] flex flex-col gap-0 p-0">
        <ScrollArea type="always" className="flex-1 size-full">
          <Details recipe={recipe}/>
          <ScrollBar/>
        </ScrollArea>
        <div className="p-3 border-t border-t-slate-300">
          <ThemeButton className="w-full h-fit" onClick={saveRecipe}>
            <Bookmark className="inline mr-1.5"/> <span>Save</span>
          </ThemeButton>
        </div>
      </DialogContent>
    </Dialog>
    {
      recipe.source &&
      <div className="absolute top-2 right-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="size-10 bg-white hover:bg-slate-400 p-0 transition-colors">
                <Link to={recipe.source.url} target="_blank">
                  <Earth color="#000000"/>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {recipe.source.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    }
    <div className="w-full h-fit min-h-1/3 text-sm font-[600] line-clamp-2 p-3">
      {recipe.title}
    </div>
  </div>
)

export default Recipe