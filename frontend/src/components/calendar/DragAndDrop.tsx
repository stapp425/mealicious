import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import Button from "../theme/Button"
import { useWatch } from "react-hook-form"
import { type ReactHookFormTypes } from "@/util/types/form"
import { X } from "lucide-react"
import { type Meal } from "@/util/types/meal"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Error from "@/components/theme/Error"
import { Plan } from "@/util/types/plan"
import Placeholder from "../theme/Placeholder"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

type DragAndDropProps = {
  meals: Meal[]
} & Pick<ReactHookFormTypes<Plan>, "control" | "setValue" | "setError" | "clearErrors" | "error">

const DragAndDrop: React.FC<DragAndDropProps> = ({ meals, control, setValue, setError, clearErrors, error }) => {
  const [isAllMealsVisible, setIsAllMealsVisible] = useState<boolean>(false)

  const mealsInput = useWatch({
    control,
    name: "meals"
  })

  function addMeal(meal: Meal) {
    setValue("meals", [...mealsInput, meal])
  }
  
  function toggleViewMeals() {
    setIsAllMealsVisible(a => !a)
  }

  function removeMeal(meal: Meal) {
    setValue("meals", [...mealsInput.filter(m => meal.id !== m.id)])
  }
  
  function handleOnDrag(event: React.DragEvent<HTMLDivElement>, data: string) {
    event.dataTransfer.setData("application/react-node", data)
  }

  function handleOnDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
  }

  function handleOnDrop(event: React.DragEvent<HTMLDivElement>) {
    const receivedElement = JSON.parse(event.dataTransfer.getData("application/react-node"))
    setValue("meals", [...mealsInput, receivedElement])
  }

  useEffect(() => {
    if(mealsInput.length === 0) {
      setError("meals", {
        type: "missing",
        message: "At least one meal is required."
      })
    } else {
      clearErrors("meals")
    }
  }, [mealsInput])

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
        className="h-[75px] border border-slate-300 rounded-md"
      >
        <div className="h-full flex flex-wrap items-start gap-2 p-2">
          {
            mealsInput.map((meal, index) => (
              <button
                key={index}
                type="button"
                onClick={() => removeMeal(meal)}
                className="font-[600] text-xs border border-slate-400 flex justify-between items-center gap-2 px-2 py-1 rounded-sm hover:border-red-500 hover:bg-red-100 active:border-red-500 active:bg-red-200 transition-colors"
              >
                <h3>{meal.title}</h3>
                <X size={14}/>
              </button>
            ))
          }
        </div>
        <ScrollBar/>
      </ScrollArea>
      {
        isAllMealsVisible &&
        <ScrollArea type="always" className="w-full h-fit">
          <div className="h-[175px] flex gap-3">
            {
              meals.length > 0 && meals[0].title
              ? meals.map((meal, index) => 
                  <DraggableMeal
                    key={index}
                    onDragStart={handleOnDrag}
                    addMeal={addMeal}
                    meal={meal}
                    className="flex flex-col h-[90%] border border-slate-400 p-3 space-y-1 rounded-sm"
                  />
                )
              : <Placeholder
                  icon={<X size={64}/>}
                  className="w-full"
                >
                  <Placeholder.Message className="text-lg">No Meals Found!</Placeholder.Message>
                  <Placeholder.Tip className="text-xs">Try creating a new one!</Placeholder.Tip>
                  <Button className="text-xs">
                    <Link to="/meals/create">
                      Create Meal
                    </Link>
                  </Button>
                </Placeholder>
            }
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      }
    </div>
  )
}

type DraggableMealProps = {
  className?: string
  meal: Meal
  onDragStart: (event: React.DragEvent<HTMLDivElement>, data: string) => void
  addMeal: (meal: Meal) => void
}

const DraggableMeal: React.FC<DraggableMealProps> = ({ className, meal, onDragStart, addMeal }) => (  
  <div
    onDragStart={event => onDragStart(event, JSON.stringify(meal))}
    onClick={() => addMeal(meal)}
    className={cn("cursor-grab active:cursor-grabbing", className)}
    draggable
  >
    <h1 className="font-bold text-center">
      {meal.title}
    </h1>
    <ScrollArea type="always" className="flex-1">
      <div className="space-y-1">
        {
          meal.contents.map((content, index) => 
            <p key={index} className="min-w-[150px] text-xs text-center font-[600] bg-orange-100 p-2 rounded-md">
              {content.recipe.title}
            </p>
          )
        }
      </div>
      <ScrollBar/>
    </ScrollArea>
  </div>
)

export default DragAndDrop