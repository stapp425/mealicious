import { type Recipe } from "@/util/types/recipe"
import { type ReactHookFormTypes } from "@/util/types/form"
import Field from "../theme/Field"
import Error from "../theme/Error"
import { Input } from "../ui/input"

type TitleProps = 
  Pick<ReactHookFormTypes<Recipe>, "name" | "register" | "error"> & 
  React.HTMLAttributes<HTMLDivElement>

const Title: React.FC<TitleProps> = ({ className, name, register, error, ...props }) => (
  <Field {...props} className={className}>
    <Input
      {
        ...register(name, {
          required: "A title is required before submitting."
        }) 
      }
      spellCheck={false}
      placeholder="Title"
      className="border-none p-0 focus:p-4 h-[50px] font-bold text-3xl rounded-md"
    />
    <p className="font-[600] text-muted-foreground mt-3">Add a title to your recipe here.</p>
    { 
      error.title &&
      <Error.Label>
        {error.title.message}
      </Error.Label> 
    }
  </Field>
)

export default Title