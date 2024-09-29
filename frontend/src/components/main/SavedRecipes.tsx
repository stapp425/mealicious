

import { Link } from "react-router-dom"
import { Eye, Heart, SquareArrowUpRight, X } from "lucide-react"
import { useFirestoreFetch } from "@/util/hooks"
import { formatRecipes, type Recipe as RecipeType } from "@/util/types/recipe"
import { createQuery } from "@/util/types/app"
import { useContext } from "react"
import { AppContext } from "@/App"
import { type User } from "firebase/auth"
import * as Placeholder from "@/components/theme/Placeholder"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const SavedRecipes: React.FC = () => {
  const { user } = useContext(AppContext)
  const { data: recipes } = useFirestoreFetch<RecipeType>(createQuery(user as User, "recipes"), formatRecipes)
  
  console.log("recipes:", recipes)

  return (
    <div className="pb-6 flex flex-col gap-4">
      <div className="px-6 flex justify-between items-center">
        <h1 className="text-2xl lg:text-3xl font-bold">Saved Recipes</h1>
        <Link to="/recipes" className="h-full text-white text-center px-3 py-1 bg-orange-500 flex flex-col md:flex-row justify-center items-center gap-x-6 rounded-md hover:bg-orange-700 transition-colors">
          <span className="font-[550]">View All Recipes</span>
          <Eye className="inline"/>
        </Link>
      </div>
      <ScrollArea className="h-[215px]" type="always">
        <div className="px-6 flex gap-8">
          { 
            recipes.length > 0 
            ? recipes.map((recipe, index) => <Recipe key={index} recipe={recipe}/>) 
            : <Placeholder.Root icon={<X size={48}/>} className="w-full border-none">
                <Placeholder.Message>No Recipes Found!</Placeholder.Message>
                <Placeholder.Tip>Try creating some!</Placeholder.Tip>
              </Placeholder.Root>
          }
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
      
    </div>
  )
}

const Recipe: React.FC<{ recipe: RecipeType }> = ({ recipe }) => (
  <div className="overflow-hidden relative w-[300px] h-[200px] border border-slate-400 shadow-md rounded-lg">
    <img 
      src={recipe.image}
      alt={recipe.title}
      className="h-3/4 w-full object-cover"
    />
    <div className="px-3 z-10 w-full h-[50px] bg-white p-1 flex justify-between items-center">
      <h1 className="font-[600] line-clamp-1 text-[100%] w-[90%] only:w-full">{recipe.title}</h1>
      {recipe.isFavorite && <Heart size={18} className="text-rose-500"/>}
    </div>
    <Link to={`/recipes/${recipe.id}`} className="absolute top-3 right-3 bg-white p-1 rounded-sm">
      <SquareArrowUpRight />
    </Link>
  </div>
)

export default SavedRecipes