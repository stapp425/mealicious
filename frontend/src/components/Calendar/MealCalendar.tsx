import { AppContext } from "@/App"
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
    </div>
  )
}

export default MealCalendar