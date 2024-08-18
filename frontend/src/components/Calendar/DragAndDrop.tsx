import { useContext, useEffect, useState } from "react"
import { Label } from "../ui/label"
import Button from "../Theme/Button"
import { AppContext } from "@/App"
import { useWatch } from "react-hook-form"
import { RequiredFieldArray } from "@/types/form"
import { X } from "lucide-react"
import { defaultMeal, isMeal, Meal } from "@/types/meal"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { isRecipe } from "@/types/recipe"
import Error from "./Error"
import { Plan } from "@/types/plan"

const DragAndDrop: React.FC<RequiredFieldArray<Plan>> = ({ control, setValue, setError, clearErrors, error }) => {
  const { meals: fetchedMeals } = useContext(AppContext)
  const [isAllMealsVisible, setIsAllMealsVisible] = useState<boolean>(false)

  const meals = useWatch({
    control,
    name: "meals"
  })
  
  function toggleViewMeals() {
    setIsAllMealsVisible(a => !a)
  }

  function removeMeal(meal: string | Meal) {
    setValue("meals", [...meals.filter(m => (isMeal(m) ? m.id : m) !== (isMeal(meal) ? meal.id : meal))])
  }
  
  function handleOnDrag(event: React.DragEvent<HTMLDivElement>, data: string) {
    event.dataTransfer.setData("application/react-node", data)
  }

  function handleOnDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
  }

  function handleOnDrop(event: React.DragEvent<HTMLDivElement>) {
    const receivedElement = JSON.parse(event.dataTransfer.getData("application/react-node"))
    setValue("meals", [...meals, receivedElement])
  }

  useEffect(() => {
    if(meals.length === 0) {
      setError("meals", {
        type: "missing",
        message: "At least one meal is required before submitting."
      })
    } else {
      clearErrors("meals")
    }
  }, [meals])

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="space-y-1">
          <h2 className="text-lg after:content-['*'] after:text-red-500">
            Meals
          </h2>
        </Label>
        <Button 
          type="button"
          onClick={toggleViewMeals}
          className="text-xs p-2"
        >
          { 
            isAllMealsVisible
              ? "Hide Meals"
              : "View All Meals"
          }
        </Button>
      </div>
      {
        error.meals &&
          <Error>
            {error.meals.message}
          </Error>
      }
      <ScrollArea
        type="always"
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        className="h-[75px] border border-dashed border-slate-500 rounded-md"
      >
        <div className="h-full flex flex-wrap items-start gap-2 p-2">
          {
            meals.map((m, index) => {
              const meal = isMeal(m) ? m : fetchedMeals.find(f => m === f.id) || defaultMeal

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => removeMeal(meal)}
                  className="font-[600] text-xs border border-slate-400 flex justify-between items-center gap-2 px-2 py-1 rounded-sm hover:border-red-500 hover:bg-red-100 active:border-red-500 active:bg-red-200 transition-colors"
                >
                  <h3>{meal.title}</h3>
                  <X size={14}/>
                </button>
              )
            })
          }
        </div>
        <ScrollBar/>
      </ScrollArea>
      {
        isAllMealsVisible &&
          <ScrollArea type="always" className="w-full h-fit">
            <div className="h-[175px] flex gap-3">
              {
                fetchedMeals.map((meal, index) => 
                  <div
                    key={index}
                    onDragStart={event => handleOnDrag(event, JSON.stringify(meal))}
                    className="flex flex-col h-[90%] border border-slate-400 p-3 space-y-1 rounded-sm cursor-grab active:cursor-grabbing"
                    draggable
                  >
                    <h1 className="font-bold text-center">
                      {meal.title}
                    </h1>
                    <ScrollArea type="always" className="flex-1">
                      <div className="space-y-1">
                        {
                          meal.contents.map((content, index) => 
                            <p
                              key={index}
                              className="min-w-[150px] text-xs text-center font-[600] bg-orange-100 p-2 rounded-md"
                            >
                              {isRecipe(content.recipe) && content.recipe.title}
                            </p>
                          )
                        }
                      </div>
                      <ScrollBar/>
                    </ScrollArea>
                  </div>
                )
              }
            </div>
            <ScrollBar orientation="horizontal"/>
          </ScrollArea>
      }
    </div>
  )
}

export default DragAndDrop