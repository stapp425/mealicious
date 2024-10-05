import { cn } from "@/lib/utils"

type Day = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa"

type DayIconProps = {
  className?: string
  day: Day
  fullDay?: boolean
}

function getFullDay(day: Day): string {
  switch(day) {
    case "Su":
      return "Sunday"
    case "Mo":
      return "Monday"
    case "Tu":
      return "Tuesday"
    case "We":
      return "Wednesday"
    case "Th":
      return "Thursday"
    case "Fr":
      return "Friday"
    case "Sa":
      return "Saturday"
    default:
      throw new Error("Invalid day")
  }
}

const DayIcon: React.FC<DayIconProps> = ({ className, day, fullDay }) => {
  return (
    <div className={cn("flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white", className)}>
      {fullDay ? getFullDay(day) : day}
    </div>
  )
}

export default DayIcon