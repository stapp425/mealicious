import SavedRecipes from "./SavedRecipes"
import DailyMeals from "./DailyMeals"
import Banner from "./Banner"
import { useContext, useEffect } from "react"
import { AppContext } from "@/App"
import Container from "../theme/Container"


// TODO: Work on revamping recipe paths
const Dashboard: React.FC = () => {  
  const { screenSizes: { lg } } = useContext(AppContext)
  
  useEffect(() => {
    document.title = "Dashboard | Mealicious"
  }, [])

  return (
    <Container>
      { lg && <Banner/> }
      <DailyMeals/>
      <SavedRecipes/>
    </Container>
  )
}

export default Dashboard