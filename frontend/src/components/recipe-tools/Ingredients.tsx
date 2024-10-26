import { useEffect } from "react"
import { type Recipe, type Ingredient } from "@/util/types/recipe"
import { type ReactHookFormTypes } from "@/util/types/form"
import { useWatch } from "react-hook-form"
import { useInputChange } from "@/util/hooks"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import Field from "../theme/Field"
import Error from "../theme/Error"
import { cn } from "@/lib/utils"

type IngredientsProps = 
  Pick<ReactHookFormTypes<Recipe>, "control" | "setValue" | "error" | "setError" | "clearErrors"> & 
  React.HTMLAttributes<HTMLDivElement>

const Ingredients: React.FC<IngredientsProps> = ({ className, control, setValue, error, setError, clearErrors }) => {
  const { input, setInput, handleChange } = useInputChange<Ingredient>({
    name: "",
    amount: 1,
    unit: ""
  })
  
  const ingredients = useWatch({
    control,
    name: "ingredients"
  })
  
  useEffect(() => {
    if(ingredients.length === 0) {
      setError("ingredients", {
        type: "missing",
        message: "Ingredients must be included for a recipe."
      })
    } else
      clearErrors("ingredients")
  }, [ingredients])

  return (
    <Field className={cn("h-fit", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold after:content-['*'] after:text-red-500">Ingredients</h1>
          <p className="font-[600] text-muted-foreground">Add ingredients to your recipe here.</p>
        </div>
      </div>
      <div className="flex justify-between gap-3">
        <Input
          type="number"
          name="amount"
          min={1}
          value={input.amount}
          placeholder="Amount"
          autoComplete="off"
          onChange={handleChange}
          className="w-1/4"
        />
        <Select onValueChange={(value: string) => setInput((i: Ingredient) => ({ ...i, unit: value }))}>
          <SelectTrigger className="w-1/4">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Weight</SelectLabel>
              <SelectItem value="ml">ml</SelectItem>
              <SelectItem value="l">l</SelectItem>
              <SelectItem value="mg">mg</SelectItem>
              <SelectItem value="g">g</SelectItem>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="lb">lb</SelectItem>
              <SelectItem value="oz">oz</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Dry</SelectLabel>
              <SelectItem value="tsp">tsp</SelectItem>
              <SelectItem value="tbsp">tbsp</SelectItem>
              <SelectItem value="cup">cup</SelectItem>
              <SelectItem value="pc">pc</SelectItem>
            </SelectGroup>
            <SelectGroup>             
              <SelectLabel>Liquid</SelectLabel>
              <SelectItem value="fl oz">fl oz</SelectItem>
              <SelectItem value="pt">pt</SelectItem>
              <SelectItem value="qt">qt</SelectItem>
              <SelectItem value="gal">gal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          name="name"
          value={input.name}
          placeholder="Name"
          autoComplete="off"
          onChange={handleChange}
          className="flex-1"
        />
        <button
          type="button"
          disabled={!input.name || !input.unit}
          onClick={() => (input.name && input.amount > 0 && input.unit) && setValue("ingredients", [...ingredients, input])}
          className="aspect-square size-10 flex justify-center items-center bg-orange-500 disabled:cursor-not-allowed disabled:bg-orange-300 text-white py-1 rounded-md"
        >
          <Plus size={18}/>
        </button>
      </div>
      {
        ingredients.length > 0 &&
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 my-2">
            { 
              ingredients.map((ingredient, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setValue("ingredients", [...ingredients.filter(i => i !== ingredient)])}
                  className="text-left overflow-hidden group space-y-2 items-center border border-slate-400 p-3 rounded-md hover:border-red-500 hover:bg-red-500 transition-colors odd:last:col-span-2"
                >
                  <h1 className="font-bold text-xl group-hover:text-white">{ingredient.amount} {ingredient.unit}</h1>
                  <span className="w-full line-clamp-1 text-xl font-[600] text-muted-foreground group-hover:text-white">{ingredient.name}</span>
                </button>
              ))
            }
          </div>
          
        </div>
      }
      { 
        error.ingredients &&
        <Error.Label>
          {error.ingredients.message}
        </Error.Label> 
      }
    </Field>
  )
}

export default Ingredients