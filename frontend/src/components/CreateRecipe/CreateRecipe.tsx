import { Pencil, Plus, Trash } from "lucide-react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

type Ingredient = {
  name: string
  amount: number
  unit: string
}

type Instruction = {
  number: number
  step: string
}

type Form = {
  image?: File
  imageURL: string
  title: string
  description: string
  diets: string[]
  dishTypes: string[]
  ingredients: Ingredient[],
  instructions: Instruction[]
}

const descriptionPlaceholder = 
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Nec nam aliquam sem et tortor consequat id. Eu sem integer vitae justo. Eget mi proin sed libero enim sed faucibus turpis. Nibh nisl condimentum id venenatis a. Aliquam nulla facilisi cras fermentum odio. Arcu risus quis varius quam quisque id. Metus vulputate eu scelerisque felis imperdiet proin. Commodo sed egestas egestas fringilla phasellus faucibus."


export default function CreateRecipe() {
  const [userInput, setUserInput] = useState<Form & {[key: string]: any}>({
    image: undefined,
    imageURL: "",
    title: "",
    description: "",
    diets: [],
    dishTypes: [],
    ingredients: [],
    instructions: []
  })

  const [ingredient, setIngredient] = useState<Ingredient>({
    name: "",
    amount: 0,
    unit: ""
  })

  const [instruction, setInstruction] = useState<Partial<Instruction>>({ step: "" })

  const [ingredientsEditActive, setIngredientsEditActive] = useState<boolean>(false)
  const [instructionsEditActive, setInstructionsEditActive] = useState<boolean>(false)

  const imageDetails = useMemo(() => {
    const name = userInput.image?.name
    const parsedName = name?.split(".")
    
    return {
      name: parsedName?.slice(0, parsedName.length - 1).join(""),
      type: parsedName?.[parsedName.length - 1].toUpperCase()
    }
  }, [userInput.image])

  const addImageButton = useRef<HTMLInputElement>(null)
  const descriptionInput = useRef<HTMLTextAreaElement>(null)
  const titleInput = useRef<HTMLTextAreaElement>(null)
  const dietInput = useRef<HTMLInputElement>(null)
  const dishInput = useRef<HTMLInputElement>(null)
  const instructionInput = useRef<HTMLTextAreaElement>(null)
  const dietButton = useRef<HTMLButtonElement>(null)
  const dishButton = useRef<HTMLButtonElement>(null)
  
  function handleImageInsert(event: React.ChangeEvent<HTMLInputElement>) {
    const addedImage = event.target.files?.[0]

    // images can't be more than 5MB in size
    if(addedImage && addedImage.size <= 5 * 1024 * 1024) {
      setUserInput(u => ({
        ...u, 
        image: addedImage,
        imageURL: URL.createObjectURL(addedImage)
      }))
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, updaterFunction: React.Dispatch<React.SetStateAction<any>>) {
    const { name, value } = event.target
    updaterFunction((u: any) => ({ ...u, [name]: value }))
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, buttonRef: React.RefObject<HTMLButtonElement>) {
    event.key === "Enter" && buttonRef.current?.click()
  }

  function addInput(prop: keyof Form, addedElement: any) {
    userInput[prop] && setUserInput(u => ({ ...u, [prop]: [...(u[prop] as any[]), addedElement] }))
  }

  function removeInput(prop: keyof Form, removedElement: any) {
    setUserInput(u => ({ ...u, [prop]: (u[prop] as any[]).filter(element => element !== removedElement) }))
  }

  function enterEditMode(ref: React.RefObject<HTMLElement>) {
    ref.current?.focus()
  }

  useEffect(() => {
    return () => URL.revokeObjectURL(userInput.imageURL)
  }, [userInput.imageURL])
  
  return (
    <div className="*:border *:border-purple-500 border border-black relative min-h-[calc(100vh-150px)] grid grid-cols-[350px_1fr]">
      <div className="h-[calc(100vh-150px)] sticky top-[150px] flex flex-col gap-3 p-3">
        <div className={`group overflow-hidden bg-slate-200 rounded-lg ${!userInput.image ? "h-[250px] border-2 border-dashed" : "h-fit"} border-slate-400`}>
          <Input 
            ref={addImageButton}
            type="file"
            onChange={handleImageInsert}
            accept=".jpg, .jpeg, .png"
            className="hidden"
          />
          {
            userInput.imageURL
              ? <div className="relative">
                  <img 
                    src={userInput.imageURL}
                    alt="Added Image"
                    className="size-full"
                  />
                  { userInput.image && <h1 className="absolute top-2 left-2 bg-orange-500 size-fit select-none text-white font-[600] text-sm px-3 py-1 rounded-md">{imageDetails.type}</h1> }
                  <div className="absolute bottom-0 w-full flex justify-between items-center gap-2 p-2">
                    <button 
                      onClick={() => addImageButton.current?.click()}
                      className="bg-orange-500 font-[600] text-white text-nowrap text-xs py-1 px-3 rounded-md"
                    >
                      Change Image
                    </button>
                    { userInput.image && <h1 className="overflow-hidden bg-white border border-slate-500 py-1 px-3 text-nowrap text-center text-xs font-[600] rounded-md line-clamp-1">{imageDetails.name}</h1> }
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
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">Description</h1>
            <button onClick={() => enterEditMode(descriptionInput)} className="group text-slate-600">
              <Pencil className="group-hover:text-orange-500 transition-colors"/>
            </button>
          </div>
          <textarea
            ref={descriptionInput}
            name="description"
            value={userInput.description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event, setUserInput)}
            spellCheck={false}
            placeholder={descriptionPlaceholder}
            autoComplete="off"
            className="resize-none leading-normal box-border pointer-events-none focus:pointer-events-auto flex-1 flex rounded-md"
          />
        </div>
        <button className="font-[600] text-xl text-white py-2 bg-orange-500 rounded-md">
          Create Recipe
        </button>
      </div>
      <div className="*:border *:border-blue-300 grid grid-rows-[repeat(5,max-content)] grid-cols-1 xl:grid-rows-[max-content_repeat(2,_1fr)] xl:grid-cols-2 gap-3 p-3">
        <div className="min-w-1/2 max-w-full flex justify-between items-start gap-2 row-start-1 col-start-1">
          <textarea
            ref={titleInput}
            name="title"
            value={userInput.title}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event, setUserInput)}
            spellCheck={false}
            placeholder="Title"
            className="h-[max-content] resize-none focus:resize-y flex-1 font-bold text-3xl pointer-events-none focus:pointer-events-auto"
          />
          <button onClick={() => enterEditMode(titleInput)} className="group text-slate-600">
            <Pencil className="group-hover:text-orange-500 transition-colors"/>
          </button>          
        </div>
        <div className="row-start-2 col-start-1">
          <div className="flex flex-col justify-between gap-2">
            <div className="relative flex justify-between gap-3">
              <Input
                ref={dietInput}
                type="text"
                name="diet"
                value={userInput.diet}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setUserInput)}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event, dietButton)}
                placeholder="Diet"
                autoComplete="off"
                className="text-lg py-5"
              />
              <button 
                ref={dietButton}
                onClick={() => addInput("diets", dietInput.current?.value)}
                className="absolute top-1/2 -translate-y-1/2 right-1.5 bg-orange-500 text-white font-[600] px-6 py-1 rounded-md">
                Add
              </button>
            </div>
            {
              userInput.diets.length > 0 &&
                <ScrollArea>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    { 
                      userInput.diets.map((diet: string) => (
                        <div key={nanoid()} className="flex justify-between gap-4 rounded-md">
                          <Badge className="flex-1 flex justify-center items-center select-none pointer-events-none bg-orange-500 text-white text-base rounded-md">{diet}</Badge>
                          <button 
                            onClick={() => removeInput("diets", diet)}
                            className="hover:bg-red-500 hover:text-white p-2 transition-all rounded-md"
                          >
                            <Trash/>
                          </button>
                        </div>
                      ))
                    }
                  </div>
                  <ScrollBar/>
                </ScrollArea>
            }
          </div>
        </div>
        <div className="row-start-3 col-start-1 xl:row-start-2 xl:col-start-2">
        <div className="flex flex-col justify-between gap-2">
          <div className="relative flex justify-between gap-3">
            <Input
              ref={dishInput}
              type="text"
              name="dish"
              value={userInput.dish}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setUserInput)}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event, dishButton)}
              placeholder="Dish Type..."
              autoComplete="off"
              className="text-lg py-5"
            />
            <button 
              ref={dishButton}
              onClick={() => addInput("dishTypes", dishInput.current?.value)}
              className="absolute top-1/2 -translate-y-1/2 right-1.5 bg-orange-500 text-white font-[600] px-6 py-1 rounded-md">
              Add
            </button>
          </div>
          {
            userInput.dishTypes.length > 0 &&
              <ScrollArea>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  { 
                    userInput.dishTypes.map((dish: string) => (
                      <div key={nanoid()} className="flex justify-between gap-4 rounded-md">
                        <Badge className="flex-1 flex justify-center items-center select-none pointer-events-none bg-orange-500 text-white text-base rounded-md">{dish}</Badge>
                        <button 
                          onClick={() => removeInput("dishTypes", dish)}
                          className="hover:bg-red-500 hover:text-white p-2 transition-all rounded-md"
                        >
                          <Trash/>
                        </button>
                      </div>
                    ))
                  }
                </div>
                <ScrollBar/>
              </ScrollArea>
          }
          </div>
        </div>
        <div className="flex flex-col gap-2 row-start-4 col-start-1 xl:row-start-3">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Ingredients</h1>
            { 
              ingredientsEditActive && 
                <button onClick={() => setIngredientsEditActive(false)} className="text-red-600 hover:text-red-500 transition-colors font-[600]">
                  Cancel
                </button> 
            }
          </div>
          {
            userInput.ingredients.length > 0 &&
            <div>
              { 
                userInput.ingredients.map((ingredient: Ingredient) => (
                  <div key={nanoid()} className="flex flex-col gap-2">
                    <span>{ingredient.amount} {ingredient.unit} {ingredient.name}</span>
                  </div>
                ))
              }
            </div>
          }
          {
            ingredientsEditActive
              ? <div className="h-fit flex justify-between gap-3 bg-blue-300">
                  <Input
                    type="number"
                    name="amount"
                    min={0}
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
                    className="flex-1"
                  />
                  <button 
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
        <div className="flex flex-col gap-2 row-start-5 col-start-1 xl:row-start-3 xl:col-start-2">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Instructions</h1>
            { 
              instructionsEditActive && 
                <button onClick={() => setInstructionsEditActive(false)} className="text-red-600 hover:text-red-500 transition-colors font-[600]">
                  Cancel
                </button> 
            }
          </div>
          {
            userInput.instructions.length > 0 &&
            <div className="flex flex-col gap-4">
              { 
                userInput.instructions.map((instruction: Instruction, index: number) => (
                  <div key={nanoid()} className="flex flex-col gap-2 bg-orange-200 text-ellipsis rounded-md p-3">
                    <div className="size-10 flex justify-center items-center text-white bg-orange-500 p-3 rounded-full">
                      {index + 1}
                    </div>
                    <p>{instruction.step}</p>
                  </div>
                ))
              }
            </div>
          }
          {
            instructionsEditActive
              ? <div className="h-fit flex justify-between gap-3 bg-blue-300">
                  <textarea
                    ref={instructionInput}
                    name="step"
                    value={instruction.step}
                    placeholder="Step here..."
                    autoComplete="off"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event, setInstruction)}
                    className="flex-1 h-10 resize-none focus:resize-y"
                    autoFocus
                  />
                  <button 
                    onClick={() => instruction.step && addInput("instructions", instruction)}
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