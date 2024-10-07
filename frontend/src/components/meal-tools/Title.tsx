import { type ReactHookFormTypes } from "@/util/types/form"
import { type Meal } from "@/util/types/meal"
import Error from "../theme/Error"

type TitleProps = Pick<ReactHookFormTypes<Meal>, "register" | "error"> & React.HTMLAttributes<HTMLDivElement>

const Title: React.FC<TitleProps> = ({ className, register, error, ...props }) => (
  <div className={className} {...props}>
    <textarea
      {
        ...register("title", {
          required: "A title is required."
        })
      }
      placeholder="Meal Title"
      maxLength={25}
      spellCheck={false}
      className="w-full max-w-[500px] h-12 font-bold text-4xl resize-none"
    />
    <p className="font-[600] text-slate-600">Enter a title for this meal here.</p>
    {
      error.title &&
      <Error>{error.title.message}</Error>
    }
  </div>
)

export default Title