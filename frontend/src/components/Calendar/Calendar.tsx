import { useEffect } from "react"
import * as dateFns from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCalendar } from "@/util/hooks"
import { animate, stagger } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import Box from "./Box"

type Props = {
  data: Event[]
}

export type Event = {
  date: number
  title: string
  description: string
  userId?: string
}

const Calendar: React.FC<Props> = ({ data }) => {
  const {
    currentMonth,
    fullCurrentMonth,
    setPreviousMonth,
    setNextMonth,
    getEventsOfDate,
    dates: {
      adjacentMonths,
    }
  } = useCalendar<Event>(data)

  useEffect(() => {
    const calendar = document.getElementById("calendar")
    const days = [...document.getElementsByClassName("day")]

    if(calendar && days.length > 0) {
      animate(
        calendar, 
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
    <div className="overflow-hidden border border-slate-400 rounded-md">
      <div id="calendar" className="flex flex-col justify-between gap-3 p-4" draggable>
        <div className="flex justify-between items-center py-2">
          <button onClick={setPreviousMonth} className="bg-orange-500 flex justify-between items-center text-white rounded-sm p-2 hover:bg-orange-600 active:bg-orange-700 transition-colors">
            <ChevronLeft/>
            <div className="text-left">
              <h1 className="text-left font-[600] leading-5 px-2">
                {adjacentMonths.previous}
              </h1>
            </div>
          </button>
          <h1 className="font-bold text-4xl text-center">
            {dateFns.format(currentMonth, "MMMM yyyy")}
          </h1>
          <button onClick={setNextMonth} className="bg-orange-500 flex justify-between items-center text-white rounded-sm p-2  hover:bg-orange-600 active:bg-orange-700 transition-colors">
            <h1 className="text-right font-[600] leading-5 px-2">
              {adjacentMonths.next}
            </h1>
            <ChevronRight/>
          </button>
        </div>
        <Separator/>
        <div>
          <div className="grid grid-cols-[repeat(7,_75px)] place-items-center gap-2 pb-2 mb-1">
            <div className="flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white">Su</div>
            <div className="flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white">Mo</div>
            <div className="flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white">Tu</div>
            <div className="flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white">We</div>
            <div className="flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white">Th</div>
            <div className="flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white">Fr</div>
            <div className="flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white">Sa</div>
          </div>
          <div 
            className="overflow-hidden flex-1 grid grid-cols-[repeat(7,_75px)] gap-2"
          >
            {
              fullCurrentMonth.map((day: Date, index: number) => {
                const dailyEvents = getEventsOfDate(dateFns.getTime(day))
                const isSameMonth = dateFns.isSameMonth(day, currentMonth)

                return (
                  <div key={index} className={`day aspect-square border ${dateFns.isToday(day) ? "bg-orange-300 border-orange-300" : "border-slate-400"} p-2 rounded-sm`}>
                    <h1 className={`${isSameMonth ? "text-black" : "text-slate-400"} font-[600]`}>{dateFns.format(day, "d")}</h1>
                    {
                      dailyEvents.length > 0 && 
                      <Box day={day}>
                        <div className="flex flex-col gap-2">
                          {
                            dailyEvents.map((event: Event, index: number) => (
                              <div key={index}>
                                <h1 className="font-bold text-lg">{event.title}</h1>
                                <p>{event.description}</p>
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
    </div>
  )
}

export default Calendar