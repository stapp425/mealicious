import { createContext, forwardRef, useContext, useState } from "react"
import { type Nutrition } from "@/util/types/recipe"
import { Minus, Plus } from "lucide-react"
import Tip from "../theme/Tip"
import { cn } from "@/lib/utils"
import * as React from "react"

type NutritionComponent = {
  Serving: React.FC<{ className?: string, children: React.ReactNode }>
  Content: React.FC<{ className?: string, nutrients: Nutrition[] }>
} & React.ForwardRefExoticComponent<NutritionProps & React.RefAttributes<HTMLDivElement>>

type NutritionProps = {
  className?: string
  children: React.ReactNode
}

const NutritionContext = createContext(0)

const Nutrition: NutritionComponent = forwardRef<HTMLDivElement, NutritionProps>(({ className, children }, ref) => {
  const childrenArr = React.Children.toArray(children)

  if(childrenArr.length !== 2)
    throw new Error("There must be only 2 children in the nutrition component")

  const [count, setCount] = useState<number>(1)
  
  function increment() {
    setCount(c => c + 1)
  }

  function decrement() {
    count > 1 && setCount(c => c - 1)
  }
  
  return (
    <NutritionContext.Provider value={count}>
      <div ref={ref} className={cn("break-inside-avoid-page", className)}>
        <div className="flex items-end gap-2 mb-2 text-slate-600">
          <h1 className="font-bold text-black text-3xl leading-none">Nutrition</h1>
          <Tip>
            Contains all nutrients contributing to one's daily needs, 
            including macronutrients such as calories, carbohydrates, and fats.
          </Tip>
        </div>
        <div className="flex justify-between items-center mb-2">
          {childrenArr[0]}
          <div className="flex overflow-hidden border border-slate-400 rounded-md *:aspect-square *:w-8">
            <button onClick={decrement} className="flex justify-center items-center border-r border-r-slate-400 hover:bg-orange-500 active:bg-orange-700 hover:text-white transition-colors">
              <Minus size={18}/>
            </button>
            <span className="flex justify-center items-center border-r border-r-slate-400">{count}</span>
            <button onClick={increment} className="flex justify-center items-center aspect-square hover:bg-orange-500 active:bg-orange-700 hover:text-white transition-colors">
              <Plus size={18}/>
            </button>
          </div>
        </div>
        {childrenArr[1]}

      </div>
    </NutritionContext.Provider>
  ) 
}) as NutritionComponent

Nutrition.Serving = ({ className, children }) => (
  <h1 className={cn("text-lg", className)}>
    <b>Serving Size</b>: {children}
  </h1>
)

Nutrition.Content = ({ className, nutrients }) => (
  <div className={cn("grid grid-cols-2 border border-slate-400 p-4 rounded-lg", className)}>
    {
      nutrients.map((nutrient, index) => (
        <div key={index} className="flex justify-between flex-col lg:flex-row print:flex-row items-center py-2 px-4">
          <div className="text-center">
            <span className="font-[500]">{nutrient.name}</span>
            <span className="text-sm text-muted-foreground font-[300]"> ({nutrient.unit})</span>
          </div>
          <span className="bg-orange-500 min-w-[65px] px-3 font-[600] text-white text-center rounded-full">{Math.round(nutrient.amount) * useContext(NutritionContext)}</span>
        </div>
      ))
    }
  </div>
)
  


export default Nutrition