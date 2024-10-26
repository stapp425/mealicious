import { type Nutrition, type Recipe } from "@/util/types/recipe"
import { type ReactHookFormTypes } from "@/util/types/form"
import { useInputChange } from "@/util/hooks"
import { useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useEffect } from "react"
import Error from "../theme/Error"
import Field from "../theme/Field"
import Serving from "./Serving"

type NutritionProps = 
  Pick<ReactHookFormTypes<Recipe>, "control" | "setValue" | "error" | "setError" | "clearErrors" | "register"> &
  React.HTMLAttributes<HTMLDivElement>

const Nutrition: React.FC<NutritionProps> = ({ children, control, register, setValue, error, setError, clearErrors, ...props }) => {
  const { input, setInput, handleChange } = useInputChange<Nutrition>({
    name: "",
    amount: 1,
    unit: ""
  })

  const nutrition = useWatch({
    control,
    name: "nutrition"
  })

  function submitNutrition() {
    if(input.name && input.unit) {
      setValue("nutrition", [...nutrition, input])
      setInput({
        name: "",
        amount: 1,
        unit: ""
      })
    }
  }

  useEffect(() => {
    if(nutrition.length === 0) {
      setError("nutrition", {
        type: "missing",
        message: "Nutrition must be included."
      })
    } else
      clearErrors("nutrition")
  }, [nutrition])
  
  return (
    <Field className="flex flex-col justify-between" {...props}>
      <h1 className="font-bold text-2xl after:content-['*'] after:text-red-500">Nutrition</h1>
      <div className="flex-1 border border-slate-400 flex flex-col gap-2 p-2 rounded-md">
        <Serving register={register}/>
        {
          nutrition.map((nutrient, index) => (
            <button 
              type="button"
              key={index}
              onClick={() => setValue("nutrition", [...nutrition.filter((n: Nutrition) => n !== nutrient)])}
              className="group w-full flex justify-between items-center px-1 py-3 hover:p-3 hover:bg-red-200 rounded-md transition-all"
            >
              <h1 className="text-muted-foreground font-[600]">
                <b className="font-[700] text-black text-xl">{nutrient.name}</b> ({nutrient.unit})
              </h1>
              <div className="min-w-[75px] font-bold bg-orange-500 group-hover:bg-red-500 text-white px-2 rounded-full">
                {nutrient.amount}
              </div>
            </button>
          ))
        }
        <div className="grid grid-rows-2 grid-cols-[repeat(2,_1fr)_max-content] gap-2">
          <Input
            type="text"
            name="name"
            value={input.name}
            placeholder="Name"
            autoComplete="off"
            onChange={handleChange}
            className="row-start-1 col-start-1 col-span-3"
          />
          <Input
            type="number"
            name="amount"
            min={1}
            value={input.amount}
            placeholder="Amount"
            autoComplete="off"
            onChange={handleChange}
            className="row-start-2 col-start-1"
          />
          <Select value={input.unit} onValueChange={value => setInput(n => ({ ...n, unit: value }))}>
            <SelectTrigger className="row-start-2 col-start-2">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kcal">kcal</SelectItem>
              <SelectItem value="g">g</SelectItem>
              <SelectItem value="mg">mg</SelectItem>
              <SelectItem value="μg">μg</SelectItem>
              <SelectItem value="%">%</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="button"
            disabled={!input.unit}
            onClick={submitNutrition}
            className="row-start-2 col-start-3 aspect-square size-10 flex justify-center items-center bg-orange-500 disabled:cursor-not-allowed disabled:bg-orange-300 text-white py-1 rounded-md"
          >
            <Plus size={18}/>
          </button>
        </div>
      </div>
      {
        error.nutrition &&
        <Error.Label className="w-full text-black font-normal text-base">
          {error.nutrition.message}
        </Error.Label>
      }
      {
        error.servingSize?.amount &&
        <Error.Label>
          {error.servingSize.amount.message}
        </Error.Label>
      }
      {
        error.servingSize?.unit &&
        <Error.Label>
          {error.servingSize.unit.message}
        </Error.Label>
      } 
    </Field>
  )
}

export default Nutrition