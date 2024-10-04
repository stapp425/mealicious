import { type Recipe } from "@/util/types/recipe"
import { type ReactHookFormTypes } from "@/util/types/form"
import { Separator } from "@/components/ui/separator"
import Field from "./Field"
import Error from "../theme/Error"

const descriptionPlaceholder = 
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh."

type DescriptionProps = 
  Pick<ReactHookFormTypes<Recipe>, "name" | "register" | "error"> &
  React.HTMLAttributes<HTMLDivElement>

const Description: React.FC<DescriptionProps> = ({ className, name, register, error, ...props }) => {
  return (
    <Field {...props} className={className}>
      <div className="flex justify-between gap-3">
        <h1 className="text-2xl font-bold after:content-['*'] after:text-red-500">Description</h1>
      </div>
      <p className="text-muted-foreground font-[600]">Add basic information about your recipe here.</p>
      <Separator className="my-1"/>
      <textarea
        { 
          ...register(name, {
            required: "A description is required."
          }) 
        }
        spellCheck={false}
        placeholder={descriptionPlaceholder}
        autoComplete="off"
        className="min-h-[100px] leading-normal box-border flex-1 flex rounded-md"
      />
      { 
        error.description &&
        <Error.Label>
          {error.description.message}
        </Error.Label> 
      }
    </Field>
  )
}

export default Description