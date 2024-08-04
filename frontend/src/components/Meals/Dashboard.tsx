import { useNavigate } from "react-router-dom" 
import spoonacularLogo from "@/img/logo/spoonacular-logo.svg"
import { Separator } from "@/components/ui/separator"
import SavedRecipes from "./SavedRecipes"
import { defaultRecipe, type Recipe } from "@/types/recipe"
import DailyMeals from "./DailyMeals"
import Overview from "./Overview"
import Banner from "./Banner"

export default function Dashboard(): React.ReactElement {
  const navigate = useNavigate()
  
  return (
    <div className="flex-1 grid grid-rows-[150px_1fr_150px] grid-cols-[225px_1fr] xl:grid-rows-[150px_1fr] xl:grid-cols-[300px_1fr_250px] gap-x-6 gap-y-4 p-4">
      <Banner/>
      <div className="row-start-3 xl:row-start-1 xl:col-start-3 flex flex-col justify-between items-stretch gap-2 bg-orange-500 p-3 rounded-md">
        <div className="flex flex-col-reverse xl:flex-row justify-between items-center gap-1">
          <h1 className="text-md xl:text-2xl text-center xl:text-left font-[600] text-white">
            Search with Spoonacular
          </h1>
          <img
            src={spoonacularLogo}
            alt="Spoonacular Logo"
            className="w-12 xl:w-18" 
          />
        </div>
        <Separator/>
        <button className="text-black bg-white px-5 py-1 rounded-sm font-[600]" onClick={() => navigate("/meals/search")}>
          Search
        </button>
      </div>
      <Overview/>  
      <DailyMeals/>
      <SavedRecipes/>
    </div>
  )
}