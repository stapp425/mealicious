import { type Plan as PlanType } from "@/util/types/plan"
import Meal from "./Meal"

type PlanProps = {
  plan: PlanType
}

const Plan: React.FC<PlanProps> = ({ plan }) => (
  <div className="border border-slate-400 p-2 rounded-md">
    <h3 className="font-bold text-xl">
      {plan.title}
    </h3>
    <p className="font-[600] text-muted-foreground">
      {plan.description}
    </p>
    <div>
      {plan.meals.map((meal, index) => <Meal key={index} meal={meal}/>)}
    </div>
  </div>
)

export default Plan