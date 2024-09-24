import { type Plan } from "@/util/types/plan"
import { useEventCalendar } from "@/util/hooks"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Month from "./month/Month"
import Day from "./day/Day"

type Props = {
  className?: string
  plans: Plan[]
}

const Calendar: React.FC<Props> = ({ className, plans }) => {
  const {
    currentDay,
    setDay,
    setMonth,
    getEventsOfInterval,
    adjacentDates,
    calendar,
    currentEvents
  } = useEventCalendar<Plan>(plans)
  
  return (
    <Tabs defaultValue="month" className={className}>
      <TabsList className="w-full flex justify-around mb-6 *:flex-1">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="day">
        <Day
          currentDay={currentDay}
          setDay={setDay}
          events={currentEvents.day}
        />
      </TabsContent>
      <TabsContent value="month">
        <Month
          currentMonth={currentDay}
          days={calendar.month}
          getEventsOfInterval={getEventsOfInterval}
          previousMonth={adjacentDates.month.previous}
          nextMonth={adjacentDates.month.next}
          setMonth={setMonth}
        />
      </TabsContent>
    </Tabs>
  )
}

export default Calendar