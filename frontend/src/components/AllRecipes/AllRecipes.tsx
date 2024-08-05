import { createContext, useContext, useEffect, useState } from "react"
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
import { collection, Query, query, where } from "firebase/firestore"
import { firestore } from "../../../../firebaseConfig"
import { AppContext } from "@/App"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Clipboard, Plus } from "lucide-react"
import Description from "./Description"
import Loading from "./Loading"
import { Link } from "react-router-dom"

export const ActiveRecipeContext = createContext<string>(defaultRecipe.title)

export default function AllRecipes(): React.ReactElement {
  const { user } = useContext(AppContext)
  const [activeRecipe, setActiveRecipe] = useState<RecipeType>(defaultRecipe)
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  // const { isFetching, data, setData } = useFirestoreTest()
  const [q, setQ] = useState<Query>()
  const { isFetching, data, setData } = useFirestoreFetch<RecipeType>([defaultRecipe], q)
  
  function invalidateInitialState(recipe: RecipeType) {
    setIsFirstRender(false)
    setActiveRecipe(recipe)
  }

  function sortRecipes(sort: RecipeSort) {
    switch(sort) {
      case "favorite":
        setData((d: RecipeType[]) => [...d.filter((recipe: RecipeType) => recipe.isFavorite), ...d.filter((recipe: RecipeType) => !recipe.isFavorite)])
        break
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

  useEffect(() => {
    if(user) {
      setQ(query(collection(firestore, "recipes"), where("userId", "==", user.uid)))
    }
  }, [user])

  return (
    <ActiveRecipeContext.Provider value={activeRecipe.title}>
      <div className="relative h-[calc(100vh-150px)] grid grid-cols-[33vw_1fr] xl:grid-cols-[1fr_33vw]">
        <div className="overflow-hidden h-[calc(100vh-150px)] flex flex-col border border-r-slate-300">
          <div className="z-20 flex flex-col gap-3 p-4 shadow-scroll-t">
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl xl:text-4xl">All Recipes</h1>
              <Link
                to="/recipes/create"
                className="flex justify-center items-center gap-2 aspect-square xl:aspect-auto h-full max-h-[50px] xl:w-[175px] xl:px-3 text-white font-[600] bg-orange-500 hover:bg-orange-700 transition rounded-md"
              >
                <span className="hidden xl:inline">Add New Recipe</span>
                <Plus size={20}/>
              </Link>
            </div>
            <div className="flex justify-between gap-4 w-full">
              {/* <Search/> */}
              <Select onValueChange={sortRecipes}>
                <SelectTrigger className="h-[35px] xl:h-[50px] w-[175px] rounded-full">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="favorite">Favorite</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="calories">Calories</SelectItem>
                  <SelectItem value="time">Prep Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ScrollArea className="h-full px-4" type="scroll">
            <div className="w-full grid 2xl:grid-cols-2 gap-6 py-4">
              { 
                isFetching
                  ? <Loading/>
                  : data?.map((recipe: RecipeType) => <Recipe key={nanoid()} recipe={recipe} onChange={invalidateInitialState}/>)
              }
            </div>
            <ScrollBar/>
          </ScrollArea>
        </div>
        <div className="h-[calc(100vh-150px)] flex justify-center items-center p-4">
          { 
            isFirstRender
              ? <div className="size-full text-slate-500 flex flex-col justify-center items-center gap-3 bg-slate-200 rounded-lg">
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
    </ActiveRecipeContext.Provider>
  )
}