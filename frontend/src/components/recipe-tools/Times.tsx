import { Clock, Microwave, Clipboard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { type ReactHookFormTypes } from "@/util/types/form"
import { type Recipe } from "@/util/types/recipe"
import Field from "./Field"
import Error from "../theme/Error"

type TimesProps = Pick<ReactHookFormTypes<Recipe>, "error" | "register"> & React.HTMLAttributes<HTMLDivElement>

const Times: React.FC<TimesProps> = ({ className, error, register, ...props }) => {
  return (
    <Field className={className} {...props}>
      <h1 className="font-bold text-2xl after:content-['*'] after:text-red-500">Times</h1>
      <p className="text-muted-foreground font-[600]">
        Add preparation times for this recipe.
      </p>
      <div className="flex flex-col lg:flex-row justify-between gap-3 xl:gap-2 mt-3">        
        <div className="flex-1 bg-orange-500 text-white flex flex-col items-center gap-3 p-4 rounded-md">
          <h1 className="font-bold text-xl">Prep Time</h1>
          <div className="flex items-center gap-2">
            <Clock size={28}/>
            <Input
              { 
                ...register("times.prepTime", {
                  min: {
                    value: 1,
                    message: "Prep time must be provided."
                  }
                }) 
              }
              type="number"
              min={0}
              autoComplete="off"
              className="w-[75px] h-[30px] bg-transparent focus:bg-white focus:text-black"
            />
            <span className="font-[600]">mins</span>
          </div>
        </div>
        <div className="flex-1 bg-orange-500 text-white flex flex-col items-center gap-3 p-4 rounded-md">
          <h1 className="font-bold text-xl">Cook Time</h1>
          <div className="flex items-center gap-2">
            <Microwave size={28}/>
            <Input
              { 
                ...register("times.cookTime", {
                  min: {
                    value: 1,
                    message: "Cook time must be provided."
                  }
                }) 
              }
              type="number"
              min={0}
              autoComplete="off"
              className="w-[75px] h-[30px] bg-transparent focus:bg-white focus:text-black"
            />
            <span className="font-[600]">mins</span>
          </div>
        </div>
        <div className="flex-1 bg-orange-500 text-white flex flex-col items-center gap-3 p-4 rounded-md">
          <h1 className="font-bold text-xl">Ready Time</h1>
          <div className="flex items-center gap-2">
            <Clipboard size={28}/>
            <Input
              { 
                ...register("times.readyTime", {
                  min: {
                    value: 1,
                    message: "Ready time must be provided."
                  }
                }) 
              }
              type="number"
              min={0}
              autoComplete="off"
              className="w-[75px] h-[30px] bg-transparent focus:bg-white focus:text-black"
            />
            <span className="font-[600]">mins</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-4 gap-y-2 *:flex-1">
        {
          error.times?.prepTime &&
          <Error.Label>
            {error.times.prepTime.message}
          </Error.Label>
        }
        {
          error.times?.cookTime &&
          <Error.Label>
            {error.times.cookTime.message}
          </Error.Label>
        }
        {
          error.times?.readyTime &&
          <Error.Label>
            {error.times.readyTime.message}
          </Error.Label>
        }
      </div>
    </Field>
  )
}

export default Times