import { useContext, useEffect, useState } from "react"
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Clipboard, Plus, X } from "lucide-react"
import Description from "./Description"
import Loading from "./Loading"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "@/App"
import { User } from "firebase/auth"
import { useFirestoreDelete, useFirestoreFetch } from "@/util/hooks"
import { createQuery } from "@/util/types/app"
import Placeholder from "@/components/theme/Placeholder"
import Container from "../theme/Container"


// TODO: Keep working on responsive design
const AllRecipes: React.FC = () => {
  const navigate = useNavigate()
  const { user, screenSizes: { md } } = useContext(AppContext)
  const { data: recipes, isFetching: isRecipesFetching } = useFirestoreFetch<RecipeType>(
    createQuery(user as User, "recipes"), 
    formatRecipes, { initialData: [], defaultData: defaultRecipe }
  )
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
    <Container className="flex flex-col md:flex-row">
      <div className="bg-white sticky top-0 left-0 z-10 md:static w-full md:w-fit 2xl:w-[50vw] md:h-[calc(100vh-100px)] lg:h-screen flex flex-col border border-r-slate-300">
        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl 2xl:text-4xl">All Recipes</h1>
            <Link
              to="/recipes/create"
              className="flex justify-center items-center gap-2 size-[35px] xl:w-fit xl:px-3 text-white font-[600] bg-orange-500 hover:bg-orange-700 transition rounded-md"
            >
              <span className="hidden xxl:inline">Add New Recipe</span>
              <Plus size={20}/>
            </Link>
          </div>
          <Select onValueChange={sortRecipes}>
            <SelectTrigger className="h-[35px] w-[175px] rounded-full">
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
        <ScrollArea type="always">
          <div className="w-full flex md:flex-col md:flex-wrap gap-4 px-4 pb-4">
            { 
              isRecipesFetching
              ? <Loading/>
              : sortedRecipes?.map((recipe, index) => 
                  <Recipe 
                    key={index}
                    recipe={recipe}
                    onChange={invalidate}
                    activeRecipe={activeRecipe.title}/>
                )
            }
            {
              recipes.length === 0 &&
              <Placeholder icon={<X size={48}/>} className="2xl:col-span-2 py-[50px]">
                <Placeholder.Message>No Recipes Found!</Placeholder.Message>
                <Placeholder.Tip>Try creating one!</Placeholder.Tip>
                <Placeholder.Action
                  onClick={() => navigate("/recipes/create")}
                  className="text-sm"
                >
                  Create Recipe
                </Placeholder.Action>
              </Placeholder>
            }
          </div>
          <ScrollBar orientation={md ? "vertical" : "horizontal"}/>
        </ScrollArea>
      </div>
      { 
        isFirstRender
        ? <Placeholder 
            icon={<Clipboard size={96}/>}
            className="flex-1 text-slate-500 flex flex-col justify-center items-center gap-3 bg-slate-200 p-4 rounded-none"
          >
            <Placeholder.Message className="font-bold text-xl">Selected Recipes will appear here</Placeholder.Message>
            <Placeholder.Tip>Try selecting one!</Placeholder.Tip>
          </Placeholder>
          
        : <Description activeRecipe={activeRecipe} isDeleting={isWorking} deleteRecipe={deleteRecipe}/>
      }
    </Container>
  )
}

export default AllRecipes