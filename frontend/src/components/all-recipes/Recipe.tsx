import { useContext } from "react"
import { Badge } from "../ui/badge"
import { AppContext } from "@/App"
import { Ingredient, type Recipe } from "@/util/types/recipe"
import { Clock, Earth, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"

type RecipeProps = {
  recipe: Recipe
  onChange: (recipe: Recipe) => void
  activeRecipe: string
}

const Recipe: React.FC<RecipeProps> = (props) => {
  const { screenSizes: { xxl } } = useContext(AppContext)
  const Variant = xxl ? List : Square

  return <Variant {...props}/>
}

const List: React.FC<RecipeProps> = ({ recipe, onChange, activeRecipe }) => (
  <label className={`max-h-[200px] w-full overflow-hidden border ${recipe.isFavorite ? "bg-rose-100 border-rose-400" : "border-slate-400"} flex justify-between rounded-lg hover:cursor-pointer hover:bg-slate-100 has-[:checked]:border-2 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-100 transition-all`}>
    <input
      type="radio"
      name="recipe"
      value={recipe.title}
      onChange={() => onChange(recipe)}
      checked={recipe.title === activeRecipe}
      className="hidden"
    />
    <div className="relative group overflow-hidden flex justify-center items-center basis-1/3 shadow-lg">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="size-full object-cover"
      />
    </div>
    <div className="relative flex flex-col justify-between gap-1 basis-2/3 py-3 px-4">
      <h1 className="font-bold text-lg mx-0 pr-2">{recipe.title}</h1>
      {
        recipe.diets && recipe.diets.length > 0 && 
        <div className="flex gap-[6px]">
          {recipe.diets.slice(0, 3).map((diet: string) => <Badge key={nanoid()} className="pointer-events-none bg-orange-500">{diet}</Badge>)}
        </div>
      }            
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center gap-2 my-1">
          <Zap/>
          <span>
            <b>{Math.round(recipe.nutrition.find(n => n.unit.toLowerCase() === "kcal")?.amount || 0)}</b> cal
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
          recipe.ingredients.slice(0, 3).map((ingredient: Ingredient) => (
            <div key={nanoid()} className="max-w-[150px] line-clamp-1 pointer-events-none min-w-8 text-sm p-2 border border-slate-300 bg-white rounded-md">
              {ingredient.name}
            </div>
          ))
        }
      </div>
      <div>
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground max-w-[90%]">{recipe.dishTypes?.slice(0, 5).join(" · ")}</p>
        {
          recipe.source &&
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
        }
      </div>
      </div>
    </div>
  </label>
)

const Square: React.FC<RecipeProps> = ({ recipe, onChange, activeRecipe }) => (
  <label className={`relative overflow-hidden size-[150px] md:size-[250px] border ${recipe.isFavorite ? "bg-rose-100 border-rose-400" : "border-slate-400"} flex flex-col justify-between pb-4 rounded-lg hover:cursor-pointer hover:bg-slate-100 has-[:checked]:border-2 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-100 transition-all`}>
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
      className="h-3/4 md:h-3/5 w-full object-cover"
    />
    <h1 className="flex-1 md:flex-none text-left md:text-center font-bold text-lg line-clamp-1 px-2">{recipe.title}</h1>
    <div className="hidden md:flex gap-2 text-muted-foreground px-4">
      <Zap/> 
      <h3 className="font-bold after:content-['_kcal']">
        {Math.round(recipe.nutrition.find(n => n.name.toLowerCase() === "calories")?.amount || 0)}
      </h3>
    </div>
    <div className="hidden md:flex gap-2 text-muted-foreground px-4">
      <Clock/>
      <span>
        <b>{Math.round(recipe.times.readyTime)}</b> min
      </span>
    </div>
    <Link 
      to={recipe.source?.url as string}
      target="_blank"
      className="absolute top-2 right-2 md:top-auto md:bottom-2 p-1.5 bg-white md:bg-transparent rounded-sm"
    >
      <Earth/>
    </Link>
  </label>
)

export default Recipe