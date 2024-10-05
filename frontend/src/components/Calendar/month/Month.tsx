import { useEffect, useRef } from "react"
import * as dateFns from "date-fns"
import { type Plan } from "@/util/types/plan"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { animate, stagger } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import Box from "./Box"
import DayIcon from "./DayIcon"

type MonthProps<T = Plan> = {
  className?: string
  days: Date[]
  currentMonth: Date
  previousMonth: string
  nextMonth: string
  getEventsOfInterval: (start: Date, end: Date) => T[]
  setMonth: (value: number) => void
}

const Month: React.FC<MonthProps> = ({ days, currentMonth, previousMonth, nextMonth, className, setMonth, getEventsOfInterval }) => {
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
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.35 }}
      className={cn("overflow-hidden border border-slate-400 rounded-md", className)}
    >
      <div ref={calendarRef} className="flex flex-col justify-between gap-3 p-4">
        <div className="flex justify-between items-center py-2">
          <button onClick={() => setMonth(-1)} className="bg-orange-500 flex justify-between items-center text-white rounded-sm p-2 hover:bg-orange-600 active:bg-orange-700 transition-colors">
            <ChevronLeft/>
            <div className="text-left">
              <h1 className="text-left font-[600] leading-5 px-2">
                {previousMonth}
              </h1>
            </div>
          </button>
          <h1 className="font-bold text-4xl text-center">
            {dateFns.format(currentMonth, "MMMM yyyy")}
          </h1>
          <button onClick={() => setMonth(1)} className="bg-orange-500 flex justify-between items-center text-white rounded-sm p-2  hover:bg-orange-600 active:bg-orange-700 transition-colors">
            <h1 className="text-right font-[600] leading-5 px-2">
              {nextMonth}
            </h1>
            <ChevronRight/>
          </button>
        </div>
        <Separator/>
        <div>
          <div className="grid grid-cols-[repeat(7,_75px)] place-items-center gap-2 pb-2 mb-1">
            <DayIcon day="Su"/>
            <DayIcon day="Mo"/>
            <DayIcon day="Tu"/>
            <DayIcon day="We"/>
            <DayIcon day="Th"/>
            <DayIcon day="Fr"/>
            <DayIcon day="Sa"/>
          </div>
          <div className="overflow-hidden flex-1 grid grid-cols-[repeat(7,_75px)] gap-2">
            {
              days.map((day: Date, index: number) => {
                const dailyPlans = getEventsOfInterval(dateFns.startOfDay(day), dateFns.endOfDay(day))
                const isSameMonth = dateFns.isSameMonth(day, currentMonth)

                return (
                  <div 
                    key={index}
                    className={`day aspect-square border ${dateFns.isToday(day) ? "bg-orange-300 border-orange-300" : "border-slate-400"} p-2 rounded-sm`}
                  >
                    <h1 className={`${isSameMonth ? "text-black" : "text-slate-400"} font-[600]`}>{dateFns.format(day, "d")}</h1>
                    {
                      dailyPlans.length > 0 && 
                      <Box day={day}>
                        <div className="flex flex-col gap-2">
                          {
                            dailyPlans.map((plan, index) => (
                              <div
                                key={index}
                                className="border border-slate-400 rounded-md p-3"
                              >
                                <h1 className="font-bold text-lg">{plan.title}</h1>
                                { 
                                  plan.description &&
                                  <p className="font-[600] text-xs text-muted-foreground">
                                    {plan.description}
                                  </p> 
                                }
                                {
                                  plan.tags &&
                                  plan.tags.map((tag, index) => 
                                    <div 
                                      key={index}
                                      className="bg-orange-500 text-xs font-[600] text-white rounded-full px-3"
                                    >
                                      {tag}
                                    </div>
                                  )
                                }
                              </div>
                            ))
                          }
                        </div>
                      </Box>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Month
