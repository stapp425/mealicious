import { useEffect, useRef } from "react"
import * as dateFns from "date-fns"
import { type Meal as MealType } from "@/util/types/meal"
import { type Plan as PlanType } from "@/util/types/plan"
import { type Recipe as RecipeType } from "@/util/types/recipe"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { animate, AnimatePresence, stagger } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Badge } from "../ui/badge"

type MonthProps = {
  className?: string
  days: Date[]
  currentMonth: Date
  getEventsOfInterval: (start: Date, end: Date) => PlanType[]
  setMonth: (value: number) => void
}

const Month: React.FC<MonthProps> = ({ days, currentMonth, className, setMonth, getEventsOfInterval }) => {
  const calendarRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const days = [...document.getElementsByClassName("day")]

    if(calendarRef.current && days.length > 0) {
      animate(
        calendarRef.current, 
        { opacity: [0, 100] }, 
        { 
          ease: "easeOut",
          duration: 0.5
        }
      )
      animate(
        days,
        { 
          y: [50, 0], 
          opacity: [0, 100]
        },
        {
          ease: "easeOut",
          duration: 0.015,
          delay: stagger(0.02)
        }
      )
    }
  }, [currentMonth])

  return (
    <div className={className}>
      <AnimatePresence>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.35 }}
          className="overflow-hidden mx-auto rounded-md"
        >
          <div ref={calendarRef} className="overflow-hidden space-y-3">
            <div className="flex justify-between items-center w-full py-2">
              <button onClick={() => setMonth(-1)} className="bg-orange-500 flex justify-between items-center text-white p-0.5 md:p-2 hover:bg-orange-600 active:bg-orange-700 transition-colors rounded-full md:rounded-sm">
                <ChevronLeft/>
              </button>
              <h1 className="mx-auto font-bold text-2xl sm:text-4xl text-center">
                {dateFns.format(currentMonth, "MMMM yyyy")}
              </h1>
              <button onClick={() => setMonth(1)} className="bg-orange-500 flex justify-between items-center text-white p-0.5 md:p-2 hover:bg-orange-600 active:bg-orange-700 transition-colors rounded-full md:rounded-sm">
                <ChevronRight/>
              </button>
            </div>
            <Separator/>
            <div>
              <div className="flex justify-around pb-3">
                <DayIcon>Su</DayIcon>
                <DayIcon>Mo</DayIcon>
                <DayIcon>Tu</DayIcon>
                <DayIcon>We</DayIcon>
                <DayIcon>Th</DayIcon>
                <DayIcon>Fr</DayIcon>
                <DayIcon>Sa</DayIcon>
              </div>
              <div className="overflow-hidden flex-1 flex flex-wrap border border-slate-400 rounded-md">
                {
                  days.map((day, index) => {
                    const dailyPlans = getEventsOfInterval(dateFns.startOfDay(day), dateFns.endOfDay(day))
                    const isSameMonth = dateFns.isSameMonth(day, currentMonth)

                    return (
                      <div key={index} className={`day relative w-[calc(100%/7)] h-[min(10vh,15vw)] lg:h-auto lg:aspect-square ${dateFns.isToday(day) ? "bg-orange-300" : ""} p-2 border border-slate-300`}>
                        <h1 className={`${isSameMonth ? "text-black" : "text-slate-400"} font-[600] text-sm sm:text-base`}>{dateFns.format(day, "d")}</h1>
                        {
                          dailyPlans.length > 0 && 
                          <Events 
                            day={day}
                            plans={dailyPlans}
                            className="absolute top-1/2 left-2 md:static md:translate-x-0"
                          />
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const Events: React.FC<{ className?: string, plans: PlanType[], day: Date }> = ({ className, plans, day }) => (
  <Dialog>
    <DialogTrigger className={cn("size-3 bg-orange-500 rounded-md hover:scale-[120%] transition-transform", className)}/>
    <DialogContent className="w-[90vw] md:w-[500px] h-[min(650px,90vh)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-thumb-rounded-full scrollbar-track-transparent p-4 md:p-6 space-y-1.5">
      <DialogTitle className="font-bold text-3xl">
        Events
      </DialogTitle>
      <DialogDescription className="font-[600] flex items-center gap-2">
        <Calendar className="inline"/> <span className="text-lg">{dateFns.format(day, "MMMM dd, yyyy")}</span>
      </DialogDescription>
      <div className="flex flex-col gap-2">
        {plans.map((plan, index) => <Plan key={index} plan={plan}/>)}
      </div>
    </DialogContent>
  </Dialog>
)

const Plan: React.FC<{ plan: PlanType }> = ({ plan }) => (
  <div className="text-left has-[:checked]:bg-red-100 border border-slate-400 has-[:checked]:border-red-500 p-4 rounded-md">
    <h1 className="font-bold text-2xl">{plan.title}</h1>
    { 
      plan.description && 
      <p className="font-[600] text-muted-foreground">
        {plan.description}
      </p>
    }
    {
      plan.tags && plan.tags.length > 0 &&
      <div className="flex flex-wrap gap-2">
        {
          plan.tags.map((tag, index) => 
            <Badge key={index} className="size-fit bg-orange-500 text-white font-[600] rounded-full">
              {tag}
            </Badge>
          )
        }
      </div>
    }
    <div className="space-y-2">
      {plan.meals.map((meal, index) => <Meal key={index} meal={meal}/>)}
    </div>
  </div>
)

const Meal: React.FC<{ meal: MealType }> = ({ meal }) => (
  <div className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-slate-400 [&:not(:last-child)]:pb-3 space-y-3">
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-lg">{meal.title}</h1>
      <h1 className="bg-orange-500 text-white font-[600] px-4 rounded-md">
        {meal.time}
      </h1>
    </div>
    {
      meal.description &&
      <p>{meal.description}</p>
    }
    {
      meal.tags && meal.tags.length > 0 &&
      <div className="flex flex-wrap gap-2">
        {
          meal.tags.map((tag, index) => 
            <span key={index} className="size-fit bg-orange-500 text-white font-[600] text-xs px-4 rounded-full">
              {tag}
            </span>
          )
        }
      </div>
    }
    {meal.contents.map((content, index) => <Recipe key={index} recipe={content.recipe}/>)}
  </div>
)

const Recipe: React.FC<{ recipe: RecipeType }> = ({ recipe }) => (
  <div className="border border-slate-400 relative overflow-hidden flex items-center rounded-md">
    <img
      src={recipe.image}
      alt={recipe.title}
      className="h-[75px] w-[75px] bg-white object-cover"
    />
    <h1 className="font-bold line-clamp-2 px-6">{recipe.title}</h1>
  </div>
)

const DayIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex justify-center items-center bg-orange-500 size-[24px] md:size-[36px] font-[600] text-sm md:text-base rounded-full text-white">
    {children}
  </div>
)

export default Month
