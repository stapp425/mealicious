import { forwardRef } from "react"
import { type Ingredient } from "@/util/types/recipe"
import Tip from "./Tip"

type Props = {
  className?: string
  ingredients: Ingredient[]
}

const Ingredients = forwardRef<HTMLDivElement, Props>(({ className, ingredients }, ref) => {
  return (
    <div ref={ref} className={className}>
      <div className="flex items-end gap-2 mb-4 text-slate-600">
        <h1 className="font-bold text-black text-3xl leading-none">Ingredients</h1>
        <Tip>
          The list of ingredients <i>required</i> to prepare this recipe.
          Exact measurements are provided for the best results.
        </Tip>
      </div>
      <div className="flex flex-wrap justify-between gap-3">
        {
          ingredients.map((ingredient, index) => (
            <div key={index} className="overflow-hidden flex-1 min-w-[200px] h-[75px] text-nowrap border border-slate-400 py-2 px-3 rounded-md">
              <h1 className="text-slate-600 font-[500]">
                <b className="font-bold text-black text-lg">{ingredient.amount}</b> {ingredient.unit}
              </h1>
              <span>{ingredient.name}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
})

export default Ingredients