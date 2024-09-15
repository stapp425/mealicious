import { useContext } from "react"
import { AppContext } from "@/App"
import { X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useEventCalendar, useFirestoreFetch } from "@/util/hooks"
import { formatPlans, type Plan as PlanType } from "@/types/plan"
import { createQuery } from "@/types/app"
import { type User } from "firebase/auth"
import Spinner from "../ui/Spinner"
import { Meal as MealType } from "@/types/meal"
import * as Placeholder from "../Theme/Placeholder"
import * as React from "react"

type RootProps = {
  className?: string
  children: React.ReactNode
}

const Root: React.FC<RootProps> = ({ className, children }) => (
  <div className={cn("flex flex-col gap-2", className)}>
    {children}
  </div>
)

type HeaderProps = {
  className?: string
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ className, children }) => (
  <div className={cn("flex justify-between", className)}>
    {children}
  </div>
)

type CurrentDateProps = {
  className?: string
  date: Date
}

const Date: React.FC<CurrentDateProps> = ({ className, date }) => (
  <div className={cn("flex flex-col", className)}>
    <h1 className="font-bold text-2xl xl:text-4xl">Today's Meals</h1>
    <p className="text-sm xl:text-lg text-muted-foreground">{format(date, "EEEE")}</p>
    <p className="text-sm xl:text-lg text-muted-foreground">{format(date, "MMMM do, yyyy")}</p>
  </div>
)

type OptionContainerProps = {
  className?: string
  children: React.ReactNode
}

const OptionContainer: React.FC<OptionContainerProps> = ({ className, children }) => (
  <div className={cn("flex justify-between items-center gap-2", className)}>
    {children}
  </div>
)

type OptionProps = {
  className?: string
  to: "create" | "all" | "calendar"
  label: string
  children: React.ReactNode
}

const Option: React.FC<OptionProps> = ({ className, to, label, children }) => (
  <div className={cn("group relative group flex flex-col gap-2 items-center", className)}>
    <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
      <Link to={`/meals/${to}`}>
        {children}
      </Link>
    </button>
    <p className="text-nowrap absolute -bottom-7 group-last:right-0 opacity-0 group-hover:opacity-100 transition text-sm text-muted-foreground">{label}</p>
  </div>
)

type DailyMealsProps = {
  className?: string
}

const DailyMeals: React.FC<DailyMealsProps> = ({ className }) => {
  const { user } = useContext(AppContext)
  const { data: plans, isFetching } = useFirestoreFetch<PlanType>(createQuery(user as User, "plans"), formatPlans)
  const { currentEvents: { day } } = useEventCalendar<PlanType>(plans)
  
  return (
    <div className={cn("flex flex-col", className)}>
      {
        !isFetching
        ? <Plans plans={day}/>          
        : <Spinner/>
      }
    </div>
  )
}

type PlansProps = {
  className?: string
  plans: PlanType[]
}

const Plans: React.FC<PlansProps> = ({ className, plans }) => {
  const navigate = useNavigate()

  return (
    plans.length > 0
    ? <div className={cn("h-full flex gap-3 overflow-x-auto", className)}>
       {plans.map((plan, index) => <Plan key={index} plan={plan}/>)}
      </div>
    : <Placeholder.Root
        icon={<X size={64}/>}
        className="size-full"
      >
        <Placeholder.Message>No Plans Found for Today.</Placeholder.Message>
        <Placeholder.Tip>Try adding one!</Placeholder.Tip>
        <Placeholder.Action
          onClick={() => navigate("/meals/calendar")}
          className="text-sm"
        >
          Go to Event Calendar
        </Placeholder.Action>
      </Placeholder.Root>
  )
}

type PlanProps = {
  className?: string
  plan: PlanType
}

const Plan: React.FC<PlanProps> = ({ className, plan }) => {
  const { title, tags, description, meals } = plan
  
  return (
    <div className={cn("min-w-[300px] border border-slate-400 p-3 rounded-md text-nowrap", className)}>
      <h1 className="font-bold text-xl">{title}</h1>
      {
        tags &&
        <div className="flex flex-wrap items-center gap-2">
          {tags.map(tag => <div className="text-white font-[600] text-xs px-3">{tag}</div>)}
        </div>
      }
      {
        description &&
        <p className="text-muted-foreground font-[600] text-sm">{description}</p>
      }
      <Meals meals={meals}/>
    </div>
  )
}

type MealsProps = {
  className?: string
  meals: MealType[]
}

const Meals: React.FC<MealsProps> = ({ className, meals }) => (
  meals.length > 0 &&
  <div className={cn("space-y-2 mt-2", className)}>
    {meals.map((meal, index) => <Meal key={index} meal={meal}/>)}
  </div>
)

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

export {
  Root,
  Header,
  Date,
  OptionContainer,
  Option,
  DailyMeals
}