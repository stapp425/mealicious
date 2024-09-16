import { useRef, useContext } from "react"
import { Recipe } from "@/types/recipe"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { 
  Clock, Microwave, 
  Clipboard, Earth, 
  Bookmark, Flag, ExternalLink
} from "lucide-react"
import { nanoid } from "nanoid"
import { AppContext } from "@/App"
import { collection, addDoc } from "firebase/firestore"
import { firestore } from "../../../firebaseConfig"
import { type CollectionReference } from "firebase/firestore"

type Props = {
  recipe: Recipe
  matches: boolean
}

export default function Details({ recipe, matches }: Props): React.ReactElement {
  const { toast } = useToast()
  const { user } = useContext(AppContext)
  const recipesCollectionRef = useRef<CollectionReference>(collection(firestore, "recipes"))

  async function saveRecipe(recipe: Recipe) {
    try {
      await addDoc(recipesCollectionRef.current, { ...recipe, userId: user?.uid })
      toast({
        title: "Success!",
        description: "Recipe added successfully."
      })
    } catch (err: any) {
      toast({
        title: "Error!",
        description: "Failed to add recipe."
      })
      console.error(err.message)
    }
  }
  
  return (
    <>
      {
        matches
          ? <div className="aspect-[9/10] min-w-[630px] min-h-[700px] max-w-[675px] max-h-[750px] rounded-lg">
              <div className="overflow-hidden row-span-1 col-span-1 grid grid-rows-1 grid-cols-2 p-2 gap-5 size-full">
                <div className="grid grid-rows-[40%_repeat(2,_auto)] grid-cols-[100%] row-span-1 gap-3">
                  <div className="overflow-hidden row-span-1 col-span-1 rounded-2xl border-none">
                    <img
                      src={recipe.image}
                      alt="Sample Image"
                      className="size-full hover:scale-[105%] transition"
                    />
                  </div>
                  <div className="col-span-1 flex justify-between items-center gap-2 rounded-md *:flex-1 *:flex *:h-full *:flex-col *:p-2 *:justify-center *:items-center *:bg-orange-500 *:text-white *:rounded-md">
                    <div className="flex gap-1">
                      <Clock/>
                      <div className="text-center">
                        <p>
                          <b>{recipe.times.readyTime}</b> mins
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Microwave/>
                      <div className="text-center">
                        <b>{recipe.times.cookTime || "-"}</b>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Clipboard/>
                      <div className="text-center">
                        <p>
                          {recipe.times.prepTime > 0 ? <><b>{recipe.times.prepTime}</b> mins</> : <b>-</b>}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-hidden bg-orange-100 p-4 flex flex-col rounded-lg">
                    <h1 className="text-3xl font-bold">Nutrition</h1>
                    <p className="text-sm">Serving Size: {`${recipe.servingSize.amount}${recipe.servingSize.unit}`}</p>
                    <ScrollArea className="flex-1 pr-[16px]" type="scroll">
                      {
                        recipe.nutrition.map((nutrition: {[key: string]: any}) => (
                          <div key={nanoid()} className="flex justify-between my-2">
                            <h1 className="text-lg">{nutrition.name} <span className="text-sm text-muted-foreground">({nutrition.unit})</span></h1>
                            <h1 className="bg-orange-600 px-4 w-16 font-medium text-white rounded-full text-center pointer-events-none">
                              {Math.round(nutrition.amount)}
                            </h1>
                          </div>
                        ))
                      }
                      <ScrollBar/>
                    </ScrollArea>
                  </div>
                </div>
                <div className="grid grid-rows-[minmax(0,_auto)_minmax(40%,_1fr)] grid-cols-1 gap-2">
                  <div>
                    <DialogTitle className="font-bold text-[min(3vw,_36px)] leading-[min(4vh,_2.5rem)]">
                      {recipe.title}
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <Link to={recipe.source?.url as string} target="_blank" className="flex justify-center items-center size-8 my-2">
                        <Earth size={32} className="text-muted-foreground hover:scale-110 transition"/>
                      </Link>
                      <p>{recipe.source?.name}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                      {recipe.diets?.map((diet: string) => <Badge key={nanoid()} className="line-clamp-1 pointer-events-none bg-orange-500">{diet}</Badge>)}
                    </div>
                    <div className="group grid grid-cols-2 gap-2 mt-2 *:border *:border-slate-300 *:rounded-sm group-hover:bg-orange-500">
                      {
                        recipe.dishTypes?.map((dish: string) => (
                          <h1 key={nanoid()} className="text-[min(1.5vw,_16px)] hover:cursor-default border border-slate-400 hover:bg-orange-500 hover:text-white transition text-center py-2 px-3 odd:last:col-span-2">
                            {dish}
                          </h1>
                        ))
                      }
                    </div>
                  </div>
                  <div className="grid grid-rows-[minmax(0,_auto)_1fr_minmax(0,_auto)] gap-2">
                    <h1 className="text-2xl font-bold mx-0 my-1">Description</h1>
                    <ScrollArea className="pr-5" type="scroll">
                      <DialogDescription className="text-base text-black">
                        {recipe.description}
                      </DialogDescription>
                      <ScrollBar/>
                    </ScrollArea>
                    <div className="grid grid-cols-3 gap-2 *:bg-orange-500">
                      <Button className="group h-auto flex flex-col items-start px-2 hover:bg-orange-700" onClick={() => saveRecipe(recipe)}>
                        <Bookmark/>
                        <Separator className="w-3/4 my-2 group-hover:w-full transition-all"/>
                        <span>Save</span>
                      </Button>
                      <Button className="group h-auto flex flex-col items-start px-2 hover:bg-orange-700">
                        <ExternalLink/>
                        <Separator className="w-3/4 my-2 group-hover:w-full transition-all"/>
                        <span>Share</span>
                      </Button>
                      <Button className="group h-auto flex flex-col items-start px-2 hover:bg-orange-700">
                        <Flag/>
                        <Separator className="w-3/4 my-2 group-hover:w-full transition-all"/>
                        <span>Report</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-span-1 col-span-1 grid grid-rows-1 grid-cols-2 p-2 gap-4 min-h-auto max-h-full rounded-lg">
                <div className="flex flex-col p-4 border-2 border-slate-200 rounded-md">
                  <h1 className="font-bold text-2xl">Ingredients</h1>
                  <ScrollArea className="flex-1 mt-2" type="scroll">
                    <div className="flex flex-col gap-2">
                      {
                        recipe.ingredients.map((ingredient: {[key: string]: any}) => (
                          <div key={nanoid()} className="bg-slate-200 rounded-md text-center py-2 px-1">
                            <p className="font-bold text-sm text-muted-foreground">
                              {ingredient.amount} {ingredient.unit}
                            </p>
                            <h1 className="text-md font-bold text-wrap">{ingredient.name}</h1>
                          </div>
                        ))
                      }
                    </div>
                    <ScrollBar/>
                  </ScrollArea>
                </div>
                <div className="flex flex-col gap-2 p-4 bg-orange-100 rounded-lg">
                  <h1 className="font-bold text-2xl">Instructions</h1>
                  <ScrollArea className="flex-1" type="scroll">
                    <div className="flex flex-col gap-5">
                      {recipe.instructions.map((instruction: string, index: number) => (
                        <div key={nanoid()} className="flex items-start gap-3">
                          <div className="sticky top-0 flex justify-center items-center size-8 bg-orange-500 p-4 text-white rounded-full">
                            {index + 1}
                          </div>
                          <p>
                            {instruction}
                          </p>
                        </div>
                      ))}
                    </div>
                    <ScrollBar/>
                  </ScrollArea>
                </div>
              </div>
            </div>
          : <div className="aspect-[7/12] w-[350px] h-[600px]">
              <div className="flex flex-col size-full p-2">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full hover:scale-[105%] transition"
                  />
                </div>
                <div className="flex-1 size-full grid grid-rows-[max-content_repeat(2,_fit-content(100px))_15%] grid-cols-[auto_35%] gap-y-2 gap-x-4">
                  <DialogTitle className="row-start-1 col-span-2 flex justify-center items-center font-bold text-xl py-2">
                    {recipe.title}
                  </DialogTitle>
                  <div className="row-start-2 col-start-2 row-span-2 col-span-1 flex flex-col gap-2 justify-between">
                    {
                      recipe.diets && recipe.diets.length > 0 && 
                      <div className="flex flex-col items-stretch gap-[6px]">
                        { recipe.diets.slice(0, 3).map((diet: string) => <Badge key={nanoid()} className="pointer-events-none bg-orange-500">{diet}</Badge>) }
                      </div>
                    }
                    {
                      recipe.dishTypes?.slice(0, recipe.diets && recipe.diets.length > 0 ? 3 : 6).map((dish: string) => (
                        <div key={nanoid()} className="flex-1 flex justify-center items-center text-sm hover:cursor-default border border-slate-300 hover:bg-orange-500 hover:text-white transition py-1 px-3 rounded-sm">
                          {dish}
                        </div>
                      ))
                    }
                  </div>
                  <ScrollArea className="row-span-2 col-start-1 pr-4" type="scroll">
                    <h1 className="font-bold">Description</h1>
                    <DialogDescription className="text-sm text-black">
                      {recipe.description}
                    </DialogDescription>
                    <ScrollBar/>
                  </ScrollArea>
                  <div className="col-span-2 grid grid-cols-3 gap-2 *:bg-orange-500">
                      <Button className="group h-auto flex items-center gap-2 px-2 hover:bg-orange-700" onClick={() => saveRecipe(recipe)}>
                        <Bookmark/>
                        <span>Save</span>
                      </Button>
                      <Button className="group h-auto flex items-center gap-2 px-2 hover:bg-orange-700">
                        <ExternalLink/>
                        <span>Share</span>
                      </Button>
                      <Button className="group h-auto flex items-center gap-2 px-2 hover:bg-orange-700">
                        <Flag/>
                        <span>Report</span>
                      </Button>
                    </div>
                </div>
              </div>
              <div className="size-full grid grid-rows-[10%_repeat(2,_40%)_1fr] grid-cols-2 gap-2 px-2">
                <div className="col-span-2 flex justify-between gap-2 *:flex-1 *:bg-orange-500 *:flex *:flex-col *:justify-center *:items-center *:gap-2 *:py-1 *:text-white *:rounded-md">
                  <div>
                    <Clock/>
                    <div className="text-center text-sm">
                      <p>
                        <b>{recipe.times.readyTime}</b> mins
                      </p>
                    </div>
                  </div>
                  <div>
                    <Microwave/>
                    <div className="text-center text-sm">
                      <p>
                        {recipe.times.cookTime > 0 ? <><b>{recipe.times.cookTime}</b> mins</> : <b>-</b>}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Clipboard/>
                    <div className="text-center text-sm">
                      <p>
                        {recipe.times.prepTime > 0 ? <><b>{recipe.times.prepTime}</b> mins</> : <b>-</b>}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-orange-100 rounded-md">
                  <h1 className="text-lg font-bold p-2 -mb-3">Nutrition</h1>
                  <ScrollArea className="p-2" type="scroll">
                    {
                      recipe.nutrition.map((nutrition: {[key: string]: any}) => (
                        <div key={nanoid()} className="flex justify-between my-2">
                          <div>
                            <h1 className="text-sm -my-2">{nutrition.name}</h1>
                            <span className="text-sm text-muted-foreground">({nutrition.unit})</span>
                          </div>
                          <h1 className="h-full bg-orange-600 w-12 font-sm text-xs text-white rounded-sm text-center pointer-events-none">
                            {Math.round(nutrition.amount)}
                          </h1>
                        </div>
                      ))
                    }
                    <ScrollBar/>
                  </ScrollArea>
                </div>
                <div className="flex flex-col justify-between row-start-3 p-2 border-2 border-slate-200 rounded-md">
                  <h1 className="font-bold text-lg">Ingredients</h1>
                  <ScrollArea className="flex-1 mt-2" type="scroll">
                    <div className="flex flex-col gap-2">
                      {
                        recipe.ingredients.map((ingredient: {[key: string]: any}) => (
                          <div key={nanoid()} className="bg-slate-200 rounded-md text-center py-2 px-1">
                            <p className="font-bold text-xs text-muted-foreground">
                              {ingredient.amount} {ingredient.unit}
                            </p>
                            <h1 className="text-sm font-bold text-wrap">{ingredient.name}</h1>
                          </div>
                        ))
                      }
                    </div>
                    <ScrollBar/>
                  </ScrollArea>
                </div>
                <div className="flex flex-col col-start-2 row-span-2 rounded-md p-2 bg-orange-100">
                  <h1 className="font-bold text-lg">Instructions</h1>
                  <ScrollArea className="flex-1" type="scroll">
                    <div className="flex flex-col gap-2">
                      {
                        recipe.instructions.map((instruction: string, index: number) => (
                          <div key={nanoid()} className="flex flex-col items-center gap-2">
                            <div className="flex justify-center items-center size-4 p-3 bg-orange-500 text-white rounded-full">
                              {index + 1}
                            </div>
                            <p className="text-sm">
                              {instruction}
                            </p>
                          </div>
                        ))
                      }
                    </div>
                    <ScrollBar/>
                  </ScrollArea>
                </div>
                <div className="col-span-2 flex justify-center items-center gap-2">
                  <Link to={recipe.source?.url as string} target="_blank">
                    <Earth size={24} className="text-muted-foreground hover:scale-110 transition"/>
                  </Link>
                  <h1>{recipe.source?.name as string}</h1>
                </div>
              </div>
            </div>
      }
    </>
  )
}