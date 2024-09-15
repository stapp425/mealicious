import { createContext, useContext, useEffect, useState } from "react"
import { AppContext } from "@/App"
import { defaultRecipe, formatRecipes, Recipe } from "@/types/recipe"
import CreateMeal from "./CreateMeal"
import EditMeal from "./EditMeal"
import { useFirestoreFetch } from "@/util/hooks"
import { createQuery } from "@/types/app"
import { User } from "firebase/auth"

type Edit = {
  mode: Mode,
  isAddRecipeActive: boolean
  toggleAddRecipe: () => void
  fetchedRecipeData: Recipe[]
}

type Mode = "create" | "edit"

type Props = {
  mode: Mode
}

export const MealEditContext = createContext<Edit>({
  mode: "create",
  isAddRecipeActive: false,
  toggleAddRecipe: () => undefined,
  fetchedRecipeData: [defaultRecipe],
})

const MealTools: React.FC<Props> = ({ mode }) => {
  const { user } = useContext(AppContext)
  const { data: recipes } = useFirestoreFetch<Recipe>(createQuery(user as User, "recipes"), formatRecipes)
  const [isAddRecipeActive, setIsAddRecipeActive] = useState<boolean>(false)  
  
  const context = {
    mode,
    isAddRecipeActive,
    toggleAddRecipe,
    fetchedRecipeData: recipes
  }

  function toggleAddRecipe() {
    setIsAddRecipeActive(a => !a)
  }

  useEffect(() => {
    function handleUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
    }

    window.addEventListener("beforeunload", handleUnload)

    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [])

  return (
    <MealEditContext.Provider value={context}>
      { mode === "create" && <CreateMeal/> }
      { mode === "edit" && <EditMeal/> }
    </MealEditContext.Provider>
  )
}

export default MealTools