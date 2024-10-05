import { type Recipe as RecipeType } from "@/util/types/recipe"
import { type Meal as MealType } from "@/util/types/meal"
import { type Plan as PlanType } from "@/util/types/plan"
import { format } from "date-fns"
import { useWatch, type UseFormRegister } from "react-hook-form"
import { PlanQueries } from "./RemoveEvent"
import { type ReactHookFormTypes } from "@/util/types/form"
import { useEffect } from "react"

type PlansProps = {
  plans: PlanType[]
} & React.FormHTMLAttributes<HTMLFormElement> & Pick<ReactHookFormTypes<PlanQueries>, "control" | "setError" | "clearErrors" | "register">

type PlanProps = {
  plan: PlanType
  register: UseFormRegister<PlanQueries>
  index: number
}

type MealProps = {
  meal: MealType
}

type RecipeProps = {
  recipe: RecipeType
}

const Plans: React.FC<PlansProps> = ({ children, className, control, setError, clearErrors, plans, register, ...props }) => {  
  const allPlans = useWatch({
    control,
    name: "plans"
  })

  useEffect(() => {
    if(allPlans.every(p => !p.selected)) {
      setError("plans", {
        type: "unselected",
        message: "There are no plans selected."
      })
    } else {
      clearErrors("plans")
    }
  }, [allPlans])
  
  return (
    <form 
      className={className}
      {...props}
    >
      <div className="overflow-y-auto space-y-4 h-[500px]">
        {
          plans.map((plan, index) => 
            <Plan
              key={index}
              register={register}
              plan={plan}
              index={index}
            />
          )
        }
      </div>
      {children}
    </form>
  )
}

const Plan: React.FC<PlanProps> = ({ plan, register, index }) => {  
  const { date, title, description, tags, meals } = plan
  
  function clickCheckbox(event: React.MouseEvent<HTMLButtonElement>) {
    const inputElement = event.currentTarget.querySelector('input[type="checkbox"]') as HTMLInputElement
    
    inputElement.click()
  }
  
  return (
    <button 
      type="button"
      onClick={clickCheckbox}
      className="text-left has-[:checked]:bg-red-100 border border-slate-400 has-[:checked]:border-red-500 p-4 rounded-md"
    >
      <div>
        <h1 className="font-bold text-2xl">{title}</h1>
        <h2 className="font-[600] text-xs">{format(date, "MMMM dd, yyyy")}</h2>
        { 
          description && 
          <p className="font-[600] text-muted-foreground">
            {plan.description}
          </p>
        }
        {
          tags &&
          tags.map((tag, index) => 
            <div key={index} className="bg-orange-500 text-white font-[600] rounded-full">
              {tag}
            </div>
          )
        }
        <div className="space-y-2">
          {meals.map((meal, index) => <Meal key={index} meal={meal}/>)}
        </div>
      </div>
      <input 
        type="checkbox"
        {...register(`plans.${index}.selected`)}
        className="peer invisible"
      />
    </button>
  )
}

const Meal: React.FC<MealProps> = ({ meal }) => {
  const { title, description, tags, time, contents } = meal
  
  return (
    <div className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-slate-400 [&:not(:last-child)]:pb-3 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{title}</h1>
        <h1 className="bg-orange-500 text-white font-[600] px-4 rounded-md">
          {time}
        </h1>
      </div>
      {
        description &&
        <p>{description}</p>
      }
      {
        tags &&
        <div className="flex gap-2">
          {
            tags.map((tag, index) => 
              <span key={index} className="size-fit bg-orange-500 text-white font-[600] text-xs px-4 rounded-full">
                {tag}
              </span>
            )
          }
        </div>
      }
      {contents.map((content, index) => <Recipe key={index} recipe={content.recipe}/>)}
    </div>
  )
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const { title, image } = recipe

  return (
    <div className="border border-slate-400 relative overflow-hidden flex items-center rounded-md">
      <img
        src={image}
        alt={title}
        className="h-[75px] w-[75px] bg-white"
      />
      <h1 className="font-bold line-clamp-2 px-6">{title}</h1>
    </div>
  )
}

export default Plans