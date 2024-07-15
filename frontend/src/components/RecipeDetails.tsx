import { defaultRecipe, Recipe } from "@/types/recipe"
import { useFirestoreGet } from "@/util/hooks"
import { useParams } from "react-router-dom"
import { sampleFullRecipe } from "@/test"

export default function RecipeDetails() {
  // const { recipeId } = useParams()
  // const { isFetching, data } = useFirestoreGet<Recipe>("recipes", recipeId as string)
  
  return (
    <div className="h-[400vh] bg-red-700">
      Hi!
    </div>
  )
}

function useRecipeFetch() {

}