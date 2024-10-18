import { AppContext } from "@/App"
import { createContext, useContext, useEffect } from "react"
import { type User } from "@firebase/auth"
import { useFirestoreDelete, useFirestoreFetch } from "@/util/hooks"
import { createQuery, ReactState } from "@/util/types/app"
import { defaultMeal, formatMeals, type Meal as MealEntry } from "@/util/types/meal"
import { X } from "lucide-react"
import { Link } from "react-router-dom"
import Meal from "./Meal"
import Spinner from "@/components/theme/Spinner"
import Button from "../theme/Button"
import Placeholder from "../theme/Placeholder"
import Container from "../theme/Container"

export const AllMealsContext = createContext<{state: ReactState<MealEntry[]>, removeMeal: (meal: MealEntry) => void}>({state: [[defaultMeal], () => {}], removeMeal: () => {}})

const AllMeals: React.FC = () => {
  const { user, screenSizes: { xxl } } = useContext(AppContext)
  const { deleteFirestoreDoc } = useFirestoreDelete()
  const { data: fetchedMeals, setData: setMeals, isFetching } = useFirestoreFetch<MealEntry>(
    createQuery(user as User, "meals"), 
    formatMeals, { initialData: [], defaultData: defaultMeal }
  )
  
  function evenlySplitArray<T = MealEntry>(arr: T[], sections: number): T[][] {
    if(sections <= 0 || sections % 1)
      throw new Error("The number of sections must be a positive integer.")
    
    if(sections > arr.length)
      return [arr]
    
    const arrLen = arr.length
    const arrTemplate: T[][] = []
    const interval = Math.round(arrLen / sections)
    let start = 0

    for(let i = 0; i < sections; i++) {
      const end = start + interval
      arrTemplate.push(arr.slice(start, end))
      start = end
    }
    
    return arrTemplate
  }

  async function removeMeal(targetMeal: MealEntry) {
    try {
      await deleteFirestoreDoc("meals", targetMeal.id as string)
      setMeals(meals => meals.filter(m => m.id !== targetMeal.id))
    } catch (err: any) {
      alert(err.message)
    }
  }  

  useEffect(() => {
    document.title = "All Meals | Mealicious"
  }, [])

  return (
    <AllMealsContext.Provider value={{state: [fetchedMeals, setMeals], removeMeal}}>
      <Container className="bg-orange-200">
        <div className="relative mx-auto size-fit min-h-site-container lg:min-h-screen lg:min-w-[700px] w-full lg:w-fit bg-white p-6 shadow-md">
          <h1 className="font-bold text-2xl md:text-5xl mb-8">All Meals</h1>
          <div className="flex justify-center items-start gap-4">
            {
              !isFetching
              ? evenlySplitArray(fetchedMeals, xxl ? 2 : 1).map((meals, index) => 
                  <div key={index} className="w-full flex flex-col gap-8">
                    {
                      meals.length > 0
                      ? meals.map((meal, index) => 
                        <Meal key={index} meal={meal}/>
                      )
                      : <Placeholder icon={<X size={64}/>}>
                          <Placeholder.Message>No Meals Found!</Placeholder.Message>
                          <Placeholder.Tip>Try creating a new one!</Placeholder.Tip>
                          <Button className="text-sm">
                            <Link to="/meals/create">
                              Create Meal
                            </Link>
                          </Button>
                        </Placeholder>
                    }
                  </div>
                )
              : <div className="flex-1 flex flex-col justify-center items-center gap-6">
                  <Spinner size={75}/>
                  <h1 className="font-[600] text-3xl">Loading...</h1>
                </div>
            }
          </div>
        </div>
      </Container>
    </AllMealsContext.Provider>
  )
}

export default AllMeals