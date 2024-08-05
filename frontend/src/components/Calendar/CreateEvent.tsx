import { SubmitHandler, useForm } from "react-hook-form"
import { type Event } from "./Calendar"
import { useContext, useEffect, useState } from "react"
import {
  startOfWeek,
  addDays,
  addMonths,
  format,
  parse,
  getTime
} from "date-fns"
import { Input } from "../ui/input"
import { useFirestorePost } from "@/util/hooks"
import { CurrentUser } from "@/types/app"
import { AppContext } from "@/App"
import { currentDay } from "@/util/hooks"

const dateFormat = "yyyy-MM-dd"
const minDate = startOfWeek(addDays(currentDay, 7), { weekStartsOn: 1 }) // Monday of the following week
const maxDate = startOfWeek(addMonths(minDate, 2), { weekStartsOn: 0 }) // Sunday 2 months in the future

const CreateEvent: React.FC = () => {
  const user = useContext<CurrentUser>(UserContext)
  const [date, setDate] = useState<string>("")
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<Event>({ defaultValues: {
    date: currentDay.getTime(),
    title: "",
    description: ""
  }})

  const { addFirestoreDoc } = useFirestorePost()

  const submitEvent: SubmitHandler<Event> = async (data) => {
    if(user) {
      try {
        await addFirestoreDoc("test", {
          ...data,
          userId: user.uid
        })
      } catch (err: any) {
        console.error(err.message)
      }
    }
    
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value)
  }
  
  useEffect(() => {
    setValue("date", getTime(parse(date, dateFormat, new Date())))
  }, [date])
  
  return (
    <form onSubmit={handleSubmit(submitEvent)}>
      <h1 className="">FORM!</h1>
      <div className="flex justify-between gap-2">
        <Input
          type="date"
          value={date}
          min={format(minDate, dateFormat)}
          max={format(maxDate, dateFormat)}
          onChange={handleChange}
        />
      </div>
      <Input
        type="text"
        {
          ...register("title", {
            required: "A title is required before submitting."
          })
        }
        placeholder="Title..."
      />
      {
        errors.title &&
          <div className="border border-red-500 bg-red-200 rounded-sm">
            {errors.title.message}
          </div>
      }
      <Input
        type="text"
        {
          ...register("description", {
            required: "A description is required before submitting."
          })
        }
        placeholder="Description..."
      />
      {
        errors.description &&
          <div className="border border-red-500 bg-red-200 rounded-sm">
            {errors.description.message}
          </div>
      }
      <button className="bg-orange-500 text-white rounded-sm p-2 font-[600]">
        { isSubmitting ? "Working on it..." : "Submit Event" }
      </button>
    </form>
  )
}

export default CreateEvent