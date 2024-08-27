import { AppContext } from "@/App"
<<<<<<< HEAD
import { useContext } from "react"
import Calendar from "./Calendar"
import CreateEvent from "./CreateEvent"
import { defaultPlan, isTimestamp, Plan } from "@/types/plan"
import { useFirestoreFetch } from "@/util/hooks"
import { createQuery } from "@/types/app"
import { User } from "firebase/auth"
import { X } from "lucide-react"
import { defaultMeal, Meal } from "@/types/meal"
import { Message, Placeholder, Tip } from "../Theme/Placeholder"

const MealCalendar: React.FC = () => {
  const { user } = useContext(AppContext)
  const { data: plans, setData: setPlans } = useFirestoreFetch<Plan>([defaultPlan], createQuery(user as User, "plans"))
  const { data: meals } = useFirestoreFetch<Meal>([defaultMeal], createQuery(user as User, "meals"))

  function formatPlans(plans: Plan[]): Plan[] {
    return plans.map(plan => 
      isTimestamp(plan.date)
        ? { ...plan, date: plan.date.toDate() }
        : plan
    )
  }

  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-start gap-2">
      <h1 className="font-bold text-4xl">Meal Calendar</h1>
      { 
        plans.length > 0 && plans[0].title
          ? <Calendar plans={formatPlans(plans)}/>
          : <Placeholder icon={<X size={64}/>}>
              <Message>No Plans Found!</Message>
              <Tip>Try creating a new one!</Tip>
            </Placeholder>
      }
      <CreateEvent meals={meals} setPlans={setPlans}/>
=======
import { useContext, useEffect, useState } from "react"
import Calendar from "./Calendar"
import CreateEvent from "./CreateEvent"
import { defaultPlan, isDate, isTimestamp, Plan } from "@/types/plan"
import { Timestamp } from "firebase/firestore"

const MealCalendar: React.FC = () => {
  const { plans, setPlans } = useContext(AppContext)

  useEffect(() => {
    if(plans[0].title) formatPlans()

    function formatPlans() {
      const list = plans.map(plan => 
        isTimestamp(plan.date)
          ? { ...plan, date: plan.date.toDate() }
          : plan
      )
      setPlans(list)
    }
  }, [])

  console.log(plans)

  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-start gap-2">
      <Calendar data={plans}/>
      <CreateEvent/>
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
    </div>
  )
}

export default MealCalendar