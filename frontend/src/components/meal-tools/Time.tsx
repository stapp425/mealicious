import { useEffect } from "react"
import { type ReactHookFormTypes } from "@/util/types/form"
import { type Meal, type MealTime } from "@/util/types/meal"
import { useWatch } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Error from "../theme/Error"

type TimeProps = { className?: string } & Pick<ReactHookFormTypes<Meal>, "setValue" | "control" | "error" | "setError" | "clearErrors">

const Time: React.FC<TimeProps> = ({ className, setValue, control, error, setError, clearErrors }) => {
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
    <div className="space-y-2">
      <Select defaultValue={mealTime} onValueChange={value => setValue("time", value as MealTime)}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={mealTime}/>
        </SelectTrigger>
        <SelectContent className={className}>
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
      {
        error.time &&
        <Error>{error.time.message}</Error>
      }
    </div>
  )
}

export default Time