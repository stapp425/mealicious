import { useContext } from "react"
import { type Recipe, type Ingredient } from "@/types/recipe"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Earth, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"
import { type Breakpoints, type Layout } from "@/types/app"
import { ScreenContext } from "@/App"
import Details from "./Details"

type Props = {
  layout?: Layout
  recipe: Recipe
}

export default function Recipe({ layout, recipe }: Props): React.ReactElement {
  switch(layout) {
    case "list":
      return <List recipe={recipe}/>
    case "card":
      return <Card recipe={recipe}/>
    case "square":
      return <Square recipe={recipe}/>
    default:
      return <List recipe={recipe}/>
  }
}

function List({ recipe }: Props): React.ReactElement {
  const matches = useContext<Breakpoints>(ScreenContext)
  
  return (
    <div className="overflow-hidden min-h-[225px] flex justify-between rounded-lg border-2 border-slate-200">
      <div className="relative group overflow-hidden flex justify-center items-center basis-1/3 shadow-lg">
        <Dialog>
          <DialogTrigger>
            <div>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="scale-[175%] lg:scale-[200%] group-hover:scale-[175%] transition"
              />
              <div className="opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition"/>
            </div>
          </DialogTrigger>
          <DialogContent>
            <ScrollArea>
              <Details recipe={recipe} matches={matches.md}/>
              <ScrollBar/>
            </ScrollArea>
          </DialogContent>
        </Dialog>
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
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {
            recipe.ingredients.slice(0, 3).map((ingredient: Ingredient) => (
              <div key={nanoid()} className="pointer-events-none min-w-8 text-sm p-2 border-2 border-slate-300 rounded-md">
                {ingredient.name}
              </div>
            ))
          }
        </div>
        <div>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground max-w-[90%]">{recipe.dishTypes.slice(0, 5).join(" · ")}</p>
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
    </div>
  )
}

function Card({ recipe }: Props) {
  const matches = useContext<Breakpoints>(ScreenContext)

  return (
    <div className="overflow-hidden flex flex-col justify-between w-[275px] md:w-[225px] h-[500px] rounded-lg border-2 border-slate-200">
      <div className="group relative overflow-hidden basis-[30%]">
        <Dialog>
          <DialogTrigger>
            <div>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="scale-[175%] lg:scale-[200%] group-hover:scale-[175%] transition"
              />
              <div className="opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition"/>
            </div>
          </DialogTrigger>
          <DialogContent>
            <ScrollArea>
              <Details recipe={recipe} matches={matches.md}/>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <h1 className="text-center font-bold py-3 px-2">{recipe.title}</h1>
      {
        recipe.diets.length > 0 &&
          <div className="flex flex-wrap justify-center items-center gap-[4px]">
            { recipe.diets.slice(0, 2).map((diet:string) => <Badge key={nanoid()} className="pointer-events-none bg-orange-500">{diet}</Badge>) }
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
            recipe.ingredients.slice(0, 3).map((ingredient: Ingredient) => (
              <div key={nanoid()} className="pointer-events-none min-w-8 text-sm px-2 py-1 border-2 border-slate-300 rounded-md">
                {ingredient.name}
              </div>
            ))
          }
        </div>
      </ScrollArea>
      <div className="flex justify-between items-end px-3 py-2">
        <p className="text-muted-foreground max-w-[90%]">{recipe.dishTypes.slice(0, 5).join(" · ")}</p>
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
}

function Square({ recipe }: Props): React.ReactElement {
  const matches = useContext<Breakpoints>(ScreenContext)

  return (
    <div className="group relative overflow-hidden aspect-square w-3/4 md:w-full rounded-lg shadow-md">
      <Dialog>
        <DialogTrigger>
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[150%] lg:scale-[175%] group-hover:scale-[200%] transition"
            />
            <div className="opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition"/>
          </div>
        </DialogTrigger>
        <DialogContent>
          <ScrollArea>
            <Details recipe={recipe} matches={matches.md}/>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      {
        recipe.source &&
          <div className="absolute top-2 left-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button className="opacity-75 p-0 size-10 bg-white hover:bg-white hover:opacity-100">
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
      
      <div className="absolute w-[calc(100%-12px)] bottom-2 left-1/2 -translate-x-1/2 opacity-85 backdrop-blur-sm group group-hover:opacity-15 transition flex justify-center items-center min-h-[60px] p-2 bg-white rounded-md">
        <span className="text-center text-sm font-bold">
          {recipe.title}
        </span>
      </div>
    </div>
  )
}