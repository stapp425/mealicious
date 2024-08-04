import { cn } from "@/lib/utils"
import { Meal } from "@/types/meal"
import { FieldErrors } from "react-hook-form"
import Error from "./Error"

type Props<T extends {[key: string]: unknown}> = {
  className?: string
  errors: FieldErrors<T>
}

const Errors: React.FC<Props<Meal>> = ({ className, errors }) => {
  return (
    <>
    {
      errors &&
        <div className={cn("size-fit flex flex-col gap-2", className)}>
          { errors.title && <Error>{errors.title.message}</Error> }
          { errors.time && <Error>{errors.time.message}</Error> }
          { errors.contents && <Error>{errors.contents.message}</Error> }
        </div>
    }
    </>
  )
}

export default Errors