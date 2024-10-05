import { type Plan } from "@/util/types/plan"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Button from "../../theme/Button"
import Plans from "./Plans"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useFirestoreDelete } from "@/util/hooks"
import Spinner from "@/components/theme/Spinner"
import Error from "../Error"
import { useEffect, useState } from "react"

type RemoveEventProps = {
  plans: Plan[]
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>
}

export type PlanQueries = {
  plans: (Plan & { selected: boolean })[]
}

const RemoveEvent: React.FC<RemoveEventProps> = ({ plans, setPlans }) => {
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
      <DialogTrigger>
        <Button 
          disabled={plans.length <= 0}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          Remove Events
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] p-6 space-y-3">
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
          className="space-y-3"
        >
          <DialogFooter className="flex sm:justify-between items-center">
            <div>
              {
                errors.plans &&
                <Error>{errors.plans.message}</Error>
              }
            </div>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600 active:bg-red-700"
            >
              { 
                isWorking
                ? <>
                    <Spinner/>
                    Working on it...
                  </>
                : "Remove Event(s)"
              }
            </Button>
          </DialogFooter>
        </Plans>
      </DialogContent>
    </Dialog>
  )
}

export default RemoveEvent