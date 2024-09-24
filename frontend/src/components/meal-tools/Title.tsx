import { type Obj } from "@/types/app"
import { type Meal } from "@/types/meal"
import { type UseFormRegister } from "react-hook-form"

type Props<T extends Obj> = {
  className?: string
  register: UseFormRegister<T>
}

const Title: React.FC<Props<Meal>> = ({ className, register }) => {
  return (
    <div className={className}>
      <div className="flex gap-2">
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
      </div>
      <p className="font-[600] text-slate-600">Enter a title for this meal here.</p>
    </div>
  )
}

export default Title