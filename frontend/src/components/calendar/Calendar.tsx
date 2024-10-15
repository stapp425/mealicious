import { type Plan } from "@/util/types/plan"
import { useEventCalendar } from "@/util/hooks"
import Month from "./Month"

type CalendarProps = {
  className?: string
  plans: Plan[]
}

const Calendar: React.FC<CalendarProps> = ({ plans }) => {
  const {
    currentDay,
    setMonth,
    getEventsOfInterval,
    calendar
  } = useEventCalendar<Plan>(plans)
  
  return (
    <Month
      currentMonth={currentDay}
      days={calendar.month}
      getEventsOfInterval={getEventsOfInterval}
      setMonth={setMonth}
      className="md:flex md:justify-between md:items-center md:gap-5"
    />
  )
}

export default Calendar