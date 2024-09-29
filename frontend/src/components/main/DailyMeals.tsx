import { useContext } from "react"
import { AppContext } from "@/App"
import { Calendar, Clock, LayoutGrid, LucideProps, Pencil, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useEventCalendar, useFirestoreFetch } from "@/util/hooks"
import { formatPlans, type Plan as PlanType } from "@/util/types/plan"
import { createQuery } from "@/util/types/app"
import { type User } from "firebase/auth"
import Spinner from "../ui/Spinner"
import { Meal as MealType } from "@/util/types/meal"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import * as Placeholder from "../theme/Placeholder"
import * as React from "react"
import Button from "../theme/Button"


// TODO: Style more components
const DailyMeals: React.FC = () => (
  <div className="h-[575px] relative flex flex-col gap-2 p-6">
    <div className="absolute top-6 right-6 flex justify-between items-center gap-4">
      <Option to="create" Icon={Pencil} label="Create New"/>
      <Option to="all" Icon={LayoutGrid} label="All Meals"/>
      <Option to="calendar" Icon={Calendar} label="Meal Calendar"/>
    </div>
    <h1 className="text-3xl font-bold">Daily Meals</h1>
    <Date/>
    <CurrentMeals/>
  </div>
)

const Date: React.FC = () => (
  <div className="flex items-center gap-2">
    <Clock size={16} className="text-muted-foreground"/>
    <p className="xl:text-lg text-muted-foreground">{format(useContext(AppContext).date, "EEEE")}</p>
  </div>
)

type OptionProps = {
  className?: string
  label: string
  to: "create" | "all" | "calendar"
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

const Option: React.FC<OptionProps> = ({ className, label, to, Icon }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
          <Link to={`/meals/${to}`}>
            <Icon size={18}/>
          </Link>
        </button>
      </TooltipTrigger>
      <TooltipContent className={cn("group relative group flex flex-col gap-2 items-center", className)}>
        {label}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const CurrentMeals: React.FC = () => {
  const { user } = useContext(AppContext)
  const { data: plans, isFetching } = useFirestoreFetch<PlanType>(createQuery(user as User, "plans"), formatPlans)
  const { currentEvents: { day } } = useEventCalendar<PlanType>(plans)
  
  return (
    <div className="flex flex-col">
      {
        !isFetching
        ? <Meals meals={day.map(d => d.meals).flat()}/>          
        : <Spinner/>
      }
    </div>
  )
}

type MealsProps = {
  className?: string
  meals: MealType[]
}

const Meals: React.FC<MealsProps> = ({ className, meals }) => {
  const navigate = useNavigate()
  
  return (
    meals.length > 0
    ? <div className={cn("space-y-2 mt-2", className)}>
        {meals.map((meal, index) => <Meal key={index} meal={meal}/>)}
      </div>
    : <Placeholder.Root
        icon={<X size={64}/>}
        className="size-full"
      >
        <Placeholder.Message>No Plans Found for Today.</Placeholder.Message>
        <Placeholder.Tip>Try adding one!</Placeholder.Tip>
        <Button
          onClick={() => navigate("/meals/calendar")}
          className="text-sm"
        >
          Go to Event Calendar
        </Button>
      </Placeholder.Root>
  )
}

type MealProps = {
  className?: string
  meal: MealType
}

const Meal: React.FC<MealProps> = ({ className, meal }) => (
  <div className={cn("border border-slate-400 p-2 rounded-md", className)}>
    <div className="flex justify-between items-center">
      <h1 className="font-bold">{meal.title}</h1>
      <h1 className="text-center min-w-[100px] bg-orange-500 font-[600] text-sm text-white px-3 rounded-md">{meal.time}</h1>
    </div>
    <div className="overflow-hidden flex flex-wrap gap-2 xl:justify-between xl:mt-2">
      {
        meal.contents.map(({ recipe }) => 
          <img
            src={recipe.image}
            alt={recipe.title}
            className="size-[25px] xl:size-[75px] rounded-md"
          />
        )
      }
    </div>
  </div>
)

export default DailyMeals