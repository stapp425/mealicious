import { useContext, useEffect, useState } from "react"
import { type Plan as PlanType, type PlanSort } from "@/util/types/plan"
import { type Meal as MealType } from "@/util/types/meal"
import { type Recipe as RecipeType } from "@/util/types/recipe"
import { compareAsc as compareDates, format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "../ui/badge"
import { ScrollText } from "lucide-react"
import { AppContext } from "@/App"
import { cn } from "@/lib/utils"
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Button from "../theme/Button"

type AllProps = {
  className?: string
  plans: PlanType[]
}

const All: React.FC<AllProps> = ({ className, plans }) => {
  const { screenSizes: { lg } } = useContext(AppContext)
  const [sortedPlans, setSortedPlans] = useState<PlanType[]>([])

  function sortPlans(sort: PlanSort) {
    switch(sort) {
      case "date":
        setSortedPlans(s => [...s].sort((a, b) => compareDates(a.date, b.date)))
        break
      case "title":
        setSortedPlans(s => [...s].sort((a, b) => a.title.localeCompare(b.title)))
        break
    }
  }
  
  useEffect(() => {
    if(plans.length > 0)
      setSortedPlans(plans)
  }, [plans])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          disabled={plans.length <= 0}
          className={cn("flex flex-col lg:flex-row items-center disabled:cursor-not-allowed disabled:text-slate-200 disabled:border-slate-200 disabled:hover:bg-transparent", className)}
        >
          <ScrollText className="inline"/> <span className="text-xs md:text-base">{lg ? "View" : "View Plans"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] md:w-[500px] h-[min(650px,90vh)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent p-4 md:p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl">All Plans</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Displays a list of plans created by the user. There are sorting options such as date and title for better organization.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <Select onValueChange={sortPlans}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Sort Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="space-y-2">
          {sortedPlans.map((plan, index) => <Plan key={index} plan={plan}/>)}
        </div>
      </DialogContent>
    </Dialog>
    
    
  )
}

const Plan: React.FC<{ plan: PlanType }> = ({ plan }) => (
  <div className="text-left has-[:checked]:bg-red-100 border border-slate-400 has-[:checked]:border-red-500 p-4 rounded-md">
    <h1 className="font-bold text-2xl">{plan.title}</h1>
    <h2 className="font-[600] text-xs">{format(plan.date, "MMMM dd, yyyy")}</h2>
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

export default All