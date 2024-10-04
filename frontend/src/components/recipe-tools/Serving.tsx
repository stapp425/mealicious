import { Input } from "@/components/ui/input"
import { ReactHookFormTypes } from "@/util/types/form"
import { type Recipe } from "@/util/types/recipe"
import { cn } from "@/lib/utils"

type ServingProps = Pick<ReactHookFormTypes<Recipe>, "register"> & React.HTMLAttributes<HTMLDivElement>

const Serving: React.FC<ServingProps> = ({ className, register }) => (
  <div className={cn("flex justify-between gap-2 items-center", className)}>
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
)
export default Serving