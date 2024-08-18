import { SubmitHandler, useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import {
  startOfWeek,
  addDays,
  addMonths,
  format,
  parse,
} from "date-fns"
import { Input } from "../ui/input"
import { useFirestorePost } from "@/util/hooks"
import { AppContext } from "@/App"
import { now } from "@/util/hooks"
import { Timestamp } from "firebase/firestore"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Button from "../Theme/Button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Spinner from "@/components/ui/Spinner"
import Error from "./Error"
import DragAndDrop from "./DragAndDrop"
import { defaultPlan, type Plan } from "@/types/plan"
import { isMeal } from "@/types/meal"
import { modifyData } from "@/types/app"

const dateFormat = "yyyy-MM-dd"
const minDate = startOfWeek(addDays(now, 7), { weekStartsOn: 1 }) // Monday of the following week
const maxDate = startOfWeek(addMonths(minDate, 2), { weekStartsOn: 0 }) // Sunday 2 months in the future


// TODO: Add events to "plans" collection
const CreateEvent: React.FC = () => {
  const { user, plans, setPlans } = useContext(AppContext)
  const [date, setDate] = useState<Date>(minDate)
  
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<Plan>({ defaultValues: defaultPlan })

  const { addFirestoreDoc } = useFirestorePost()

  const submitEvent: SubmitHandler<Plan> = async (data) => {
    if(user) {
      try {
        await addFirestoreDoc({
          ...data,
          date: Timestamp.fromDate(data.date),
          meals: data.meals.map(meal => isMeal(meal) ? meal.id : meal),
          userId: user.uid
        }, { name: "plans" })
        setPlans(modifyData<Plan>(plans, "format"))
        console.log(plans)
      } catch (err: any) {
        console.error(err.message)
      }
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {    
    setDate(parse(event.target.value, dateFormat, new Date()))
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if(!/Tab|F[0-9]+/.test(event.key)) event.preventDefault()
  }
  
  useEffect(() => {
    setValue("date", date)
  }, [date])
  
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create an Event</Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl">
            Create an Event
          </DialogTitle>
          <DialogDescription className="font-[600]">
            Add a meal to your calendar here! Click "Submit Event" when you are finished.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitEvent)} className="space-y-3">
          <div className="flex justify-between items-center gap-2 *:flex-1">
            <Label className="space-y-1">
              <h2 className="text-lg after:content-['*'] after:text-red-500">Date</h2>
              <Input
                type="date"
                value={format(date, dateFormat)}
                min={format(minDate, dateFormat)}
                max={format(maxDate, dateFormat)}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
              />
            </Label>
            <Label className="space-y-1">
              <h2 className="text-lg after:content-['*'] after:text-red-500">Title</h2>
              <Input
                type="text"
                {
                  ...register("title", {
                    required: "A title is required before submitting."
                  })
                }
                placeholder="Title..."
              />
            </Label>
          </div>
          
          {
            errors.title &&
              <Error>
                {errors.title.message}
              </Error>
          }
          <Label className="space-y-1">
            <h2 className="text-lg after:content-['_(optional)'] after:text-xs after:text-muted-foreground">Description</h2>
            <Textarea
              {...register("description")}
              placeholder="Description..."
            />
          </Label>
          <DragAndDrop
            control={control}
            setValue={setValue}
            error={errors}
            setError={setError}
            clearErrors={clearErrors}
          />
          <DialogFooter>
            <Button type="submit" className="bg-orange-500 text-white rounded-sm p-2 font-[600]">
              {isSubmitting ? <Spinner/> : "Submit Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEvent