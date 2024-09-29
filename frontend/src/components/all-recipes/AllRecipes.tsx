import { createContext, useContext, useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import Search from "./Search"
import { defaultRecipe, formatRecipes, type RecipeSort, type Recipe as RecipeType } from "@/util/types/recipe"
import Recipe from "./Recipe"
import { nanoid } from "nanoid"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Clipboard, Plus, X } from "lucide-react"
import Description from "./Description"
import Loading from "./Loading"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "@/App"
import { User } from "firebase/auth"
import { useFirestoreDelete, useFirestoreFetch } from "@/util/hooks"
import { createQuery } from "@/util/types/app"
import * as Placeholder from "@/components/theme/Placeholder"

export const ActiveRecipeContext = createContext<string>(defaultRecipe.title)

const AllRecipes: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const { data: recipes, isFetching: isRecipesFetching } = useFirestoreFetch<RecipeType>(createQuery(user as User, "recipes"), formatRecipes)
  const { isWorking, deleteFirestoreDoc } = useFirestoreDelete()
  const [activeRecipe, setActiveRecipe] = useState<RecipeType>(defaultRecipe)
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  const [sortedRecipes, setSortedRecipes] = useState<RecipeType[]>(recipes)
  
  function invalidate(recipe: RecipeType) {
    setIsFirstRender(false)
    setActiveRecipe(recipe)
  }

  function sortRecipes(sort: RecipeSort) {
    switch(sort) {
      case "favorite":
        setSortedRecipes((d: RecipeType[]) => [...d.filter((recipe: RecipeType) => recipe.isFavorite), ...d.filter((recipe: RecipeType) => !recipe.isFavorite)])
        break
      case "title":
        setSortedRecipes((d: RecipeType[]) => [...d].sort((a: RecipeType, b: RecipeType) => a.title.localeCompare(b.title)))
        break
      case "calories":
        setSortedRecipes((d: RecipeType[]) => [...d].sort((a: RecipeType, b: RecipeType) => a.nutrition[0].amount - b.nutrition[0].amount))
        break
      case "time":
        setSortedRecipes((d: RecipeType[]) => [...d].sort((a: RecipeType, b: RecipeType) => a.times.readyTime - b.times.readyTime))
        break
    }
  }

  async function deleteRecipe(id: string) {
    try {
      await deleteFirestoreDoc("recipes", id)
      setSortedRecipes(sorted => sorted.filter(s => s.id !== id))
    } catch (err: any) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    document.title = "All Recipes | Mealicious"
  }, [])

  useEffect(() => {
    if(recipes.length > 0)
      setSortedRecipes(recipes)
  }, [recipes])

  return (
    <ActiveRecipeContext.Provider value={activeRecipe.title}>
      <div className="relative h-[calc(100vh-100px)] md:h-screen grid grid-cols-[33vw_1fr] xl:grid-cols-[1fr_33vw]">
        <div className="overflow-hidden h-[calc(100vh-100px)] md:h-screen flex flex-col border border-r-slate-300">
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
                isRecipesFetching
                  ? <Loading/>
                  : sortedRecipes?.map((recipe: RecipeType) => <Recipe key={nanoid()} recipe={recipe} onChange={invalidate}/>)
              }
              {
                recipes.length === 0 &&
                <Placeholder.Root icon={<X size={48}/>} className="2xl:col-span-2 py-[50px]">
                  <Placeholder.Message>No Recipes Found!</Placeholder.Message>
                  <Placeholder.Tip>Try creating one!</Placeholder.Tip>
                  <Placeholder.Action
                    onClick={() => navigate("/recipes/create")}
                    className="text-sm"
                  >
                    Create Recipe
                  </Placeholder.Action>
                </Placeholder.Root>
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
                    <p>Try selecting one!</p>
                  </div>
                </div>
              : <Description activeRecipe={activeRecipe} isDeleting={isWorking} deleteRecipe={deleteRecipe}/>
          }
        </div>
      </div>
    </ActiveRecipeContext.Provider>
  )
}

export default AllRecipes