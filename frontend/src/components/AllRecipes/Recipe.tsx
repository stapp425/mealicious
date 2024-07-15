import { useContext } from "react"
import { type Breakpoints } from "@/types/other"
import { Badge } from "../ui/badge"
import { ScreenContext } from "@/App"
import { Ingredient, type Recipe } from "@/types/recipe"
import { ActiveRecipeContext } from "./AllRecipes"
import { Clock, Earth, Wheat, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"

type Props = {
  recipe: Recipe
  onChange: (recipe: Recipe) => void
}

export default function Recipe({ recipe, onChange }: Props): React.ReactElement {
  const { xl } = useContext<Breakpoints>(ScreenContext)

  return xl ? <List recipe={recipe} onChange={onChange}/> : <Square recipe={recipe} onChange={onChange}/>
}

function List({ recipe, onChange }: Props): React.ReactElement {
  const activeRecipe = useContext<string>(ActiveRecipeContext)

  return (
    <label className="overflow-hidden min-h-[225px] w-full border border-slate-400 flex justify-between rounded-lg hover:cursor-pointer hover:bg-slate-100 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-100 transition-all">
      <input
        type="radio"
        name="recipe"
        value={recipe.title}
        onChange={() => onChange(recipe)}
        checked={recipe.title === activeRecipe}
        className="hidden"
      />
      <div className="relative group overflow-hidden flex justify-center items-center basis-1/3 shadow-lg">
        <div>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="scale-[150%] lg:scale-[200%] group-hover:scale-[175%] transition"
          />
          <div className="opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition"/>
        </div>
      </div>
      <div className="relative flex flex-col justify-between gap-1 basis-2/3 py-3 px-4">
        <h1 className="font-bold text-lg mx-0 pr-2">{recipe.title}</h1>
        {
          recipe.diets.length > 0 && 
          <div className="flex gap-[6px]">
            {recipe.diets.slice(0, 3).map((diet: string) => <Badge key={nanoid()} className="pointer-events-none bg-orange-500">{diet}</Badge>)}
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
          {
            recipe.isHealthy &&
            <div className="flex gap-2 my-1">
              <Wheat/>
              <span>Healthy</span>
            </div>
          }
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {
            recipe.ingredients.slice(0, 3).map((ingredient: Ingredient) => (
              <div key={nanoid()} className="max-w-[150px] line-clamp-1 pointer-events-none min-w-8 text-sm p-2 border border-slate-300 bg-white rounded-md">
                {ingredient.name}
              </div>
            ))
          }
        </div>
        <div>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground max-w-[90%]">{recipe.dishTypes.slice(0, 5).join(" · ")}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
              <Link to={recipe.source?.url as string} target="_blank">
                <Earth color="#1e293b"/>
              </Link>
              </TooltipTrigger>
              <TooltipContent>
                {recipe.source?.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        </div>
      </div>
    </label>
  )
}

function Square({ recipe, onChange }: Props): React.ReactElement {
  const activeRecipe = useContext<string>(ActiveRecipeContext)

  return (
    <label className="relative overflow-hidden aspect-square min-h-[225px] w-full border border-slate-400 flex flex-col justify-between p-4 rounded-lg hover:cursor-pointer hover:bg-slate-100 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-100 transition-all">
      <input
        type="radio"
        name="recipe"
        value={recipe.title}
        onChange={() => onChange(recipe)}
        checked={recipe.title === activeRecipe}
        className="hidden"
      />
      <img 
        src={recipe.image}
        alt={recipe.title}
        className="rounded-lg h-1/2 lg:h-2/3"
      />
      <h1 className="text-center font-bold text-lg line-clamp-1">{recipe.title}</h1>
      <div className="flex gap-2 text-muted-foreground">
        <Zap/> 
        <span>
          <b>{Math.round(recipe.nutrition[0].amount)}</b> cal
        </span>
      </div>
      <div className="flex gap-2 text-muted-foreground">
        <Clock/>
        <span>
          <b>{Math.round(recipe.times.readyTime)}</b> min
        </span>
      </div>
      <div className="absolute bottom-4 right-4">
        <Link to={recipe.source?.url as string} target="_blank">
          <Earth/>
        </Link>
      </div>
    </label>
  )
}