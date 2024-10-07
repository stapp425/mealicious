import { type ReactHookFormTypes } from "@/util/types/form"
import { type Meal } from "@/util/types/meal"
import { cn } from "@/lib/utils"

type DescriptionProps = Pick<ReactHookFormTypes<Meal>, "register"> & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Description: React.FC<DescriptionProps> = ({ className, register, ...props }) => (
  <textarea 
    {...register("description")}
    placeholder="Enter a brief description here. (Optional)"
    className={cn("font-[600] text-muted-foreground h-8 resize-auto", className)}
    autoComplete="off"
    spellCheck={false}
    {...props}
  />
)

export default Description