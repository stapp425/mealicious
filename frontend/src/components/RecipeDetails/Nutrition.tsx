import { forwardRef, useState } from "react"
import { type Nutrition } from "@/types/recipe"
import { Minus, Plus } from "lucide-react"
import Tip from "./Tip"

type Props = {
  className?: string
  servingSize: {
    amount: number
    unit: string
  }
  nutrition: Nutrition[]
}

const Nutrition = forwardRef<HTMLDivElement, Props>(({ className, servingSize, nutrition }, ref) => {
  const [count, setCount] = useState<number>(1)
  
  function increment() {
    setCount(c => c + 1)
  }

  function decrement() {
    count > 1 && setCount(c => c - 1)
  }
  
  return (
    <div ref={ref} className={className}>
      <div className="flex items-end gap-2 mb-2 text-slate-600">
        <h1 className="font-bold text-black text-3xl leading-none">Nutrition</h1>
        <Tip>
          Contains all nutrients contributing to one's daily needs, 
          including macronutrients such as calories, carbohydrates, and fats.
        </Tip>
      </div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg">
          <b>Serving Size</b>: {servingSize.amount} {servingSize.unit}
        </h1>
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
      <div className="grid grid-cols-2 gap-4 border border-slate-400 p-4 rounded-lg">
        {
          nutrition.map((nutrient, index) => (
            <div key={index} className="flex justify-between odd:last:w-full">
              <div>
                <span className="font-[500]">{nutrient.name}</span>
                <span className="text-sm text-muted-foreground font-[300]"> ({nutrient.unit})</span>
              </div>
              <span className="bg-orange-500 min-w-[65px] px-3 font-[600] text-white text-center rounded-full">{Math.round(nutrient.amount) * count}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
})

export default Nutrition