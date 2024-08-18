import { type Plan } from "@/types/plan"
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
  plans: Plan[]
}

const Calendar: React.FC<Props> = ({ plans }) => {
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
    <Tabs defaultValue="month">
      <TabsList className="w-full flex justify-around *:flex-1">
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