import { Input } from "@/components/ui/input"
import { type RequiredSingleField } from "@/types/form"
import { type Recipe } from "@/types/recipe"
import { cn } from "@/lib/utils"
import Error from "./Error"

const Serving: React.FC<RequiredSingleField<Recipe>> = ({ className, register, error }) => {
  return (
    <>
    <div className={cn("flex justify-between gap-2 items-center border border-slate-400 rounded-md", className)}>
      <h1 className="font-[600] my-2">Serving Size:</h1>
      <Input
        { 
          ...register("servingSize.amount", {
            required: "A serving size amount is required.",
            min: 1
          })
        } 
        type="number"
        className="max-w-[75px]"
      />
      <Input
        { 
          ...register("servingSize.unit", {
            required: "A serving size unit is required."
          })
        }
        type="text"
        className="flex-1"
      />
    </div>
    {
      error.servingSize?.amount &&
        <Error>
          {error.servingSize.amount.message}
        </Error>
    }
    {
      error.servingSize?.unit &&
        <Error>
          {error.servingSize.unit.message}
        </Error>
    }
    </>
  )
}

export default Serving