import { AppContext } from "@/App"
import { useContext, useEffect } from "react"
import Calendar from "./Calendar"
import CreateEvent from "./EventTools/CreateEvent"
import { formatPlans, type Plan } from "@/types/plan"
import { useFirestoreFetch } from "@/util/hooks"
import { createQuery } from "@/types/app"
import { User } from "firebase/auth"
import { X } from "lucide-react"
import { formatMeals, Meal } from "@/types/meal"
import * as Placeholder from "../Theme/Placeholder"
import RemoveEvent from "./EventTools/RemoveEvent"

const MealCalendar: React.FC = () => {
  const { user } = useContext(AppContext)
  const { data: plans, setData: setPlans } = useFirestoreFetch<Plan>(createQuery(user as User, "plans"), formatPlans)
  const { data: meals } = useFirestoreFetch<Meal>(createQuery(user as User, "meals"), formatMeals)

  useEffect(() => {
    document.title = "Meal Calendar | Mealicious"
  }, [])

  return (
    <div className="relative min-h-[calc(100vh-150px)] flex flex-col items-start gap-2 bg-orange-100">
      <div className="flex flex-col h-[calc(100vh-150px)] min-w-[450px] bg-white px-6 py-4 mx-auto space-y-4">
        <h1 className="font-bold text-4xl">Meal Calendar</h1>
        { 
          plans.length > 0
          ? <Calendar plans={plans} className="flex-1"/>
          : <Placeholder.Root
              icon={<X size={64}/>}
              className="flex-1"
            >
              <Placeholder.Message>No Plans Found!</Placeholder.Message>
              <Placeholder.Tip>Try creating a new one!</Placeholder.Tip>
            </Placeholder.Root>
        }
        <div className="flex justify-center items-center gap-8">
          <CreateEvent
            meals={meals}
            setPlans={setPlans}
          />
          <RemoveEvent
            plans={plans}
            setPlans={setPlans}
          />
        </div>
      </div>
      
    </div>
  )
}

export default MealCalendar