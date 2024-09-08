import { useNavigate } from "react-router-dom" 
import spoonacularLogo from "@/img/logo/spoonacular-logo.svg"
import { Separator } from "@/components/ui/separator"
import SavedRecipes from "./SavedRecipes"
import * as DailyMeals from "./DailyMeals"
import Overview from "./Overview"
import Banner from "./Banner"
import { useContext } from "react"
import { AppContext } from "@/App"
import { Calendar, LayoutGrid, Pencil } from "lucide-react"

export default function Dashboard(): React.ReactElement {
  const navigate = useNavigate()
  const { date, screenSizes: { xl } } = useContext(AppContext)
  
  return (
    <div className="h-[calc(100vh-150px)] grid grid-rows-[150px_1fr_150px] grid-cols-[225px_1fr] xl:grid-rows-[150px_1fr] xl:grid-cols-[300px_1fr_250px] gap-x-6 gap-y-4 p-4">
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
        <button className="text-black bg-white px-5 py-1 rounded-sm font-[600]" onClick={() => navigate("/recipes/search")}>
          Search
        </button>
      </div>
      <Overview/>  
      <DailyMeals.Root className="row-start-2 col-start-2 col-span-2 xl:row-span-1 xl:col-span-1">
        <DailyMeals.Header className="relative">
          <DailyMeals.Date date={date}/>
          <DailyMeals.OptionContainer className="absolute top-0 right-0">
            <DailyMeals.Option to="create" label="Create New">
              <Pencil size={xl ? 20 : 18}/>
            </DailyMeals.Option>
            <DailyMeals.Option to="all" label="All Meals">
              <LayoutGrid size={xl ? 20 : 18}/>
            </DailyMeals.Option>
            <DailyMeals.Option to="calendar" label="Meal Calendar">
              <Calendar size={xl ? 20 : 18}/>
            </DailyMeals.Option>
          </DailyMeals.OptionContainer>
        </DailyMeals.Header>
        <DailyMeals.DailyMeals className="flex-1"/>
      </DailyMeals.Root>
      <SavedRecipes/>
    </div>
  )
}