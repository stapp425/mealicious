import { AppContext } from "@/App"
import { useContext, useEffect } from "react"
import { useFirestoreDelete, useFirestoreFetch } from "@/util/hooks"
import { createQuery } from "@/types/app"
import { formatMeals, type Meal as MealEntry } from "@/types/meal"
import { useToast } from "@/components/ui/use-toast"
import Meal from "./Meal"
import Spinner from "@/components/ui/Spinner"
import { User } from "@firebase/auth"
import { X } from "lucide-react"
import Button from "../Theme/Button"
import { Link } from "react-router-dom"
import * as Placeholder from "../Theme/Placeholder"

const AllMeals: React.FC = () => {
  const { user, screenSizes: { xl } } = useContext(AppContext)
  const { toast } = useToast()
  const { deleteFirestoreDoc } = useFirestoreDelete()
  const { data: fetchedMeals, setData: setMeals, isFetching } = useFirestoreFetch<MealEntry>(createQuery(user as User, "meals"), formatMeals)
  
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
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    document.title = "All Meals | Mealicious"
  }, [])

  return (
    <div className="bg-orange-200 min-h-[calc(100vh-150px)]">
      <div className="relative mx-auto size-fit min-h-[calc(100vh-150px)] min-w-[700px] bg-white p-6 shadow-md">
        <h1 className="font-bold text-5xl mb-8">All Meals</h1>
        <div className="flex justify-center items-start gap-8">
          {
            !isFetching
              ? evenlySplitArray(fetchedMeals, xl ? 2 : 1).map((meals, index) => 
                  <div key={index} className="w-full flex flex-col gap-8">
                    {
                      meals.length > 0
                        ? meals.map((meal, index) => 
                          <Meal 
                            key={index}
                            meal={meal}
                            removeMeal={removeMeal}
                          />
                        )
                        : <Placeholder.Root icon={<X size={64}/>}>
                            <Placeholder.Message>No Meals Found!</Placeholder.Message>
                            <Placeholder.Tip>Try creating a new one!</Placeholder.Tip>
                            <Button className="text-sm">
                              <Link to="/meals/create">
                                Create Meal
                              </Link>
                            </Button>
                          </Placeholder.Root>
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
    </div>
  )
}

export default AllMeals