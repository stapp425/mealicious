import { useContext, useEffect } from "react"
import { type Obj } from "@/types/app"
import { type RequiredFieldArray as SelectField } from "@/types/form"
import { type Meal, type MealTime } from "@/types/meal"
import { type UseFormSetValue, useWatch } from "react-hook-form"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Button from "../theme/Button"
import { MealEditContext } from "./MealTools"

interface Props<T extends Obj> extends SelectField<T> {
  className?: string
  setValue: UseFormSetValue<T>
}

const Time: React.FC<Props<Meal>> = ({ className, setValue, control, setError, clearErrors }) => {
  const { mode } = useContext(MealEditContext)
  
  const mealTime = useWatch({
    control,
    name: "time"
  })

  useEffect(() => {
    if(!mealTime) {
      setError("time", {
        type: "missing",
        message: "The meal type must be included."
      })
    } else
      clearErrors("time")
  }, [mealTime])

  return (
    <div className={cn("flex justify-between", className)}>
      <Select defaultValue={mealTime} onValueChange={value => setValue("time", value as MealTime)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={mealTime}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="brunch">Brunch</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="supper">Supper</SelectItem>
            <SelectItem value="snack">Snack</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button>
        { mode === "create" && "Create Meal" }
        { mode === "edit" && "Update Meal" }
      </Button>
    </div>
  )
}

export default Time