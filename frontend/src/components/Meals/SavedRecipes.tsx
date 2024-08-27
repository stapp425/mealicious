<<<<<<< HEAD
import { Link } from "react-router-dom"
import { SquareArrowUpRight } from "lucide-react"
=======
import { useContext } from "react"
import { AppContext } from "@/App"
import { type Recipe as RecipeType } from "@/types/recipe"
import { Link } from "react-router-dom"
import { SquareArrowUpRight } from "lucide-react"
import { nanoid } from "nanoid"
import { Skeleton } from "@/components/ui/skeleton"
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
import { Separator } from "@/components/ui/separator"
import Recipe from "./Recipe"
import { useFirestoreFetch } from "@/util/hooks"
import { defaultRecipe, type Recipe as RecipeType } from "@/types/recipe"
import { createQuery } from "@/types/app"
import { useContext } from "react"
import { AppContext } from "@/App"
import { type User } from "firebase/auth"

export default function SavedRecipes(): React.ReactElement {
<<<<<<< HEAD
  const { user } = useContext(AppContext)
  const { data: recipes } = useFirestoreFetch<RecipeType>([defaultRecipe], createQuery(user as User, "recipes", { limit: 2 }))
=======
  const { recipes, isRecipesFetching: isFetching } = useContext(AppContext)
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
  
  return (
    <div className="row-start-3 col-span-2 xl:row-start-2 xl:col-start-3 xl:col-span-1 overflow-hidden flex flex-row xl:flex-col justify-between gap-6">
      <div className="flex flex-col gap-2 h-full xl:h-36 w-44 xl:w-full">
        <h1 className="text-2xl font-bold xl:text-center">Saved Recipes</h1>
        <button className="flex-1">
          <Link to="/recipes" className="h-full group text-white py-3 w-full flex flex-col justify-center items-center bg-orange-500 gap-2 rounded-md hover:bg-orange-700">
            <SquareArrowUpRight/>
            <Separator className="w-[75%] group-hover:w-[90%] transition-all"/>
            <span className="font-[550]">See All Recipes</span>
          </Link>
        </button>
      </div>
<<<<<<< HEAD
      <div className="flex-1 flex flex-row xl:flex-col gap-6">
        { recipes.slice(0, 2).map((recipe, index) => <Recipe key={index} recipe={recipe}/>) }
      </div>
=======
      {
        !isFetching
          ? 
          <>
            {recipes.map((recipe: RecipeType) => <Recipe key={nanoid()} recipe={recipe}/>)}
          </>
          :
          <>
            <Skeleton className="h-full w-56 xl:h-48 xl:w-full rounded-lg bg-slate-300"/>
            <Skeleton className="h-full w-56 xl:h-48 xl:w-full rounded-lg bg-slate-300"/>
          </>
      }
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
    </div>
  )
}
