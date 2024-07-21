import { useContext } from "react"
import { Calendar, LayoutGrid, Pencil } from "lucide-react"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { ScreenContext } from "@/App"
import { type Breakpoints } from "@/types/app"

export default function DailyMeals(): React.ReactElement {
  const matches = useContext<Breakpoints>(ScreenContext)

  return (
    <div className="row-start-2 col-start-2 col-span-2 xl:row-span-1 xl:col-span-1 flex flex-col gap-2">
      <div className="relative flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl xl:text-4xl">Today's Meals</h1>
          <p className="text-sm xl:text-lg text-muted-foreground">Tuesday</p>
          <p className="text-sm xl:text-lg text-muted-foreground">07/09/2024</p>
        </div>
        <div className="absolute top-0 right-0 flex justify-between items-center gap-2">
          <div className="relative group flex flex-col gap-2 items-center">
            <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
              <Link to="/meals/calendar">
                <Pencil size={matches.xl ? 20 : 18}/>
              </Link>
            </button>
            <p className="text-nowrap absolute -bottom-7 opacity-0 group-hover:opacity-100 transition text-sm text-muted-foreground">Create New</p>
          </div>
          <Separator orientation="vertical" className="h-8 w-[2px] bg-slate-300 rounded-full"/>
          <div className="relative group flex flex-col gap-2 items-center bg-red-500r">
            <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
              <Link to="/meals/calendar">
                <LayoutGrid size={matches.xl ? 20 : 18}/>
              </Link>
            </button>
            <p className="text-nowrap absolute -bottom-7 opacity-0 group-hover:opacity-100 transition text-sm text-muted-foreground">All Meals</p>
          </div>
          <Separator orientation="vertical" className="h-8 w-[2px] bg-slate-300 rounded-full"/>
          <div className="relative group flex flex-col gap-2 items-center bg-red-500r">
            <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
              <Link to="/meals/calendar">
                <Calendar size={matches.xl ? 20 : 18}/>
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
  )
}