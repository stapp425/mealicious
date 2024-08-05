import { createContext, useContext, useEffect, useState } from "react"
import { AppContext } from "@/App"
import { defaultRecipe, Recipe } from "@/types/recipe"
import { useFirestoreFetch } from "@/util/hooks"
import { collection, query, Query, where } from "firebase/firestore"

import { firestore } from "../../../../firebaseConfig"
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

const MealContainer: React.FC<Props> = ({ mode }) => {
  const { user } = useContext(AppContext)
  const [q, setQ] = useState<Query>()
  const { data } = useFirestoreFetch<Recipe>([defaultRecipe], q)
  const [isAddRecipeActive, setIsAddRecipeActive] = useState<boolean>(false)  
  
  const context = {
    mode,
    isAddRecipeActive,
    toggleAddRecipe,
    fetchedRecipeData: data
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
  
  useEffect(() => {
    if(user)
      setQ(query(collection(firestore, "recipes"), where("userId", "==", user.uid)))
  }, [user])

  return (
    <MealEditContext.Provider value={context}>
      { mode === "create" && <CreateMeal/> }
      { mode === "edit" && <EditMeal/> }
    </MealEditContext.Provider>
  )
}

export default MealContainer