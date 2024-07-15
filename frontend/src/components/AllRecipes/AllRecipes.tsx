import { createContext, useContext, useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Search from "./Search"
import { defaultRecipe, type RecipeSort, type Recipe as RecipeType } from "@/types/recipe"
import Recipe from "./Recipe"
import { useFirestoreFetch, useFirestoreTest } from "@/util/hooks"
import { nanoid } from "nanoid"
import { collection, query, where } from "firebase/firestore"
import { firestore } from "../../../../firebaseConfig"
import { CurrentUser } from "@/types/other"
import { UserContext } from "@/App"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Clipboard, Plus } from "lucide-react"
import Description from "./Description"
import Loading from "./Loading"

export const ActiveRecipeContext = createContext<string>(defaultRecipe[0].title)

export default function AllRecipes(): React.ReactElement {
  const currentUser = useContext<CurrentUser>(UserContext)
  const [activeRecipe, setActiveRecipe] = useState<RecipeType>(defaultRecipe[0])
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  const { isFetching, data, setData } = useFirestoreTest()
  // const q = useMemo(() => query(collection(firestore, "recipes"), where("userId", "==", currentUser?.uid)), [])
  // const { isFetching, data, setData } = useFirestoreFetch<RecipeType>(q, defaultRecipe)
  
  function invalidateInitialState(recipe: RecipeType) {
    setIsFirstRender(false)
    setActiveRecipe(recipe)
  }

  function sortRecipes(sort: RecipeSort) {
    switch(sort) {
      case "title":
        setData((d: RecipeType[]) => [...d].sort((a: RecipeType, b: RecipeType) => a.title.localeCompare(b.title)))
        break
      case "calories":
        setData((d: RecipeType[]) => [...d].sort((a: RecipeType, b: RecipeType) => a.nutrition[0].amount - b.nutrition[0].amount))
        break
      case "time":
        setData((d: RecipeType[]) => [...d].sort((a: RecipeType, b: RecipeType) => a.times.readyTime - b.times.readyTime))
        break
    }
  }

  return (
    <ActiveRecipeContext.Provider value={activeRecipe.title}>
      <div className="relative flex-1 grid grid-cols-[33vw_1fr] xl:grid-cols-[1fr_33vw]">
        <div className="h-full p-4 flex flex-col gap-4 border border-r-slate-300">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl xl:text-4xl">All Recipes</h1>
            <button className="flex justify-center items-center gap-2 aspect-square xl:aspect-auto h-full max-h-[50px] xl:w-[175px] xl:px-3 text-white font-[600] bg-orange-500 hover:bg-orange-700 transition rounded-md">
              <span className="hidden xl:inline">Add New Recipe</span>
              <Plus size={20}/>
            </button>
          </div>
          <div className="flex justify-between gap-4 w-full">
            <Search/>
            <Select onValueChange={sortRecipes}>
              <SelectTrigger className="h-[35px] xl:h-[50px] w-[175px] rounded-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="calories">Calories</SelectItem>
                <SelectItem value="time">Prep Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-auto w-full grid 2xl:grid-cols-2 gap-6">
            { isFetching ? <Loading/> : data?.map((recipe: RecipeType) => <Recipe key={nanoid()} recipe={recipe} onChange={invalidateInitialState}/>) }
          </div>
        </div>
        <div className="flex items-center col-start-2 size-full p-4 place-self-start">
          <div className="h-[80vh] size-full grid grid-rows-2 grid-cols-2 gap-4 rounded-lg bg-white">
            { 
              isFirstRender
                ? <div className="text-slate-500 row-span-2 col-span-2 flex flex-col justify-center items-center gap-3 bg-slate-200 rounded-lg">
                    <Clipboard size={96}/>
                    <div className="text-center">
                      <h1 className="font-bold text-xl">Selected Recipes will appear here</h1>
                      <p>Start clicking!</p>
                    </div>
                  </div>
                : <Description activeRecipe={activeRecipe}/>
            }
          </div>
        </div>
      </div>
    </ActiveRecipeContext.Provider>
  )
}