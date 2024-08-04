import { type Obj } from "@/types/app"
import { type Meal } from "@/types/meal"
import { type UseFormRegister } from "react-hook-form"
import { cn } from "@/lib/utils"

type Props<T extends Obj> = {
  className?: string
  register: UseFormRegister<T>
}

const Description: React.FC<Props<Meal>> = ({ className, register }) => (
  <textarea 
    {...register("description")}
    placeholder="Enter a brief description here. (Optional)"
    className={cn("font-[600] text-muted-foreground h-8 resize-none", className)}
    autoComplete="off"
    spellCheck={false}
  />
)

export default Description