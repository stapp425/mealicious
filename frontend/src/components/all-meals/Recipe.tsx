import { type Recipe as RecipeType } from "@/util/types/recipe"
import { ArrowUpRight, Earth } from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { Link } from "react-router-dom"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

type Props = {
  recipe: RecipeType
}

const Recipe: React.FC<Props> = ({ recipe }) => {
  return (
    <div className="h-[250px] w-[600px] bg-white border border-slate-400 flex gap-4 p-4 rounded-md">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-md max-h-[250px]"
      />
      <div className="overflow-hidden flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg line-clamp-1">{recipe.title}</h1>
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
        <ScrollArea className="flex-1 max-h-[400px] w-full" type="always">
          <div className="grid grid-cols-2 gap-2">
            {
              recipe.ingredients.map((ingredient, index) => 
                <h1 key={index} className="truncate h-fit border border-slate-400 text-center rounded-md px-4 py-2">
                  {ingredient.name}
                </h1>
              )
            }
          </div>
          <ScrollBar/>
        </ScrollArea>
        <div className="flex justify-between gap-4 items-center">
          <p className="max-w-[325px] truncate text-muted-foreground text-nowrap">
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
}

export default Recipe