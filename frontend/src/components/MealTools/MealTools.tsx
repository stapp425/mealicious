import { createContext, useContext, useEffect, useState } from "react"
import { AppContext } from "@/App"
import { defaultRecipe, Recipe } from "@/types/recipe"
import CreateMeal from "./CreateMeal"
import EditMeal from "./EditMeal"

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
  const { recipes } = useContext(AppContext)
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