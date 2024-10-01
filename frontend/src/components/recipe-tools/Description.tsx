import { type RequiredSingleField } from "@/util/types/form"
import { Separator } from "@/components/ui/separator"
import Field from "./Field"
import Error from "./Error"
import { type Recipe } from "@/util/types/recipe"

const descriptionPlaceholder = 
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh."

const Description: React.FC<Required<RequiredSingleField<Recipe>>> = ({ className, name, register, error }) => {
  return (
    <Field className={className}>
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
        className="min-h-[100px] resize-y leading-normal box-border flex-1 flex rounded-md"
      />
      { 
        error.description &&
        <Error>
          {error.description.message}
        </Error> 
      }
    </Field>
  )
}

export default Description