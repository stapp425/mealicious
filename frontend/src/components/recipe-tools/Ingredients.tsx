import { useEffect } from "react"
import { type RequiredFieldArray } from "@/types/form"
import { useWatch } from "react-hook-form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Recipe, type Ingredient } from "@/types/recipe"
import { Plus } from "lucide-react"
import Field from "./Field"
import Error from "./Error"
import { useInputChange } from "@/util/hooks"

const Ingredients: React.FC<RequiredFieldArray<Recipe>> = ({ className, control, setValue, error, setError, clearErrors }) => {
  const { input, isEditActive, setIsEditActive, setInput, handleChange } = useInputChange<Ingredient>({
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
  
  // "row-start-6 col-start-1 xl:row-start-4"

  return (
    <Field className={className}>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold after:content-['*'] after:text-red-500">Ingredients</h1>
          <p className="font-[600] text-muted-foreground">Add ingredients to your recipe here.</p>
        </div>
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
        ingredients.length > 0 &&
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 my-2">
            { 
              ingredients.map((ingredient: Ingredient, index: number) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setValue("ingredients", [...ingredients.filter(i => i !== ingredient)])}
                  className="group flex justify-between gap-2 items-center border border-slate-400 p-3 rounded-md hover:bg-red-500 transition-colors odd:last:col-span-2"
                >
                  <h1 className="font-bold text-xl group-hover:text-white">{ingredient.amount} {ingredient.unit}</h1>
                  <span className="text-xl font-[600] text-muted-foreground group-hover:text-white">{ingredient.name}</span>
                </button>
              ))
            }
          </div>
          
        </div>
      }
      {
        isEditActive
          ? <div className="h-fit flex justify-between gap-3">
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
                  <SelectValue placeholder="unit" />
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
                onClick={() => (input.name && input.amount > 0 && input.unit) && setValue("ingredients", [...ingredients, input])}
                className="aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
              >
                <Plus size={18}/>
              </button>
            </div>
          : <button
              type="button" 
              onClick={() => setIsEditActive(true)}
              className="group-focus:hidden w-full h-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
            >
              <Plus size={18}/>
            </button>
      }
      { 
        error.ingredients &&
        <Error>
          {error.ingredients.message}
        </Error> 
      }
    </Field>
  )
}

export default Ingredients