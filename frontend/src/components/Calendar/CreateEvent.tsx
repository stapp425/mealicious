import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import {
  startOfWeek,
  addDays,
  addMonths,
  format,
  parse,
} from "date-fns"
import { Input } from "../ui/input"
import { useFirestorePost, useInputChange } from "@/util/hooks"
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
import Button from "../theme/Button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Spinner from "@/components/theme/Spinner"
import Error from "@/components/theme/Error"
import DragAndDrop from "./DragAndDrop"
import { defaultPlan, type Plan } from "@/util/types/plan"
import { useToast } from "@/components/ui/use-toast"
import { Meal } from "@/util/types/meal"
import { ReactHookFormTypes } from "@/util/types/form"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

const dateFormat = "yyyy-MM-dd"
const minDate = addDays(now, 1) // Tomorrow
const maxDate = startOfWeek(addMonths(minDate, 2), { weekStartsOn: 0 }) // Sunday 2 months in the future

type CreateEventProps = {
  className?: string
  meals: Meal[]
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>
}


// TODO: Make drag-and-drop work on mobile
const CreateEvent: React.FC<CreateEventProps> = ({ className, meals, setPlans }) => {
  const { toast } = useToast()
  const { user, screenSizes: { lg } } = useContext(AppContext)
  const [date, setDate] = useState<Date>(minDate)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
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
        const addedPlan = await addFirestoreDoc("plans", {
          ...data,
          date: Timestamp.fromDate(data.date),
          meals: data.meals.map(meal => meal.id as string),
          userId: user.uid
        })
        setPlans(s => [...s, { ...data, id: addedPlan.id }])
        reset(defaultPlan)
        setIsDialogOpen(false)
      } catch (err: any) {
        toast({
          title: "Error!",
          description: "Failed to add plan.",
          variant: "destructive"
        })
      }
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {   
    const input = event.target.value
    setDate(input ? parse(input, dateFormat, new Date()) : minDate) 
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if(!/Tab|F[0-9]+/.test(event.key)) event.preventDefault()
  }
  
  useEffect(() => {
    setValue("date", date)
  }, [date])
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className={cn("flex flex-col items-center", className)}>
          <Plus className="inline"/> <span className="text-xs md:text-base">{lg ? "Create" : "Create an Event"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent w-[90vw] md:w-[500px] h-[min(650px,90vh)] p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl">
            Create an Event
          </DialogTitle>
          <DialogDescription className="font-[600] text-xs sm:text-base">
            Add a plan to your calendar here! Click "Submit Event" when you are finished.
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
          <Tags control={control} setValue={setValue}/>
          <Label className="space-y-1">
            <h2 className="text-lg after:content-['_(optional)'] after:text-xs after:text-muted-foreground">Description</h2>
            <Textarea
              {...register("description")}
              placeholder="Description..."
              className="border-dashed border-slate-400"
            />
          </Label>
          <DragAndDrop
            meals={meals}
            control={control}
            setValue={setValue}
            error={errors}
            setError={setError}
            clearErrors={clearErrors}
          />
          <DialogFooter>
            <Button type="submit" className="bg-orange-500 text-white rounded-sm py-2 px-4 font-[600]">
              {isSubmitting ? <><Spinner className="inline"/> Working on it...</> : "Submit Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const Tags: React.FC<Pick<ReactHookFormTypes<Plan>, "control" | "setValue">> = ({ control, setValue }) => {
  const { input, handleChange } = useInputChange({ tag: "" })
  const tags = useWatch({
    control,
    name: "tags"
  })

  function removeTag(tag: string) {
    tags && setValue("tags", [...tags.filter(t => t !== tag)])
  }

  function addTag(tag: string) {
    tag && tags && setValue("tags", [...tags, tag])
  }

  return (
    <div className="space-y-1">
      <h2 className="text-lg font-[600] after:content-['_(optional)'] after:text-xs after:text-muted-foreground">Tags</h2>
      <div className="min-h-[50px] border border-dashed border-slate-400 py-2 rounded-sm space-y-1">
        <div className="flex justify-between gap-2 px-2">
          <Input
            name="tag"
            value={input.tag}
            onChange={handleChange}
            autoComplete="off"
            className="w-full"
          />
          <Button 
            type="button"
            onClick={() => addTag(input.tag)}
            className="size-10 flex justify-center items-center p-0"
          >
            <Plus size={16}/>
          </Button>
        </div>
        {
          tags && tags.length > 0 &&
          <ScrollArea type="always" className="h-[30px]">
            <div className="flex items-center gap-2 px-2">
              {
                tags.map((tag, index) => 
                  <Button 
                    key={index}
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="h-[15px] text-white text-xs bg-orange-500 hover:bg-red-500 active:bg-red-600 transition-colors p-0 px-4 rounded-full"
                  >
                    {tag}
                  </Button>
                )
              }
            </div>
            <ScrollBar orientation="horizontal"/>
          </ScrollArea>
        }
        
      </div>
    </div>
  )
}

export default CreateEvent