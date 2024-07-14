import { useContext, useState } from "react"
import { defaultRecipe, type Recipe as RecipeType } from "@/types/recipe"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { nanoid } from "nanoid"
import Recipe from "./Recipe"
import { SquareArrowUpRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { collection } from "@firebase/firestore"
import { useFirestoreFetch } from "@/util/hooks"
import { firestore } from "../../../../firebaseConfig"
import { limit, query, where } from "firebase/firestore"
import { CurrentUser } from "@/types/other"
import { UserContext } from "@/App"

export default function SavedRecipes(): React.ReactElement {
  const currentUser = useContext<CurrentUser>(UserContext)
  const { isFetching, data } = useFirestoreFetch()
  
  // useFirestoreFetch(query(collection(firestore, "recipes"), where("userId", "==", currentUser?.uid), limit(2)), defaultRecipe)

  return (
    <div className="row-start-3 col-span-2 xl:row-start-2 xl:col-start-3 xl:col-span-1 overflow-hidden flex xl:flex-col justify-between gap-6">
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
      {
        !isFetching
          ? 
          <>
            {data?.map((recipe: RecipeType) => <Recipe key={nanoid()} recipe={recipe}/>)}
          </>
          :
          <>
            <Skeleton className="h-full w-56 xl:h-48 xl:w-full rounded-lg bg-slate-300"/>
            <Skeleton className="h-full w-56 xl:h-48 xl:w-full rounded-lg bg-slate-300"/>
          </>
      }
    </div>
  )
}