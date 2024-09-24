import { type RequiredFieldArray } from "@/util/types/form"
import { type Nutrition, type Recipe } from "@/util/types/recipe"
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
import { Plus, X } from "lucide-react"
import { useEffect } from "react"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Error from "./Error"

interface NutritionProps extends RequiredFieldArray<Recipe> {
  children: React.ReactNode
}

const Nutrition: React.FC<NutritionProps> = ({ children, control, setValue, error, setError, clearErrors }) => {
  const { input, setInput, isEditActive, setIsEditActive, handleChange } = useInputChange<Nutrition>({
    name: "",
    amount: 1,
    unit: ""
  })

  const nutrition = useWatch({
    control,
    name: "nutrition"
  })

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
    <>
    <div className="flex justify-between">
      <h1 className="font-bold text-2xl after:content-['*'] after:text-red-500">Nutrition</h1>
      {
        isEditActive && 
        <button
          type="button"
          onClick={() => setIsEditActive(false)}
          className="text-red-600 hover:text-red-500 transition-colors font-[600]"
        >
          Cancel
        </button>
      }
    </div>
    {
      isEditActive || nutrition.length > 0
        ? <ScrollArea className="flex-1 border border-slate-400 rounded-md">
            <div className="flex flex-col gap-2 p-2">
              {children}
              {
                nutrition.map((nutrient: Nutrition, index: number) => (
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
              {
                isEditActive
                  ? <div className="grid grid-rows-2 grid-cols-[repeat(2,_1fr)_max-content] gap-2">
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
                      <Select onValueChange={(value: string) => setInput(n => ({ ...n, unit: value }))}>
                        <SelectTrigger className="row-start-2 col-start-2">
                          <SelectValue placeholder="unit" />
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
                        onClick={() => (input.name && input.unit) && setValue("nutrition", [ ...nutrition, input ])}
                        className="row-start-2 col-start-3 aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                      >
                        <Plus size={18}/>
                      </button>
                    </div>
                  : <button 
                      type="button"
                      onClick={() => setIsEditActive(true)}
                      className="w-full h-10 flex justify-center items-center text-white bg-orange-500 py-2 rounded-md"
                    >
                      <Plus size={18}/>
                    </button>
              }
            </div>
            <ScrollBar/>
          </ScrollArea>
        : <button
            type="button"
            onClick={() => setIsEditActive(true)}
            className="flex-1 flex flex-col justify-center items-center p-6 bg-slate-200 text-slate-500 rounded-md hover:bg-slate-300 active:bg-slate-400 active:text-slate-700 transition-colors"
          >
            <X size={84}/>
            <h1 className="text-lg font-bold">No Nutrition Found!</h1>
            <span>Click here to add one!</span>
          </button>
    }
    {
      error.nutrition &&
        <Error>
          {error.nutrition.message}
        </Error>
    }
    </>
  )
}

export default Nutrition