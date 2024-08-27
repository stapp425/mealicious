import { type FieldArray } from "@/types/form"
import { type Recipe } from "@/types/recipe"
import { useInputChange } from "@/util/hooks"
import { useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Field from "./Field"

const DishTypes: React.FC<FieldArray<Recipe>> = ({ className, control, setValue }) => {
  const { input, handleChange } = useInputChange<{[key: string]: string}>({ dishType: "" })
  
  const dishTypes = useWatch({
    control,
    name: "dishTypes"
  })
  
  return (
    <Field className={className}>
      <h1 className="font-bold text-2xl">Dish Types</h1>
      <div className="flex-1">
        <div className="relative flex justify-between gap-3 mb-3">
          <Input
            type="text"
            name="dishType"
            value={input.dishType}
            onChange={handleChange}
            placeholder="Dish Type..."
            autoComplete="off"
            className="text-lg py-5"
          />
          <button
            type="button" 
            onClick={() => {dishTypes && setValue("dishTypes", [...dishTypes, input.dishType])}}
            className="right-1.5 bg-orange-500 hover:bg-orange-700 text-white font-[600] px-6 rounded-md transition-colors"
          >
            Add
          </button>
        </div>
        {
          dishTypes && dishTypes.length > 0 &&
            <ScrollArea>
              <div className="grid grid-cols-2 gap-3">
                { 
                  dishTypes.map((dish: string, index: number) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setValue("dishTypes", [...dishTypes.filter(d => d !== dish)])}
                      className="bg-orange-500 text-white font-[600] hover:bg-red-500 hover:text-white p-2 rounded-md odd:last:col-span-2 transition-colors"
                    >
                      {dish}
                    </button>
                  ))
                }
              </div>
              <ScrollBar/>
            </ScrollArea>
        }
      </div>
      <p className="font-[600] text-muted-foreground mt-2">
        Add some dish types to your recipe here. <br/>
        <i className="text-xs text-slate-300 font-[600]">Examples include breakfast, lunch, dinner, main course, side, etc...</i>
      </p>
    </Field>
  )
}

export default DishTypes