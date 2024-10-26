import { createContext, useContext, useState } from "react"
import { AppContext } from "@/App"
import { Calendar, Clock, Heart, LayoutGrid, LucideProps, Pencil, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useEventCalendar, useFirestoreFetch, useFirestoreUpdate } from "@/util/hooks"
import { defaultPlan, formatPlans, Plan, type Plan as PlanType } from "@/util/types/plan"
import { createQuery, ReactState } from "@/util/types/app"
import { type User } from "firebase/auth"
import Spinner from "../theme/Spinner"
import { type Meal as MealType } from "@/util/types/meal"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Placeholder from "../theme/Placeholder"
import Button from "../theme/Button"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Recipe as RecipeType } from "@/util/types/recipe"
import { Badge } from "../ui/badge"

const CurrentMealsContext = createContext<ReactState<Plan[]>>([[defaultPlan], () => {}])


// TODO: Update logic for deleting non-existent meals from plans
const DailyMeals: React.FC = () => (
  <div className="relative pt-6 flex flex-col gap-2">
    <h1 className="px-6 text-3xl font-bold">Daily Meals</h1>
    <Date/>
    <CurrentMeals/>
    <div className="absolute top-6 right-6 flex justify-between items-center gap-4">
      <Option to="create" Icon={Pencil} label="Create New"/>
      <Option Icon={LayoutGrid} label="All Meals"/>
      <Option to="calendar" Icon={Calendar} label="Meal Calendar"/>
    </div>
  </div>
)

const Date: React.FC = () => (
  <div className="px-6 flex items-center gap-2">
    <Clock size={16} className="text-muted-foreground"/>
    <p className="xl:text-lg text-muted-foreground">{format(useContext(AppContext).date, "EEEE")}</p>
  </div>
)

type OptionProps = {
  className?: string
  label: string
  to?: "create" | "calendar"
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

const Option: React.FC<OptionProps> = ({ className, label, to = "", Icon }) => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition">
          <Link to={`/meals/${to}`}>
            <Icon size={18}/>
          </Link>
        </button>
      </TooltipTrigger>
      <TooltipContent className={cn("group relative group flex flex-col gap-2 items-center", className)}>
        {label}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const CurrentMeals: React.FC = () => {
  const { user } = useContext(AppContext)
  const { data: plans, setData: setPlans, isFetching } = useFirestoreFetch<PlanType>(createQuery(user as User, "plans"), formatPlans, { initialData: [], defaultData: defaultPlan })
  const { currentEvents: { day } } = useEventCalendar<PlanType>(plans)
  
  return (
    <CurrentMealsContext.Provider value={[plans, setPlans]}>
      <div className="flex flex-col">
        {
          !isFetching
          ? <Meals meals={day.map(d => d.meals).flat()} className="px-6 pb-4"/>
          : <Spinner/>
        }
      </div>
    </CurrentMealsContext.Provider>
  )
}

const Meals: React.FC<{ className?: string, meals: MealType[] }> = ({ className, meals }) => {
  const [plans, setPlans] = useContext(CurrentMealsContext)
  const navigate = useNavigate()
  const { updateFirestoreDoc } = useFirestoreUpdate()
  
  async function deleteMealFromPlans(id: string) {
    try {
      const plansWithRemovedMeals = plans.filter(p => p.meals.some(m => m.id === id))
      setPlans(plans => plans.map(p => p.meals.every(m => m.id !== id) ? p : ({ ...p, meals: p.meals.filter(m => m.id !== id) })))
      await Promise.all(plansWithRemovedMeals.map(p => updateFirestoreDoc("plans", p.id as string, { ...p, meals: p.meals.filter(m => m.id !== id).map(f => f.id) })))
    } catch (err: any) {
      console.error(err.message)
    }
  }
  
  return (
    meals.length > 0
    ? <ScrollArea type="always">
        <div className={cn("flex gap-6", className)}>
          {
            meals.map((meal, index) => meal.title 
            ? <Meal key={index} fetchedMeal={meal}/>
            : <MealNotFound key={index} onMealDelete={() => deleteMealFromPlans(meal.id as string)}/>)}
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
    : <div className="px-6">
        <Placeholder
          icon={<X size={64}/>}
          className="w-full h-[450px] text-center border-none px-6"
        >
          <Placeholder.Message>No Plans Found for Today.</Placeholder.Message>
          <Placeholder.Tip>Try adding one!</Placeholder.Tip>
          <Button
            onClick={() => navigate("/meals/calendar")}
            className="text-sm"
          >
            Go to Event Calendar
          </Button>
        </Placeholder>
      </div>
  )
}

const Meal: React.FC<{ className?: string, fetchedMeal: MealType }> = ({ className, fetchedMeal }) => {
  const [meal, setMeal] = useState<MealType>(fetchedMeal)
  const { updateFirestoreDoc } = useFirestoreUpdate()
  
  async function removeRecipeFromMeal(id: string) {
    const updatedMeal: MealType = { ...meal, contents: meal.contents.filter(content => content.recipe.id != id) }
    
    setMeal(updatedMeal)
    await updateFirestoreDoc("meals", meal.id as string, updatedMeal)
  }
  
  return (
    <div className={cn("w-[325px] h-[450px] flex flex-col gap-2 border border-slate-400 p-4 rounded-lg", className)}>
      <h1 className="font-bold text-2xl">{meal.title}</h1>
      {
        meal.tags &&
        <div className="flex flex-wrap gap-2">
          {meal.tags.map((tag, index) => <Badge key={index} className="bg-orange-500">{tag}</Badge>)}
        </div>
      }
      <ScrollArea className="flex-1">
        <div className="overflow-hidden space-y-2">
          {
            meal.contents.map((content, index) => content.recipe.title
              ? <Recipe key={index} recipe={content.recipe}/>
              : <RecipeNotFound onRecipeDelete={() => removeRecipeFromMeal(content.recipe.id as string)}/>
            )
          }
        </div>
        <ScrollBar/>
      </ScrollArea>
      <h1 className="tracking-wider text-center font-bold text-lg text-muted-foreground">
        — {meal.time.toUpperCase()} —
      </h1>
    </div>
  )
}

const MealNotFound: React.FC<{ onMealDelete: () => void }> = ({ onMealDelete }) => (  
  <Placeholder className="w-[325px] h-[450px]">
    <Placeholder.Message>Meal does not exist.</Placeholder.Message>
    <Placeholder.Action onClick={onMealDelete} className="text-sm bg-red-500 hover:bg-red-600">Delete</Placeholder.Action>
  </Placeholder>
)

const Recipe: React.FC<{ recipe: RecipeType }> = ({ recipe }) => (
  <div className="overflow-hidden w-full min-h-[75px] flex border border-slate-400 rounded-md">
    <img
      src={recipe.image}
      alt={recipe.title}
      className="w-1/3 object-cover"
    />
    <div className="flex-1 h-full flex justify-between items-start p-3">
      <h2 className="font-bold w-3/4 only:w-full line-clamp-2">{recipe.title}</h2>
      {recipe.isFavorite && <Heart size={18} className="text-rose-500"/>}
    </div>
  </div>
)

const RecipeNotFound: React.FC<{ onRecipeDelete: () => void }> = ({ onRecipeDelete }) => (
  <Placeholder icon={<X size={18}/>} className="w-full h-fit gap-1">
    <Placeholder.Message className="text-sm">Recipe does not exist.</Placeholder.Message>
    <Placeholder.Action onClick={onRecipeDelete} className="text-xs bg-red-500 hover:bg-red-600">Delete</Placeholder.Action>
  </Placeholder>
)

export default DailyMeals