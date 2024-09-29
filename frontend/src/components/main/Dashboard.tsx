import SavedRecipes from "./SavedRecipes"
import DailyMeals from "./DailyMeals"
import Banner from "./Banner"
import { useContext, useEffect } from "react"
import { AppContext } from "@/App"

const Dashboard: React.FC = () => {  
  const { screenSizes: { md } } = useContext(AppContext)
  
  useEffect(() => {
    document.title = "Dashboard | Mealicious"
  }, [])

  return (
    <div>
      { md && <Banner/> }
      <DailyMeals/>
      <SavedRecipes/>
    </div>
  )
}

export default Dashboard