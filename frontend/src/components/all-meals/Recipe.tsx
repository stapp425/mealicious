import { type Recipe as RecipeType } from "@/util/types/recipe"
import { ArrowUpRight, Earth } from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { Link } from "react-router-dom"

type RecipeProps = {
  recipe: RecipeType
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => (
  <div className="overflow-hidden w-full lg:w-[600px] h-[33vw] lg:h-[25vw] lg:max-h-[300px] bg-white border border-slate-400 flex md:flex-col rounded-lg">
    <img
      src={recipe.image}
      alt={recipe.title}
      className="w-1/3 md:w-full h-full md:h-1/2 object-cover"
    />
    <div className="overflow-hidden flex-1 flex flex-col gap-2 p-[clamp(8px,3vw,16px)]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg text-wrap line-clamp-1 lg:line-clamp-none">{recipe.title}</h1>
        <Link to={`/recipes/${recipe.id as string}`} target="_blank">
          <button className="aspect-square border border-slate-400 rounded-sm">
            <ArrowUpRight />
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {
          recipe.diets?.map((diet, index) => 
            <div key={index} className="text-white font-[600] text-xs px-2 bg-orange-500 rounded-full select-none">
              {diet}
            </div>
          )
        }
      </div>
      <div className="flex-1 flex justify-between gap-4 items-end">
        <p className="truncate text-muted-foreground text-nowrap">
          {recipe.dishTypes?.join(" · ")}
        </p>
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

export default Recipe