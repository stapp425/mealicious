import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Minus, Plus, Search } from "lucide-react"

enum Diet {
  ANY = "any",
  GLUTEN_FREE = "gluten-free",
  KETO = "ketogenic",
  VEGETARIAN = "vegetarian",
  VEGAN = "vegan",
  OMNIVORE = "paleo"
}

enum Type {
  ANY = "any",
  MAIN = "main course",
  SIDE = "side dish",
  APPETIZER = "appetizer",
  DESSERT = "dessert",
  DRINK = "drink",
  BREAKFAST = "breakfast"
}

type Query = {
  query: string,
  cuisine?: string,
  diet?: Diet,
  type?: Type,
  minCalories?: number,
  maxCalories?: number,
  minCarbs?: number,
  maxCarbs?: number,
  minProtein?: number,
  maxProtein?: number,
  minFat?: number,
  maxFat?: number,
  minCholesterol?: number,
  maxCholesterol?: number,
  minSodium?: number,
  maxSodium?: number,
  minSugar?: number,
  maxSugar?: number
}

const defaultQueryValues:Query = {
  query: "",
  cuisine: "",
  diet: Diet.ANY,
  type: Type.ANY,
  minCalories: 100,
  maxCalories: 1000,
  minProtein: 0,
  maxProtein: 20,
  minCarbs: 0,
  maxCarbs: 100,
  minFat: 0,
  maxFat: 100,
  minCholesterol: 0,
  maxCholesterol: 250,
  minSodium: 0,
  maxSodium: 2000,
  minSugar: 0,
  maxSugar: 100
}

export default function SavedMealsSearchBar() {
  const { toast } = useToast()
  const [userQuery, setUserQuery] = useState<Query>(defaultQueryValues)
  const [isOptionalQueriesOpen, setIsOptionalQueriesOpen] = useState<boolean>(false)

  function handleInputChange(event:React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked, type } = event.target
    setUserQuery(u => ({
      ...u,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  function handleSubmit() {
    const formattedQuery:Partial<Query> = { ...userQuery }
    if(!formattedQuery.query || !formattedQuery.query.match(/^[A-Za-z]+$/))
      return toast({
        title: "Uh Oh!",
        description: "Title is missing or contains non-letters.",
        variant: "destructive"
      })
      
    console.log(userQuery)
  }
  
  return (
    <>
      <Popover modal={true} onOpenChange={bool => setIsOptionalQueriesOpen(!bool)}>
        <PopoverTrigger>
          <Button className="flex bg-slate-200 justify-center text-lg gap-3 items-center rounded-full w-40 px-0 py-3 hover:bg-slate-300">
            <span className="text-black">Search</span>
            <Search className="rounded-full bg-slate-600 p-[6px] h-7 w-7"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-3 p-5 w-[800px]">
          <div>
            <h1 className="text-lg"><b>Queries</b></h1>
            <p className="text-slate-500">Personalize your search!</p>
          </div>
          <Separator/>
          <div className="flex flex-row justify-between items-center gap-x-3 w-full">
            <div className="flex-1 space-y-1">
              <Label htmlFor="title">
                Title<b className="text-red-700">*</b>
              </Label>
              <Input
                type="text"
                id="title"
                placeholder="Title"
                name="query"
                value={userQuery.query}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label htmlFor="cuisine">
                Cuisine
              </Label>
              <Input
                type="text"
                id="cuisine"
                placeholder="Cuisine"
                name="cuisine"
                value={userQuery.cuisine}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between items-center gap-3">
            <Select onValueChange={ string => setUserQuery(u => ({ ...u, diet: string as Diet})) }>
              <SelectTrigger>
                <SelectValue placeholder="Select a Diet..."/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Diet.ANY}>Any</SelectItem>
                <SelectItem value={Diet.GLUTEN_FREE}>Gluten-Free</SelectItem>
                <SelectItem value={Diet.KETO}>Ketogenic</SelectItem>
                <SelectItem value={Diet.VEGETARIAN}>Vegetarian</SelectItem>
                <SelectItem value={Diet.VEGAN}>Vegan</SelectItem>
                <SelectItem value={Diet.OMNIVORE}>Omnivore</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={ string => setUserQuery(u => ({ ...u, type: string as Type})) }>
              <SelectTrigger>
                <SelectValue placeholder="Select a Dish Type..."/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Type.ANY}>Any</SelectItem>
                <SelectItem value={Type.MAIN}>Main Course</SelectItem>
                <SelectItem value={Type.SIDE}>Side Dish</SelectItem>
                <SelectItem value={Type.APPETIZER}>Appetizer</SelectItem>
                <SelectItem value={Type.DESSERT}>Dessert</SelectItem>
                <SelectItem value={Type.DRINK}>Drink</SelectItem>
                <SelectItem value={Type.BREAKFAST}>Breakfast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="calories">
              <p>Calories Range ({userQuery.minCalories} - {userQuery.maxCalories})</p>
            </Label>
            <Slider
              defaultValue={[userQuery.minCalories as number, userQuery.maxCalories as number]}
              id="calories"
              min={100}
              max={1500}
              step={25}
              minStepsBetweenThumbs={4}
              onValueChange={value => setUserQuery(u => ({ ...u, minCalories: value[0], maxCalories: value[1] }))}
            />
            <div className="flex justify-between items-center text-sm">
              <span>100</span>
              <span>1500</span>
            </div>
          </div>
          <Collapsible onOpenChange={setIsOptionalQueriesOpen}>
            <div className="flex w-auto gap-3 items-center">
              <CollapsibleTrigger>
                <Button className="p-2 h-8 w-8 bg-gray-500">
                  {
                    isOptionalQueriesOpen
                      ? <Minus color="white"/>
                      : <Plus color="white"/>
                  }
                </Button>
              </CollapsibleTrigger>
              <span className="font-bold">More Queries</span>
            </div>
            <CollapsibleContent className="mt-3">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between gap-5 min-w-full">
                  <div className="flex flex-1 flex-col gap-y-4">
                    <Label htmlFor="carbs" className="flex flex-col gap-1">
                      <p>Carbohydrates Range ({userQuery.minCarbs} - {userQuery.maxCarbs})</p>
                      <p className="text-slate-500">In grams (g)</p>
                    </Label>
                    <Slider
                      defaultValue={[userQuery.minCarbs as number, userQuery.maxCarbs as number]}
                      id="carbs"
                      min={0}
                      max={100}
                      step={1}
                      minStepsBetweenThumbs={5}
                      onValueChange={value => setUserQuery(u => ({ ...u, minCarbs: value[0], maxCarbs: value[1] }))}
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-4">
                    <Label htmlFor="protein" className="flex flex-col gap-1">
                      <p>Proteins Range ({userQuery.minProtein} - {userQuery.maxProtein})</p>
                      <p className="text-slate-500">In grams (g)</p>
                    </Label>
                    <Slider
                      defaultValue={[userQuery.minProtein as number, userQuery.maxProtein as number]}
                      id="protein"
                      min={0}
                      max={100}
                      step={1}
                      minStepsBetweenThumbs={5}
                      onValueChange={value => setUserQuery(u => ({ ...u, minProtein: value[0], maxProtein: value[1] }))}
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-5 min-w-full">
                  <div className="flex flex-1 flex-col gap-y-4">
                    <Label htmlFor="fat" className="flex flex-col gap-1">
                      <p>Fats Range ({userQuery.minFat} - {userQuery.maxFat})</p>
                      <p className="text-slate-500">In grams (g)</p>
                    </Label>
                    <Slider
                      defaultValue={[userQuery.minFat as number, userQuery.maxFat as number]}
                      id="fat"
                      min={0}
                      max={100}
                      step={1}
                      minStepsBetweenThumbs={5}
                      onValueChange={value => setUserQuery(u => ({ ...u, minFat: value[0], maxFat: value[1] }))}
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-4">
                    <Label htmlFor="cholesterol" className="flex flex-col gap-1">
                      <p>Cholesterol Range ({userQuery.minCholesterol} - {userQuery.maxCholesterol})</p>
                      <p className="text-slate-500">In milligrams (mg)</p>
                    </Label>
                    <Slider
                      defaultValue={[userQuery.minCholesterol as number, userQuery.maxCholesterol as number]}
                      id="cholesterol"
                      min={0}
                      max={2000}
                      step={25}
                      minStepsBetweenThumbs={8}
                      onValueChange={value => setUserQuery(u => ({ ...u, minCholesterol: value[0], maxCholesterol: value[1] }))}
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span>0</span>
                      <span>2000</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-5 min-w-full">
                  <div className="flex flex-1 flex-col gap-y-4">
                    <Label htmlFor="sodium" className="flex flex-col gap-1">
                      <p>Sodium Range ({userQuery.minSodium} - {userQuery.maxSodium})</p>
                      <p className="text-slate-500">In milligrams (mg)</p>
                    </Label>
                    <Slider
                      defaultValue={[userQuery.minSodium as number, userQuery.maxSodium as number]}
                      id="sodium"
                      min={0}
                      max={2000}
                      step={25}
                      minStepsBetweenThumbs={8}
                      onValueChange={value => setUserQuery(u => ({ ...u, minSodium: value[0], maxSodium: value[1] }))}
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span>0</span>
                      <span>2000</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-4">
                    <Label htmlFor="sugar" className="flex flex-col gap-1">
                      <p>Sugars Range ({userQuery.minSugar} - {userQuery.maxSugar})</p>
                      <p className="text-slate-500">In grams (g)</p>
                    </Label>
                    <Slider
                      defaultValue={[userQuery.minSugar as number, userQuery.maxSugar as number]}
                      id="sugar"
                      min={0}
                      max={100}
                      step={1}
                      minStepsBetweenThumbs={5}
                      onValueChange={value => setUserQuery(u => ({ ...u, minSugar: value[0], maxSugar: value[1] }))}
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>
            
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Button onClick={handleSubmit}>Search</Button>
        </PopoverContent>
      </Popover>
    </>
  )
}