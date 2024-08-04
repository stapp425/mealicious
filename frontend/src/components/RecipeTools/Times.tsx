import { Clock, Microwave, Clipboard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { type RequiredSingleField } from "@/types/form"
import { type Recipe } from "@/types/recipe"
import Field from "./Field"
import Error from "./Error"

const Times: React.FC<RequiredSingleField<Recipe>> = ({ className, error, register }) => {
  return (
    <Field className={className}>
      <h1 className="font-bold text-2xl after:content-['*'] after:text-red-500">Times</h1>
      <p className="text-muted-foreground font-[600]">
        Add preparation times for this recipe.
      </p>
      <div className="flex flex-col xl:flex-row flex-wrap justify-between gap-3 xl:gap-5 mt-3">        
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
      {
        error.times?.prepTime &&
          <Error>
            {error.times.prepTime.message}
          </Error>
      }
      {
        error.times?.cookTime &&
          <Error>
            {error.times.cookTime.message}
          </Error>
      }
      {
        error.times?.readyTime &&
          <Error>
            {error.times.readyTime.message}
          </Error>
      }
    </Field>
  )
}

export default Times