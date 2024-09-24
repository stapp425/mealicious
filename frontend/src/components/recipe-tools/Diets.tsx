import { type FieldArray } from "@/types/form"
import Field from "./Field";
import { Input } from "../ui/input"
import { useInputChange } from "@/util/hooks"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useWatch } from "react-hook-form"
import { type Recipe } from "@/types/recipe";

const Diets: React.FC<FieldArray<Recipe>> = ({ className, control, setValue }) => {
  const { input, handleChange } = useInputChange<{[key: string]: string}>({ diet: "" })
  
  const diets = useWatch({
    control,
    name: "diets"
  })

  function addDiet(diet: string) {
    if(diets && diet)
      setValue("diets", [...diets, input.diet])
  }

  return (
    <Field className={className}>
      <h1 className="font-bold text-2xl">Diets</h1>
      <div className="flex-1">
        <div className="relative flex justify-between gap-3 mb-3">
          <Input
            type="text"
            name="diet"
            value={input.diet}
            onChange={handleChange}
            placeholder="Diet..."
            autoComplete="off"
            className="text-lg py-5"
          />
          <button
            type="button" 
            onClick={() => addDiet(input.diet)}
            className="right-1.5 bg-orange-500 hover:bg-orange-700 text-white font-[600] px-6 rounded-md transition-colors"
          >
            Add
          </button>
        </div>
        {
          diets && diets.length > 0 &&
            <ScrollArea>
              <div className="flex flex-wrap gap-x-1 gap-y-2">
                { 
                  diets.map((diet: string, index: number) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setValue("diets", [...diets.filter(d => d !== diet)])}
                      className="bg-orange-500 text-white text-xs font-[600] min-w-[50px] hover:bg-red-500 hover:text-white px-3 py-1 rounded-full transition-colors"
                    >
                      {diet}
                    </button>
                  ))
                }
              </div>
              <ScrollBar/>
            </ScrollArea>
        }
      </div>
      <p className="font-[600] text-muted-foreground">
        Add some diets to your recipe here. <br/>
        <i className="text-xs text-slate-300">Examples include vegetarian, paleolithic, etc...</i>
      </p>
    </Field>
  )
}

export default Diets