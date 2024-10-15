import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/App"
import { type Plan as PlanType } from "@/util/types/plan"
import { type Meal } from "@/util/types/meal"
import { type Recipe as RecipeType } from "@/util/types/recipe"
import { type SubmitHandler, useForm, useWatch } from "react-hook-form"
import { type ReactHookFormTypes } from "@/util/types/form"
import { useToast } from "@/components/ui/use-toast"
import { useFirestoreDelete } from "@/util/hooks"
import { format } from "date-fns"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Button from "@/components/theme/Button"
import Spinner from "@/components/theme/Spinner"
import Error from "@/components/theme/Error"

type RemoveEventsProps = {
  className?: string
  plans: PlanType[]
  setPlans: React.Dispatch<React.SetStateAction<PlanType[]>>
}

export type PlanQueries = {
  plans: (PlanType & { selected: boolean })[]
}

const RemoveEvents: React.FC<RemoveEventsProps> = ({ className, plans, setPlans }) => {
  const { screenSizes: { lg } } = useContext(AppContext)
  const { toast } = useToast()
  const { isWorking, deleteFirestoreDoc } = useFirestoreDelete()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { 
    register, 
    handleSubmit, 
    setError,
    clearErrors,
    reset,
    control, 
    formState: { errors } 
  } = useForm<PlanQueries>({
    defaultValues: { 
      plans: plans 
    }},
  )

  const formProps = { register, setError, control, clearErrors }
  
  const removePlans: SubmitHandler<PlanQueries> = async (data) => {        
    try {
      // Remove selected documents from Firestore (backend)
      const selectedPlans = data.plans.filter(p => p.selected)
      const deletePromises = selectedPlans.map(({ id }) => deleteFirestoreDoc("plans", id as string))
      await Promise.all(deletePromises)

      // Remove selected documents from plans state (frontend)
      const selectedPlanIds = selectedPlans.map(p => p.id as string)
      setPlans(p => p.filter(({ id }) => !selectedPlanIds.includes(id as string)))
      setIsDialogOpen(false)
      toast({
        title: "Warning!",
        description: "All selected plans successfully deleted.",
        variant: "theme"
      })
    } catch (err: any) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    reset({ 
      plans: plans.map(p => ({ ...p, selected: false }))
    })
  }, [plans])
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={(bool) => setIsDialogOpen(bool)}>
      <DialogTrigger asChild>
        <Button 
          disabled={plans.length <= 0}
          className={cn("flex flex-col items-center bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300", className)}
        >
          <X className="inline"/> <span className="text-xs md:text-base">{lg ? "Remove" : "Remove Events"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] md:w-[500px] h-[min(650px,90vh)] flex flex-col justify-between gap-3 p-6">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl">
            Remove Events
          </DialogTitle>
          <DialogDescription className="font-[600]">
            Select as many events below to delete. Click "Remove Event(s)" when you are finished.
          </DialogDescription>
        </DialogHeader>
        <Plans 
          {...formProps}
          plans={plans}
          onSubmit={handleSubmit(removePlans)}
          id="removeEventsForm"
          className="flex-1"
        />
        <DialogFooter className="flex sm:justify-between items-center">
          {
            errors.plans &&
            <Error className="mt-2 md:mt-0">{errors.plans.message}</Error>
          }
          <Button
            type="submit"
            form="removeEventsForm"
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 only:ml-auto"
          >
            { 
              isWorking
              ? <><Spinner className="inline"/> Working on it...</>
              : "Remove Event(s)"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type PlansProps = {
  plans: PlanType[]
} & React.FormHTMLAttributes<HTMLFormElement> & Pick<ReactHookFormTypes<PlanQueries>, "control" | "setError" | "clearErrors" | "register">

type PlanProps = {
  plan: PlanType
  index: number
} & Pick<ReactHookFormTypes<PlanQueries>, "register">

const Plans: React.FC<PlansProps> = ({ className, control, setError, clearErrors, plans, register, ...props }) => {  
  const allPlans = useWatch({
    control,
    name: "plans"
  })

  useEffect(() => {
    if(allPlans.every(p => !p.selected)) {
      setError("plans", {
        type: "unselected",
        message: "There are no plans selected."
      })
    } else {
      clearErrors("plans")
    }
  }, [allPlans])
  
  return (
    <form 
      className={cn("overflow-y-auto space-y-4", className)}
      {...props}
    >
      {
        plans.map((plan, index) => 
          <Plan
            key={index}
            register={register}
            plan={plan}
            index={index}
          />
        )
      }
    </form>
  )
}

const Plan: React.FC<PlanProps> = ({ plan, register, index }) => {  
  const { date, title, description, tags, meals } = plan
  
  function clickCheckbox(event: React.MouseEvent<HTMLButtonElement>) {
    const inputElement = event.currentTarget.querySelector('input[type="checkbox"]') as HTMLInputElement
    
    inputElement.click()
  }
  
  return (
    <button 
      type="button"
      onClick={clickCheckbox}
      className="text-left has-[:checked]:bg-red-100 border border-slate-400 has-[:checked]:border-red-500 p-4 rounded-md"
    >
      <div>
        <h1 className="font-bold text-2xl">{title}</h1>
        <h2 className="font-[600] text-xs">{format(date, "MMMM dd, yyyy")}</h2>
        { 
          description && 
          <p className="font-[600] text-muted-foreground">
            {plan.description}
          </p>
        }
        {
          tags && tags.length > 0 &&
          <div className="flex flex-wrap gap-2">
            {
              tags.map((tag, index) => 
                <Badge key={index} className="size-fit bg-orange-500 text-white font-[600] rounded-full">
                  {tag}
                </Badge>
              )
            }
          </div>
        }
        <div className="space-y-2">
          {meals.map((meal, index) => <Meal key={index} meal={meal}/>)}
        </div>
      </div>
      <input 
        type="checkbox"
        {...register(`plans.${index}.selected`)}
        className="invisible"
      />
    </button>
  )
}

const Meal: React.FC<{ meal: Meal }> = ({ meal }) => {
  const { title, description, tags, time, contents } = meal
  
  return (
    <div className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-slate-400 [&:not(:last-child)]:pb-3 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{title}</h1>
        <h1 className="bg-orange-500 text-white font-[600] px-4 rounded-md">
          {time}
        </h1>
      </div>
      {
        description &&
        <p>{description}</p>
      }
      {
        tags &&
        <div className="flex flex-wrap gap-2">
          {
            tags.map((tag, index) => 
              <span key={index} className="size-fit bg-orange-500 text-white font-[600] text-xs px-4 rounded-full">
                {tag}
              </span>
            )
          }
        </div>
      }
      {contents.map((content, index) => <Recipe key={index} recipe={content.recipe}/>)}
    </div>
  )
}

const Recipe: React.FC<{ recipe: RecipeType }> = ({ recipe }) => {
  const { title, image } = recipe

  return (
    <div className="border border-slate-400 relative overflow-hidden flex items-center rounded-md">
      <img
        src={image}
        alt={title}
        className="h-[75px] w-[75px] bg-white object-cover"
      />
      <h1 className="font-bold line-clamp-2 px-6">{title}</h1>
    </div>
  )
}

export default RemoveEvents