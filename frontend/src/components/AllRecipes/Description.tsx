import { Ingredient, Instruction, Nutrition, type Recipe } from "@/types/recipe"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ArrowUpRight, Earth, Minus, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { useState } from "react"

type Props = {
  activeRecipe: Recipe
}

export default function Description({ activeRecipe }: Props) {
  const [count, setCount] = useState<number>(1)
  
  return (
    <div className="size-full grid grid-rows-2 grid-cols-2 gap-4 rounded-lg">
      <div className="row-start-1 col-start-1 row-span-1 col-span-1 flex flex-col gap-2">
        <h1 className="text-3xl font-bold line-clamp-2">{activeRecipe.title}</h1>
        <div className="flex gap-2 *:flex-1">
          <button className="flex-1 flex justify-between items-center gap-2 py-1 px-2 w-fit text-white bg-orange-500 hover:bg-orange-700 transition rounded-md">
            <span className="font-[600] text-sm">Add to Meal</span>
            <Plus size={20}/>
          </button>
          <button className="py-1 px-2 w-fit border border-slate-400 hover:bg-slate-200 transition rounded-md">
            <Link to={`/recipes/${activeRecipe.id}`} target="_blank" className="flex justify-between items-center gap-2">
              <span className="font-[600] text-sm">Full Version</span>
              <ArrowUpRight size={20}/>
            </Link>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {activeRecipe.diets.map((diet: string) => <Badge key={nanoid()} className="bg-orange-500 pointer-events-none select-none">{diet}</Badge>)}
        </div>
        <div className="flex-1 flex flex-wrap justify-between gap-2">
          {
            activeRecipe.dishTypes.length > 0 ?
              activeRecipe.dishTypes.map((dish: string) => (
                <div key={nanoid()} className="text-nowrap flex-1 text-center border border-slate-400 rounded-md flex justify-center items-center py-2 px-3 hover:bg-orange-500 hover:text-white transition">
                  {dish}
                </div>
              )) :
            <div className="size-full flex justify-center items-center border-2 border-dashed border-slate-400 rounded-md">
              <h1 className="font-bold text-xl text-slate-400">No diet types found!</h1>
            </div>
          }
          
        </div>
        <div className="flex items-center gap-2 group">
          <Link to={activeRecipe.source?.url as string} target="_blank">
            <Earth className="group-hover:scale-[125%] transition" size={28}/>
          </Link>
          <span className="text-muted-foreground">{activeRecipe.source?.name}</span>
        </div>
      </div>
      <img 
        src={activeRecipe.image}
        alt={activeRecipe.title}
        className="row-start-1 col-start-2 row-span-1 col-span-1 size-full rounded-2xl"
      />
      <Tabs defaultValue="summary" className="flex flex-col items-center row-start-2 col-start-1 row-span-1 col-span-2">
        <TabsList className="w-full flex justify-around bg-transparent">
          <TabsTrigger value="summary" className="data-[state=active]:border-b-[2px] data-[state=active]:border-b-orange-500 rounded-none">Summary</TabsTrigger>
          <TabsTrigger value="nutrition" className="data-[state=active]:border-b-[2px] data-[state=active]:border-b-orange-500 rounded-none">Nutrition</TabsTrigger>
          <TabsTrigger value="ingredients" className="data-[state=active]:border-b-[2px] data-[state=active]:border-b-orange-500 rounded-none">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions" className="data-[state=active]:border-b-[2px] data-[state=active]:border-b-orange-500 rounded-none">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="w-full">
          <ScrollArea className="h-[33vh] rounded-md pr-4" type="always">
            <div>
              <h1 className="font-bold text-xl mb-2">Description</h1>
              <p className="indent-8">{activeRecipe.description}</p>
            </div>
            <ScrollBar/>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="nutrition" className="w-full">
          <ScrollArea className="h-[33vh] rounded-md pr-4" type="always">
            <div>
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">Serving Size: {`${activeRecipe.servingSize.amount}${activeRecipe.servingSize.unit}`}</h1>
                <div className="flex justify-between items-center gap-3">
                  <button onClick={() => count > 1 && setCount(c => c - 1)} className="size-6 bg-orange-500 rounded-sm text-white flex justify-center items-center"><Minus size={14}/></button>
                  <span className="text-xl font-[600]">{count}</span>
                  <button onClick={() => setCount(c => c + 1)} className="size-6 bg-orange-500 rounded-sm text-white flex justify-center items-center"><Plus/></button>
                </div>
              </div>
              <div>
                {
                  activeRecipe.nutrition.map((nutrition: Nutrition) => (
                    <div key={nanoid()} className="flex justify-between items-center py-4 border-b border-b-slate-300 last:border-none">
                      <span>{nutrition.name} <span className="text-sm text-muted-foreground">({nutrition.unit})</span></span>
                      <div className="flex justify-center items-center bg-orange-500 rounded-full min-w-[75px] h-[25px] text-white font-[600] py-2">{Math.round(nutrition.amount) * count}</div>
                    </div>
                  ))
                }
              </div>
            </div>
            <ScrollBar/>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="ingredients" className="w-full">
          <ScrollArea className="h-[33vh] w-full rounded-md" type="always">
            <div className="grid grid-cols-2 gap-2">
              {
                activeRecipe.ingredients.map((ingredient: Ingredient) => (
                  <div key={nanoid()} className="border border-slate-400 px-2 py-1 odd:last:col-span-2 rounded-md">
                    <span className="font-bold text-xl">{ingredient.amount}</span>
                    <span className="text-sm"> {ingredient.unit}</span>  
                    <p className="text-sm text-muted-foreground">{ingredient.name}</p>
                  </div>
                ))
              }
            </div>
            <ScrollBar/>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="instructions" className="w-full">
          <ScrollArea className="h-[33vh] w-full rounded-md" type="always">
            <div className="flex flex-col gap-2">
              {
                activeRecipe.instructions.map((instruction: Instruction) => (
                  <div key={nanoid()} className="p-4 rounded-md bg-orange-100">
                    <h1 className="size-8 font-[600] flex justify-center items-center bg-orange-500 text-white rounded-full mb-2">{instruction.number}</h1>
                    <p>{instruction.step}</p>
                  </div>
                ))
              }
            </div>
            <ScrollBar/>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}