import { type ReactHookFormTypes } from "@/util/types/form"
import { cn } from "@/lib/utils"
import { Meal } from "@/util/types/meal"
import Error from "../theme/Error"

type ErrorsProps = {
  className?: string
} & Pick<ReactHookFormTypes<Meal>, "error">

const Errors: React.FC<ErrorsProps> = ({ className, error }) => (
  <>
  {
    error &&
    <div className={cn("size-fit flex flex-col gap-2", className)}>
      { error.title && <Error>{error.title.message}</Error> }
      { error.time && <Error>{error.time.message}</Error> }
      { error.contents && <Error>{error.contents.message}</Error> }
    </div>
  }
  </>
)

export default Errors