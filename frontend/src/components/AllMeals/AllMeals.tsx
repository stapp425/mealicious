import { AppContext } from "@/App"
import { useContext } from "react"
import { useFirestoreDelete } from "@/util/hooks"
import { modifyData } from "@/types/app"
import { areAllRecipesStrings, type Meal as MealEntry } from "@/types/meal"
import { useToast } from "@/components/ui/use-toast"
import Meal from "./Meal"
import Spinner from "@/components/ui/Spinner"

const AllMeals: React.FC = () => {
  const { meals, setMeals, screenSizes: { xl } } = useContext(AppContext)
  const { toast } = useToast()
  const { deleteFirestoreDoc } = useFirestoreDelete()
  
  function evenlySplitArray<T = MealEntry>(arr: T[], sections: number): T[][] {
    if(sections <= 0 || sections % 1)
      throw new Error("The number of sections must be a positive integer.")
    
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
      await deleteFirestoreDoc({ name: "meals", id: targetMeal.id as string })
      setMeals(modifyData<MealEntry>(meals, "remove", targetMeal))
    } catch (err: any) {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="bg-orange-200 min-h-[calc(100vh-150px)]">
      <div className="relative mx-auto size-fit min-h-[calc(100vh-150px)] min-w-[700px] bg-white p-6 shadow-md">
        <h1 className="font-bold text-5xl mb-8">All Meals</h1>
        <div className="flex justify-center items-start gap-8">
          {
            !areAllRecipesStrings(meals)
              ? evenlySplitArray(meals, xl ? 2 : 1).map((meals, index) => 
                  <div key={index} className="flex flex-col gap-8">
                    {
                      meals.map((meal, index) => 
                        <Meal 
                          key={index}
                          meal={meal}
                          removeMeal={removeMeal}
                        />
                      )
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