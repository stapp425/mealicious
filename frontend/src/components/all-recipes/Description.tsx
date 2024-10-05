import { type Recipe } from "@/util/types/recipe"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ArrowUpRight, Earth, Minus, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { useContext, useState } from "react"
import Delete from "./Delete"
import { AppContext } from "@/App"

type DescriptionProps = {
  isDeleting: boolean
  deleteRecipe: (id: string) => void
  activeRecipe: Recipe
}

const Description: React.FC<DescriptionProps> = ({ isDeleting, activeRecipe, deleteRecipe }) => {
  const { screenSizes: { md } } = useContext(AppContext)
  const [count, setCount] = useState<number>(1)
  
  return (
    <div className="md:h-site-container lg:h-screen flex-1 rounded-lg">
      <div className="md:h-1/2 flex justify-between gap-4 p-4">
        <div className="w-1/2 flex flex-col gap-2">
          <h1 className="text-3xl font-bold line-clamp-1 md:line-clamp-2">{activeRecipe.title}</h1>
          <div className="flex flex-col md:flex-row gap-2 *:flex-1">
            <button className="text-nowrap py-1 px-2 border border-slate-400 hover:bg-slate-200 transition rounded-md">
              <Link to={`/recipes/${activeRecipe.id}`} className="flex justify-between items-center gap-2">
                <span className="font-[600] text-sm">Full Version</span>
                <ArrowUpRight size={20}/>
              </Link>
            </button>
            <Delete
              isDeleting={isDeleting}
              id={activeRecipe.id as string}
              deleteRecipe={deleteRecipe}
            />
          </div>
          {
            activeRecipe.diets &&
            <div className="flex flex-wrap gap-1">
              {activeRecipe.diets.slice(0, md ? activeRecipe.diets.length : 2).map((diet, index) => <Badge key={index} className="bg-orange-500 pointer-events-none max-w-[100px] md:max-w-none select-none line-clamp-1 md:line-clamp-none">{diet}</Badge>)}
            </div>
          }
          <div className="flex-1 flex flex-col justify-between gap-2">
            {
              activeRecipe.dishTypes && activeRecipe.dishTypes.length > 0
              ? activeRecipe.dishTypes.slice(0, md ? 4 : 3).map((dish, index) => (
                  <div key={index} className="text-nowrap line-clamp-1 flex-1 md:only:flex-none md:only:h-[100px] text-center border border-slate-400 rounded-md flex justify-center items-center py-2 px-3 hover:bg-orange-500 hover:text-white transition">
                    {dish}
                  </div>
                ))
              : <div className="size-full flex justify-center items-center border-2 border-dashed border-slate-400 rounded-md">
                  <h1 className="font-bold text-xl text-slate-400">No diet types found!</h1>
                </div>
            }
          </div>
          {
            activeRecipe.source &&
            <div className="flex items-center gap-2 group">
              <Link to={activeRecipe.source.url} target="_blank">
                <Earth className="group-hover:scale-[125%] transition" size={28}/>
              </Link>
              <span className="text-muted-foreground">{activeRecipe.source.name}</span>
            </div>
          }
        </div>
        <img 
          src={activeRecipe.image}
          alt={activeRecipe.title}
          className="h-full w-1/2 object-cover object-center rounded-2xl"
        />
      </div>
      <Tabs defaultValue="summary" className="md:h-1/2 flex flex-col items-center">
        <TabsList className="w-full flex justify-around bg-transparent">
          <TabsTrigger value="summary" className="text-xs md:text-base data-[state=active]:border-b-[2px] data-[state=active]:border-b-orange-500 rounded-none">Summary</TabsTrigger>
          <TabsTrigger value="nutrition" className="text-xs md:text-base data-[state=active]:border-b-[2px] data-[state=active]:border-b-orange-500 rounded-none">Nutrition</TabsTrigger>
          <TabsTrigger value="ingredients" className="text-xs md:text-base data-[state=active]:border-b-[2px] data-[state=active]:border-b-orange-500 rounded-none">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions" className="text-xs md:text-base data-[state=active]:border-b-[2px] data-[state=active]:border-b-orange-500 rounded-none">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="w-full" asChild>
          <ScrollArea type="always" className="flex-1 w-full">
            <div className="px-4 pb-4">
              <h1 className="font-bold text-xl mb-2">Description</h1>
              <p className="indent-8">{activeRecipe.description}</p>
            </div>
            <ScrollBar/>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="nutrition" asChild>
          <ScrollArea type="always" className="flex-1 w-full">
            <div className="px-4">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">Serving Size: {`${activeRecipe.servingSize.amount} ${activeRecipe.servingSize.unit}`}</h1>
                <div className="flex justify-between items-center gap-3">
                  <button onClick={() => count > 1 && setCount(c => c - 1)} className="size-6 bg-orange-500 rounded-sm text-white flex justify-center items-center"><Minus size={14}/></button>
                  <span className="text-xl font-[600]">{count}</span>
                  <button onClick={() => setCount(c => c + 1)} className="size-6 bg-orange-500 rounded-sm text-white flex justify-center items-center"><Plus/></button>
                </div>
              </div>
              <div>
                {
                  activeRecipe.nutrition.map((nutrition, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-b-slate-300 last:border-none">
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
        <TabsContent value="ingredients" className="w-full" asChild>
          <ScrollArea type="always" className="flex-1 w-full">
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
              {
                activeRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="border border-slate-400 px-2 py-1 odd:last:col-span-2 rounded-md">
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
        <TabsContent value="instructions" className="w-full" asChild>
          <ScrollArea type="always" className="flex-1 w-full">
            <div className="px-4 pb-4 space-y-2">
              {
                activeRecipe.instructions.map((instruction, index) => (
                  <div key={index} className="p-4 rounded-md bg-orange-100">
                    <h1 className="size-8 font-[600] flex justify-center items-center bg-orange-500 text-white rounded-full mb-2">{index + 1}</h1>
                    <p>{instruction}</p>
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

export default Description