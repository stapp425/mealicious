import Field from "./Field"
import Error from "./Error"
import { type RequiredSingleField } from "@/types/form"
import { type Recipe } from "@/types/recipe"

const Title: React.FC<Required<RequiredSingleField<Recipe>>> = ({ className, name, register, error }) => {
  return (
    <Field className={className}>
      <div className="flex justify-between items-start gap-2 ">
        <textarea
          { 
            ...register(name, {
              required: "A title is required before submitting."
            }) 
          }
          spellCheck={false}
          placeholder="Title"
          className="min-h-[50px] h-[max-content] resize-y flex-1 font-bold text-3xl rounded-md"
        />
      </div>
      <p className="font-[600] text-muted-foreground mt-3">Add a title to your recipe here.</p>
      { 
        error.title &&
        <Error>
          {error.title.message}
        </Error> 
      }
    </Field>
  )
}

export default Title