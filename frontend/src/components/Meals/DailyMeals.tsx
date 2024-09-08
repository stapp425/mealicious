import { useContext, useEffect } from "react"
import { AppContext } from "@/App"
import { Calendar, LayoutGrid, Pencil, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useEventCalendar, useFirestoreFetch } from "@/util/hooks"
import { defaultPlan, formatPlans, type Plan as PlanType } from "@/types/plan"
import { createQuery } from "@/types/app"
import { type User } from "firebase/auth"
import Spinner from "../ui/Spinner"
import { Meal as MealType } from "@/types/meal"
import * as Placeholder from "../Theme/Placeholder"
import * as React from "react"

/* 
  <div className={cn("flex flex-col gap-2", className)}>
    <div className="relative flex justify-between">
      
      
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl xl:text-4xl">Today's Meals</h1>
        <p className="text-sm xl:text-lg text-muted-foreground">{format(date, "EEEE")}</p>
        <p className="text-sm xl:text-lg text-muted-foreground">{format(date, "MMMM do, yyyy")}</p>
      </div>
      <div className="absolute top-0 right-0 flex justify-between items-center gap-2">
        
        
        <div className="relative group flex flex-col gap-2 items-center">
          <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
            <Link to="/meals/create">
              <Pencil size={xl ? 20 : 18}/>
            </Link>
          </button>
          <p className="text-nowrap absolute -bottom-7 opacity-0 group-hover:opacity-100 transition text-sm text-muted-foreground">Create New</p>
        </div>


        <Separator orientation="vertical" className="h-8 w-[2px] bg-slate-300 rounded-full"/>


        <div className="relative group flex flex-col gap-2 items-center">
          <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
            <Link to="/meals/all">
              <LayoutGrid size={xl ? 20 : 18}/>
            </Link>
          </button>
          <p className="text-nowrap absolute -bottom-7 opacity-0 group-hover:opacity-100 transition text-sm text-muted-foreground">All Meals</p>
        </div>


        <Separator orientation="vertical" className="h-8 w-[2px] bg-slate-300 rounded-full"/>


        <div className="relative group flex flex-col gap-2 items-center bg-red-500r">
          <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
            <Link to="/meals/calendar">
              <Calendar size={xl ? 20 : 18}/>
            </Link>
          </button>
          <p className="text-nowrap absolute -bottom-7 right-0 opacity-0 group-hover:opacity-100 transition text-sm text-muted-foreground">Meal Calendar</p>
        </div>


      </div>
    </div>
    <div className="flex-1 flex justify-between gap-4 xl:gap-12">
      <Skeleton className="max-w-[200px] xl:max-w-[300px] flex-1 h-full bg-slate-300"/>
      <Skeleton className="max-w-[200px] xl:max-w-[300px] flex-1 h-full bg-slate-300"/>
      <Skeleton className="max-w-[200px] xl:max-w-[300px] flex-1 h-full bg-slate-300"/>
    </div>
  </div>
*/

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
  const { data: plans, isFetching } = useFirestoreFetch<PlanType>(createQuery(user as User, "plans"))
  const { currentEvents: { day } } = useEventCalendar<PlanType>(plans)
  
  return (
    <div className={cn("flex justify-between gap-4 xl:gap-12", className)}>
      {
        !isFetching
        ? <Plans plans={plans}/>          
        : <Spinner/>
      }
    </div>
  )
}

type PlansProps = {
  className?: string
  plans: PlanType[]
}

const Plans: React.FC<PlansProps> = ({ className, plans }) => (
  <div className={className}>
    {plans.map((plan, index) => <Plan key={index} plan={plan}/>)}
  </div>
)

type PlanProps = {
  className?: string
  plan: PlanType
}

const Plan: React.FC<PlanProps> = ({ className, plan }) => (
  <div className={className}>
    <h1>{plan.title}</h1>
    <Meals meals={plan.meals}/>
  </div>
)

type MealsProps = {
  className?: string
  meals: MealType[]
}

const Meals: React.FC<MealsProps> = ({ className, meals }) => {
  const navigate = useNavigate()

  return (
    meals.length > 0
    ? <div>
        {meals.map((meal, index) => <Meal key={index} meal={meal}/>)}
      </div>
    : <Placeholder.Root
        icon={<X size={64}/>}
        className="w-full"
      >
        <Placeholder.Message>No Meals Found for Today.</Placeholder.Message>
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

type MealProps = {
  className?: string
  meal: MealType
}

const Meal: React.FC<MealProps> = ({ className, meal }) => (
  <div className={cn("", className)}>
    <h1>{meal.title}</h1>
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