import { Clipboard, Clock, Microwave, Pencil, Plus, X } from "lucide-react"
import { useState, useRef, useEffect, useMemo, useContext } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { nanoid } from "nanoid"
import { useFirestoreGet, useFirestoreUpdate, useStorageUpload } from "@/util/hooks"
import { defaultRecipe, Recipe, Serving, Time, type Ingredient, type Nutrition } from "@/types/recipe"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useParams } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { UserContext } from "@/App"
import { CurrentUser } from "@/types/app"
import { useToast } from "@/components/ui/use-toast"

const descriptionPlaceholder = 
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh."

export default function EditRecipe() {
  const { toast } = useToast()
  const user = useContext<CurrentUser>(UserContext)
  const { recipeId } = useParams()
  const { data } = useFirestoreGet<Recipe>("recipes", recipeId as string)
  const [userInput, setUserInput] = useState<Recipe>(defaultRecipe)
  const { updateFirestoreDoc } = useFirestoreUpdate()
  const [image, setImage] = useState<File>()
  const [imageURL, setImageURL] = useState<string>("")
  const [times, setTimes] = useState<Time>(defaultRecipe.times)
  const [servingSize, setServingSize] = useState<Serving>(defaultRecipe.servingSize)
  const [diet, setDiet] = useState<string>("")
  const [dishType, setDishType] = useState<string>("")

  const [nutrition, setNutrition] = useState<Nutrition>({
    name: "",
    amount: 1,
    unit: ""
  })

  const [ingredient, setIngredient] = useState<Ingredient>({
    name: "",
    amount: 1,
    unit: ""
  })

  const [instruction, setInstruction] = useState<string>("")
  const [nutritionEditActive, setNutritionEditActive] = useState<boolean>(true)
  const [ingredientsEditActive, setIngredientsEditActive] = useState<boolean>(false)
  const [instructionsEditActive, setInstructionsEditActive] = useState<boolean>(false)

  const imageDetails = useMemo(() => {
    const name = image?.name
    const parsedName = name?.split(".")
    
    return {
      name: parsedName?.slice(0, parsedName.length - 1).join(""),
      type: parsedName?.[parsedName.length - 1].toUpperCase()
    }
  }, [image])

  const addImageButton = useRef<HTMLInputElement>(null)
  const descriptionInput = useRef<HTMLTextAreaElement>(null)
  const titleInput = useRef<HTMLTextAreaElement>(null)
  const dietInput = useRef<HTMLInputElement>(null)
  const dishInput = useRef<HTMLInputElement>(null)
  const dietButton = useRef<HTMLButtonElement>(null)
  const dishButton = useRef<HTMLButtonElement>(null)
  const nutritionButton = useRef<HTMLButtonElement>(null)
  const instructionInput = useRef<HTMLTextAreaElement>(null)
  const ingredientButton = useRef<HTMLButtonElement>(null)
  const uploadToStorage = useStorageUpload()

  async function submitRecipe() {
    if(data && imageURL) {
      try {
        const img = (image && imageURL !== data.image)
          ? await uploadToStorage(image, `${imageDetails.name}-${nanoid()}`)
          : imageURL

        await updateFirestoreDoc(recipeId as string, { 
          ...userInput,
          image: img,
          times: times, 
          servingSize: servingSize, 
          userId: user?.uid
        })
      } catch (err: any) {
        console.error(err.message)
      }
    }
  }
  
  function handleImageInsert(event: React.ChangeEvent<HTMLInputElement>) {
    const addedImage = event.target.files?.[0]

    // images can't be more than 5MB in size
    if(addedImage && addedImage.size <= 5 * 1024 * 1024) {
      setImage(addedImage)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, updaterFunction: React.Dispatch<React.SetStateAction<any>>) {
    const { name, value } = event.target
    updaterFunction((u: any) => ({ ...u, [name]: value }))
  }

  function handleEnterPress(event: React.KeyboardEvent<HTMLInputElement>, button: React.RefObject<HTMLButtonElement>) {
    event.key === "Enter" && button.current?.click()
  }

  function addInput(prop: keyof Recipe, addedElement: any) {
    userInput[prop] && setUserInput(u => ({ ...u, [prop]: [...(u[prop] as any[]), addedElement] }))
  }

  function removeInput(prop: keyof Recipe, removedElement: any) {
    setUserInput(u => ({ ...u, [prop]: (u[prop] as any[]).filter(element => element !== removedElement) }))
  }

  function enterEditMode(ref: React.RefObject<HTMLElement>) {
    ref.current?.focus()
  }
  
  useEffect(() => {
    populateUserInput()

    async function populateUserInput() {
      if(data) {
        try {
          // const imageFile = await fetchImage(data.image)
          setUserInput(data)
          setImageURL(data.image)
          setTimes(data.times)
          setServingSize(data.servingSize)
        } catch (err: any) {
          console.error(err.message)
        }
      }
    }
  }, [data])

  useEffect(() => {
    image && setImageURL(URL.createObjectURL(image))
    
    return () => { imageURL && URL.revokeObjectURL(imageURL) }
  }, [image])
  
  return (
    <div className="relative min-h-[calc(100vh-150px)] grid grid-cols-[350px_1fr]">
      <div className="overflow-hidden h-[calc(100vh-150px)] sticky top-[150px] flex flex-col justify-between gap-3 p-4 bg-white border-r border-r-slate-300">
        <div className={`overflow-hidden group bg-slate-200 rounded-lg ${!imageURL ? "h-[250px] border-2 border-dashed" : "h-fit"} border-slate-400 rounded-md`}>
          <Input 
            ref={addImageButton}
            type="file"
            onChange={handleImageInsert}
            accept=".jpg, .jpeg, .png"
            className="hidden"
          />
          {
            imageURL
              ? <div className="relative h-fit">
                  <img 
                    src={imageURL}
                    alt="Added Image"
                    className="size-full"
                  />
                  { image && <h1 className="absolute top-2 left-2 bg-orange-500 size-fit select-none text-white font-[600] text-sm px-3 py-1 rounded-md">{imageDetails.type}</h1> }
                  <div className="absolute bottom-0 w-full flex justify-between items-center gap-2 p-2">
                    <button 
                      onClick={() => addImageButton.current?.click()}
                      className="bg-orange-500 font-[600] text-white text-nowrap text-xs py-1 px-3 rounded-md"
                    >
                      Change Image
                    </button>
                    { image && <h1 className="overflow-hidden bg-white border border-slate-500 py-1 px-3 text-nowrap text-center text-xs font-[600] rounded-md line-clamp-1">{imageDetails.name}</h1> }
                  </div>
                </div>
              : <button 
                  onClick={() => addImageButton.current?.click()}
                  className="size-full relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2 p-6 bg-slate-200 text-lg text-slate-500 font-bold rounded-md hover:bg-slate-300 active:bg-slate-400 active:text-slate-700 transition-colors"
                >
                  <Plus size={30}/>
                  <span>Add an Image</span>
                </button>
          }
        </div>
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl after:content-['*'] after:text-red-500">Nutrition</h1>
          {
            nutritionEditActive && 
            <button onClick={() => setNutritionEditActive(false)} className="text-red-600 hover:text-red-500 transition-colors font-[600]">
              Cancel
            </button>
          }
        </div>
        {
          nutritionEditActive || userInput.nutrition.length > 0
            ? <ScrollArea className="flex-1 border border-slate-400 rounded-md">
                <div className="p-2 max-h-full">
                  <div className="flex justify-between gap-2 items-center mb-2 border border-slate-400 p-2 rounded-md">
                    <h1 className="font-[600] my-2">Serving Size:</h1>
                    <Input
                      type="number"
                      name="amount"
                      min={1}
                      value={servingSize.amount}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setServingSize(s => ({ ...s, amount: Number(event.target.value) }))}
                      className="max-w-[75px]"
                    />
                    <Input
                      type="text"
                      name="unit"
                      value={servingSize.unit}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setServingSize(s => ({ ...s, unit: event.target.value }))}
                      className="flex-1"
                    />
                  </div>
                  {
                    userInput.nutrition.map((nutrition: Nutrition) => (
                      <button 
                        key={nanoid()}
                        onClick={() => removeInput("nutrition", nutrition)}
                        className="group w-full flex justify-between items-center px-1 py-3 hover:p-3 hover:bg-red-200 rounded-md transition-all"
                      >
                        <h1 className="text-muted-foreground font-[600]">
                          <b className="font-[700] text-black text-xl">{nutrition.name}</b> ({nutrition.unit})
                        </h1>
                        <div className="min-w-[75px] font-bold bg-orange-500 group-hover:bg-red-500 text-white px-2 rounded-full">
                          {nutrition.amount}
                        </div>
                      </button>
                    ))
                  }
                  {
                    nutritionEditActive
                      ? <div className="grid grid-rows-2 grid-cols-[repeat(2,_1fr)_max-content] gap-2">
                          <Input
                            type="text"
                            name="name"
                            value={nutrition?.name}
                            placeholder="Name"
                            autoComplete="off"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setNutrition)}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleEnterPress(event, nutritionButton)}
                            className="row-start-1 col-start-1 col-span-3"
                          />
                          <Input
                            type="number"
                            name="amount"
                            min={1}
                            value={nutrition?.amount}
                            placeholder="Amount"
                            autoComplete="off"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setNutrition)}
                            className="row-start-2 col-start-1"
                          />
                          <Select onValueChange={(value: string) => setNutrition(n => ({ ...n, unit: value }))}>
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
                            ref={nutritionButton}
                            onClick={() => (nutrition.name && nutrition.amount > 0 && nutrition.unit) && addInput("nutrition", nutrition)}
                            className="row-start-2 col-start-3 aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                          >
                            <Plus size={18}/>
                          </button>
                        </div>
                      : <button 
                          onClick={() => setNutritionEditActive(true)}
                          className="w-full h-10 flex justify-center items-center text-white bg-orange-500 py-2 rounded-md"
                        >
                          <Plus size={18}/>
                        </button>
                  }
                </div>
                <ScrollBar/>
              </ScrollArea>
            : <button 
                onClick={() => setNutritionEditActive(true)}
                className="flex-1 flex flex-col justify-center items-center p-6 bg-slate-200 text-slate-500 rounded-md hover:bg-slate-300 active:bg-slate-400 active:text-slate-700 transition-colors"
              >
                <X size={84}/>
                <h1 className="text-lg font-bold">No Nutrition Found!</h1>
                <span>Click here to add one!</span>
              </button>

        }
        <button 
          onClick={submitRecipe}
          className="font-[600] text-xl text-white py-2 bg-orange-500 rounded-md">
          Update Recipe
        </button>
      </div>
      <div className="grid grid-rows-[repeat(6,max-content)] grid-cols-1 xl:grid-rows-[repeat(4,_max-content)] xl:grid-cols-2 gap-3 p-3 *:border *:border-orange-300 *:p-4 *:rounded-md">
        <div className="min-w-1/2 max-w-full flex flex-col justify-between row-start-1 col-start-1">
          <div className="flex justify-between items-start gap-2 ">
            <textarea
              ref={titleInput}
              name="title"
              value={userInput.title}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event, setUserInput)}
              spellCheck={false}
              placeholder="Title"
              className="min-h-[50px] h-[max-content] resize-none focus:resize-y flex-1 font-bold text-3xl pointer-events-none focus:pointer-events-auto rounded-md"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button onClick={() => enterEditMode(titleInput)} className="group text-slate-600">
                    <Pencil className="group-hover:text-orange-500 transition-colors"/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter Edit Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="font-[600] text-muted-foreground mt-3">Add a title to your recipe here.</p>
        </div>
        <div className="row-start-2">
          <h1 className="font-bold text-2xl">Times</h1>
          <p className="text-muted-foreground font-[600]">
            Add preparation times for this recipe.
          </p>
          <div className="flex flex-col xl:flex-row flex-wrap justify-between gap-3 xl:gap-5 mt-3">
            <div className="flex-1 bg-orange-500 text-white flex flex-col items-center gap-3 p-4 rounded-md">
              <h1 className="font-bold text-xl">Prep Time</h1>
              <div className="flex items-center gap-2">
                <Clock size={28}/>
                <Input
                  type="number"
                  name="prepTime"
                  value={times.prepTime}
                  min={0}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTimes(t => ({ ...t, prepTime: Number(event.target.value) }))}
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
                  type="number"
                  name="prepTime"
                  value={times.cookTime}
                  min={0}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTimes(t => ({ ...t, cookTime: Number(event.target.value) }))}
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
                  type="number"
                  name="prepTime"
                  value={times.readyTime}
                  min={0}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTimes(t => ({ ...t, readyTime: Number(event.target.value) }))}
                  autoComplete="off"
                  className="w-[75px] h-[30px] bg-transparent focus:bg-white focus:text-black"
                />
                <span className="font-[600]">mins</span>
              </div>
            </div>
            
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1 row-start-3 col-start-1 xl:row-start-1 xl:col-start-2 xl:row-span-2">
          <div className="flex justify-between gap-3">
            <h1 className="text-2xl font-bold">Description</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button onClick={() => enterEditMode(descriptionInput)} className="group text-slate-600">
                    <Pencil className="group-hover:text-orange-500 transition-colors"/>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter Edit Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground font-[600]">Add basic information about your recipe here.</p>
          <Separator className="my-1"/>
          <textarea
            ref={descriptionInput}
            name="description"
            value={userInput.description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event, setUserInput)}
            spellCheck={false}
            placeholder={descriptionPlaceholder}
            autoComplete="off"
            className="min-h-[100px] select-none resize-none leading-normal box-border pointer-events-none focus:select-auto focus:pointer-events-auto flex-1 flex rounded-md"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 row-start-4 col-start-1 xl:row-start-3">
          <h1 className="font-bold text-2xl">Diets</h1>
          <div className="flex-1">
            <div className="relative flex justify-between gap-3 mb-3">
              <Input
                ref={dietInput}
                type="text"
                name="dish"
                value={diet}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDiet(event.target.value)}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleEnterPress(event, dietButton)}
                placeholder="Diet..."
                autoComplete="off"
                className="text-lg py-5"
              />
              <button 
                ref={dietButton}
                onClick={() => dietInput.current?.value && addInput("diets", dietInput.current.value)}
                className="right-1.5 bg-orange-500 hover:bg-orange-700 text-white font-[600] px-6 rounded-md transition-colors"
              >
                Add
              </button>
            </div>
            {
              userInput.diets.length > 0 &&
                <ScrollArea>
                  <div className="flex flex-wrap gap-x-1 gap-y-2">
                    { 
                      userInput.diets.map((diet: string) => (
                        <button
                          key={nanoid()}
                          onClick={() => removeInput("diets", diet)}
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
        </div>
        <div className="flex flex-col justify-between gap-2 row-start-5 col-start-1 xl:row-start-3 xl:col-start-2">
          <h1 className="font-bold text-2xl">Dish Types</h1>
          <div className="flex-1">
            <div className="relative flex justify-between gap-3 mb-3">
              <Input
                ref={dishInput}
                type="text"
                name="dish"
                value={dishType}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDishType(event.target.value)}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleEnterPress(event, dishButton)}
                placeholder="Dish Type..."
                autoComplete="off"
                className="text-lg py-5"
              />
              <button 
                ref={dishButton}
                onClick={() => dishInput.current?.value && addInput("dishTypes", dishInput.current.value)}
                className="right-1.5 bg-orange-500 hover:bg-orange-700 text-white font-[600] px-6 rounded-md transition-colors"
              >
                Add
              </button>
            </div>
            {
              userInput.dishTypes.length > 0 &&
                <ScrollArea>
                  <div className="grid grid-cols-2 gap-3">
                    { 
                      userInput.dishTypes.map((dish: string) => (
                        <button
                          key={nanoid()}
                          onClick={() => removeInput("dishTypes", dish)}
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
        </div>
        <div className="flex flex-col gap-2 row-start-6 col-start-1 xl:row-start-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold after:content-['*'] after:text-red-500">Ingredients</h1>
              <p className="font-[600] text-muted-foreground">Add ingredients to your recipe here.</p>
            </div>
            { 
              ingredientsEditActive && 
                <button onClick={() => setIngredientsEditActive(false)} className="text-red-600 hover:text-red-500 transition-colors font-[600]">
                  Cancel
                </button> 
            }
          </div>
          {
            userInput.ingredients.length > 0 &&
            <div className="grid grid-cols-2 gap-2 my-2">
              { 
                userInput.ingredients.map((ingredient: Ingredient) => (
                  <button
                    key={nanoid()}
                    onClick={() => removeInput("ingredients", ingredient)}
                    className="group flex justify-between gap-2 items-center border border-slate-400 p-3 rounded-md hover:bg-red-500 transition-colors odd:last:col-span-2"
                  >
                    <h1 className="font-bold text-xl group-hover:text-white">{ingredient.amount} {ingredient.unit}</h1>
                    <span className="text-xl font-[600] text-muted-foreground group-hover:text-white">{ingredient.name}</span>
                  </button>
                ))
              }
            </div>
          }
          {
            ingredientsEditActive
              ? <div className="h-fit flex justify-between gap-3">
                  <Input
                    type="number"
                    name="amount"
                    min={1}
                    value={ingredient?.amount}
                    placeholder="Amount"
                    autoComplete="off"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setIngredient)}
                    className="w-1/4"
                  />
                  <Select onValueChange={(value: string) => setIngredient(i => ({ ...i, unit: value }))}>
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
                    value={ingredient?.name}
                    placeholder="Name"
                    autoComplete="off"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setIngredient)}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleEnterPress(event, ingredientButton)}
                    className="flex-1"
                  />
                  <button
                    ref={ingredientButton}
                    onClick={() => (ingredient.name && ingredient.amount > 0 && ingredient.unit) && addInput("ingredients", ingredient)}
                    className="aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                  >
                    <Plus size={18}/>
                  </button>
                </div>
              : <button 
                  onClick={() => setIngredientsEditActive(true)}
                  className="group-focus:hidden w-full h-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                >
                  <Plus size={18}/>
                </button>
          }
        </div>
        <div className="flex flex-col gap-2 row-start-7 col-start-1 xl:row-start-4 xl:col-start-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold after:content-['*'] after:text-red-500">Instructions</h1>
              <p className="font-[600] text-muted-foreground">Add instructions to your recipe here.</p>
            </div>
            { 
              instructionsEditActive && 
                <button onClick={() => setInstructionsEditActive(false)} className="text-red-600 hover:text-red-500 transition-colors font-[600]">
                  Cancel
                </button> 
            }
          </div>
          { 
            userInput.instructions.map((instruction: string, index: number) => (
              <button 
                key={nanoid()}
                onClick={() => removeInput("instructions", instruction)}
                className="group flex justify-between gap-2 bg-orange-200 hover:bg-red-200 rounded-md p-3"
              >
                <div className="size-10 flex justify-center items-center text-white bg-orange-500 group-hover:bg-red-500 p-3 rounded-full">
                  {index + 1}
                </div>
                <p className="flex-1 text-left">{instruction}</p>
              </button>
            ))
          }
          {
            instructionsEditActive
              ? <div className="h-fit flex justify-between gap-3">
                  <textarea
                    ref={instructionInput}
                    name="step"
                    value={instruction}
                    placeholder="Add an instruction here..."
                    autoComplete="off"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setInstruction(event.target.value)}
                    className="flex-1 h-10 resize-none focus:resize-y border border-slate-300 p-2 rounded-md"
                    autoFocus
                  />
                  <button 
                    onClick={() => instruction && addInput("instructions", instruction)}
                    className="aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                  >
                    <Plus size={18}/>
                  </button>
                </div>
              : <button 
                  onClick= {() => setInstructionsEditActive(true)}
                  className="w-full h-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                >
                  <Plus size={18}/>
                </button>
          }
        </div>
      </div>
    </div>
  )
}
