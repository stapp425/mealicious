import { AppContext } from "@/App"
import { useContext, useEffect } from "react"
import Calendar from "./Calendar"
import CreateEvent from "./CreateEvent"
import { defaultPlan, formatPlans, type Plan } from "@/util/types/plan"
import { useFirestoreFetch } from "@/util/hooks"
import { createQuery } from "@/util/types/app"
import { User } from "firebase/auth"
import { X } from "lucide-react"
import { defaultMeal, formatMeals, Meal } from "@/util/types/meal"
import Placeholder from "../theme/Placeholder"
import RemoveEvent from "./RemoveEvents"
import Container from "../theme/Container"
import All from "./All"

const MealCalendar: React.FC = () => {
  const { user, screenSizes: { lg } } = useContext(AppContext)
  const { data: plans, setData: setPlans } = useFirestoreFetch<Plan>(
    createQuery(user as User, "plans"), 
    formatPlans, { initialData: [], defaultData: defaultPlan }
  )
  const { data: meals } = useFirestoreFetch<Meal>(
    createQuery(user as User, "meals"), 
    formatMeals, { initialData: [], defaultData: defaultMeal }
  )

  useEffect(() => {
    document.title = "Meal Calendar | Mealicious"
  }, [])

  return (
    <Container className="space-y-2 lg:bg-orange-100">
      <div className="relative w-full max-w-full md:w-fit lg:min-h-screen px-6 py-4 mx-auto space-y-4 bg-white">
        <div className="flex justify-between items-center gap-8">
          <h1 className="w-full md:w-auto text-center font-bold text-4xl">Meal Calendar</h1>
          {
            lg &&
            <div className="flex items-center gap-3">
              <All plans={plans} className="inline-block text-black bg-transparent border border-slate-400 hover:bg-slate-400 active:bg-slate-500 transition-colors"/>
              <CreateEvent meals={meals} setPlans={setPlans} className="inline-block"/>
              <RemoveEvent plans={plans} setPlans={setPlans} className="inline-block"/>
            </div>
          }
        </div>
        { 
          plans.length > 0
          ? <Calendar plans={plans} className="flex-1"/>
          : <Placeholder
              icon={<X size={64}/>}
              className="mx-auto flex-1 w-[90vw] lg:w-[min(800px,100%)]"
            >
              <Placeholder.Message>No Plans Found!</Placeholder.Message>
              <Placeholder.Tip>Try creating a new one!</Placeholder.Tip>
            </Placeholder>
        }
      </div>
      {
        !lg &&
        <div className="w-full h-options fixed bottom-0 left-0 flex items-center *:flex-1 shadow-options">
          <All
            plans={plans}
            className="bg-white text-black rounded-none hover:text-white hover:bg-slate-500 active:bg-slate-600"
          />
          <CreateEvent
            meals={meals}
            setPlans={setPlans}
            className="bg-white text-black rounded-none hover:text-white hover:bg-orange-500 active:bg-orange-600"
          />
          <RemoveEvent
            plans={plans}
            setPlans={setPlans}
            className="bg-white text-black rounded-none hover:text-white hover:bg-red-500 active:bg-red-600 disabled:bg-transparent disabled:text-slate-200 disabled:border-slate-200"
          />
        </div>
      }
    </Container>
  )
}

export default MealCalendar