import { Clipboard, Clock, Microwave, Plus, X } from "lucide-react"
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
import { useFirestorePost, useStorageUpload } from "@/util/hooks"
import { defaultRecipe, type Recipe, type Ingredient, type Nutrition } from "@/types/recipe"
import { Separator } from "@/components/ui/separator"
import { UserContext } from "@/App"
import { CurrentUser } from "@/types/app"
import { SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form"
import Error from "./Error"
import Field from "./Field"

const descriptionPlaceholder = 
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh."

// TODO: Implement validation for other form inputs
export default function CreateRecipe() {
  
  const user = useContext<CurrentUser>(UserContext)
  const { addFirestoreDoc } = useFirestorePost()
  const [image, setImage] = useState<File>()
  const [imageURL, setImageURL] = useState<string>("")
  const [dietInput, setDietInput] = useState<string>("")
  const [dishTypeInput, setDishType] = useState<string>("")

  const [nutritionInput, setNutritionInput] = useState<Nutrition>({
    name: "",
    amount: 1,
    unit: ""
  })

  const [ingredientInput, setIngredientInput] = useState<Ingredient>({
    name: "",
    amount: 1,
    unit: ""
  })

  const [instructionInput, setInstructionInput] = useState<string>("")
  const [nutritionEditActive, setNutritionEditActive] = useState<boolean>(false)
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

  const { 
    register, 
    handleSubmit,
    getValues,
    setValue,
    setError,
    control,
    formState: { 
      errors,
      isSubmitting
    }
  } = useForm<Recipe>({ defaultValues: defaultRecipe })

  const [ diets, dishTypes, ingredients, instructions ] = useWatch({
    control,
    name: ["diets", "dishTypes", "ingredients", "instructions"]
  })

  const { 
    fields: nutritionFields, 
    append: nutritionAppend, 
    remove: nutritionRemove,
  } = useFieldArray({
    control,
    name: "nutrition"
  })

  const { 
    fields: ingredientsFields, 
    append: ingredientsAppend, 
    remove: ingredientsRemove, 
  } = useFieldArray({
    control,
    name: "ingredients"
  })

  const addImageButton = useRef<HTMLInputElement>(null)
  const dietInputRef = useRef<HTMLInputElement>(null)
  const dishInputRef = useRef<HTMLInputElement>(null)
  const instructionInputRef = useRef<HTMLTextAreaElement>(null)
  const dietButton = useRef<HTMLButtonElement>(null)
  const dishButton = useRef<HTMLButtonElement>(null)
  const nutritionButton = useRef<HTMLButtonElement>(null)
  const ingredientButton = useRef<HTMLButtonElement>(null)
  const uploadToStorage = useStorageUpload()
  
  const submitRecipe: SubmitHandler<Recipe> = async(data: Recipe) => { 
    console.log(data)
    
    if(image) {
      const imageRef = await uploadToStorage(image, `${imageDetails.name}-${nanoid()}`)
      imageRef && setValue("image", imageRef)
    }    

    if(data.nutrition.length <= 0) {
      setError("nutrition", {
        type: "missing",
        message: "Nutritional facts must be added for a recipe."
      })
    }

    if(data.ingredients.length <= 0) {
      setError("ingredients", {
        type: "missing",
        message: "Ingredients are required to make a recipe."
      })
    }

    if(data.instructions.length <= 0) {
      setError("instructions", {
        type: "missing",
        message: "Instructions are required to make a recipe."
      })
    }

    if(!image) {
      setError("image", {
        type: "missing",
        message: "An image must be provided before creating a recipe."
      })
    }
    
    try {
      await addFirestoreDoc("recipes", {
        ...data,
        userId: user?.uid
      })
      console.log("doc added!")
    } catch (err: any) {
      console.error(err.message)
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

  useEffect(() => {
    image && setImageURL(URL.createObjectURL(image))
    return () => URL.revokeObjectURL(imageURL)
  }, [image])
  
  console.log(getValues())
  
  return (
    <form onSubmit={handleSubmit(submitRecipe)} className="relative min-h-[calc(100vh-150px)] grid grid-cols-[350px_1fr]">
      <div className="overflow-hidden h-[calc(100vh-150px)] sticky top-[150px] flex flex-col justify-between gap-3 p-4 bg-white border-r border-r-slate-300">
        <div className={`overflow-hidden group bg-slate-200 rounded-lg ${!image ? "h-[250px] border-2 border-dashed" : "h-fit"} border-slate-400 rounded-md`}>
          <Input
            { 
              ...register("image", { 
                required: "An image must be attached before submitting." 
              }) 
            }
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
                      type="button"
                      onClick={() => addImageButton.current?.click()}
                      className="bg-orange-500 font-[600] text-white text-nowrap text-xs py-1 px-3 rounded-md"
                    >
                      Change Image
                    </button>
                    { image && <h1 className="overflow-hidden bg-white border border-slate-500 py-1 px-3 text-nowrap text-center text-xs font-[600] rounded-md line-clamp-1">{imageDetails.name}</h1> }
                  </div>
                </div>
              : <button
                  type="button"
                  onClick={() => addImageButton.current?.click()}
                  className="size-full relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2 p-6 bg-slate-200 text-lg text-slate-500 font-bold rounded-md hover:bg-slate-300 active:bg-slate-400 active:text-slate-700 transition-colors"
                >
                  <Plus size={30}/>
                  <span>Add an Image</span>
                </button>
          }
          {
            errors.image && 
              <Error>
                {errors.image.message}
              </Error>
          }
        </div>
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl after:content-['*'] after:text-red-500">Nutrition</h1>
          {
            nutritionEditActive && 
            <button
              type="button"
              onClick={() => setNutritionEditActive(false)}
              className="text-red-600 hover:text-red-500 transition-colors font-[600]"
            >
              Cancel
            </button>
          }
        </div>
        {
          nutritionEditActive || nutritionFields.length > 0
            ? <ScrollArea className="flex-1 border border-slate-400 rounded-md">
                <div className="p-2 max-h-full">
                  <div className="flex justify-between gap-2 items-center mb-2 border border-slate-400 p-2 rounded-md">
                    <h1 className="font-[600] my-2">Serving Size:</h1>
                    <Input
                      { 
                        ...register("servingSize.amount", {
                          required: "A serving size amount is required.",
                          min: 1
                        })
                      } 
                      type="number"
                      className="max-w-[75px]"
                    />
                    <Input
                      { 
                        ...register("servingSize.unit", {
                          required: "A serving size measurement is required."
                        })
                      }
                      type="text"
                      className="flex-1"
                    />
                  </div>
                  {
                    nutritionFields.map((nutrition, index) => (
                      // <button 
                      //   type="button"
                      //   key={nanoid()}
                      //   onClick={() => setValue("nutrition", [...getValues("nutrition").filter(n => n !== nutrition)])}
                      //   className="group w-full flex justify-between items-center px-1 py-3 hover:p-3 hover:bg-red-200 rounded-md transition-all"
                      // >
                      //   <h1 className="text-muted-foreground font-[600]">
                      //     <b className="font-[700] text-black text-xl">{nutrition.name}</b> ({nutrition.unit})
                      //   </h1>
                      //   <div className="min-w-[75px] font-bold bg-orange-500 group-hover:bg-red-500 text-white px-2 rounded-full">
                      //     {nutrition.amount}
                      //   </div>
                      // </button>
                      <input
                        key={nutrition.id}
                        {...register(`nutrition.${index}`)}
                      />
                    ))
                  }
                  {
                    nutritionEditActive
                      ? <div className="grid grid-rows-2 grid-cols-[repeat(2,_1fr)_max-content] gap-2">
                          <Input
                            type="text"
                            name="name"
                            value={nutritionInput?.name}
                            placeholder="Name"
                            autoComplete="off"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setNutritionInput)}
                            className="row-start-1 col-start-1 col-span-3"
                          />
                          <Input
                            type="number"
                            name="amount"
                            min={1}
                            value={nutritionInput?.amount}
                            placeholder="Amount"
                            autoComplete="off"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setNutritionInput)}
                            className="row-start-2 col-start-1"
                          />
                          <Select onValueChange={(value: string) => setNutritionInput(n => ({ ...n, unit: value }))}>
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
                            ref={nutritionButton}
                            onClick={() => (nutritionInput.name && nutritionInput.unit) && setValue("nutrition", [ ...getValues("nutrition"), nutritionInput ])}
                            className="row-start-2 col-start-3 aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                          >
                            <Plus size={18}/>
                          </button>
                        </div>
                      : <button 
                          type="button"
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
                type="button"
                onClick={() => setNutritionEditActive(true)}
                className="flex-1 flex flex-col justify-center items-center p-6 bg-slate-200 text-slate-500 rounded-md hover:bg-slate-300 active:bg-slate-400 active:text-slate-700 transition-colors"
              >
                <X size={84}/>
                <h1 className="text-lg font-bold">No Nutrition Found!</h1>
                <span>Click here to add one!</span>
              </button>

        }
        <button
          disabled={isSubmitting}
          type="submit" 
          className="font-[600] text-xl text-white py-2 bg-orange-500 rounded-md"
        >
          { isSubmitting ? "Working on it..."  : "Create Recipe" }
        </button>
      </div>
      <div className="grid grid-rows-[repeat(6,max-content)] grid-cols-1 xl:grid-rows-[repeat(4,_max-content)] xl:grid-cols-2 gap-3 p-3 *:border *:border-orange-300 *:p-4 *:rounded-md">
        <Field className="row-start-1 col-start-1">
          <div className="flex justify-between items-start gap-2 ">
            <textarea
              { 
                ...register("title", {
                  required: "A title is required before submitting."
                }) 
              }
              spellCheck={false}
              placeholder="Title"
              className="min-h-[50px] h-[max-content] resize-y flex-1 font-bold text-3xl rounded-md"
            />
          </div>
          <p className="font-[600] text-muted-foreground mt-3">Add a title to your recipe here.</p>
          { 
            errors.title &&
            <Error>
              {errors.title.message}
            </Error> 
          }
        </Field>
        <Field className="row-start-2">
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
                  { 
                    ...register("times.prepTime", {
                      min: {
                        value: 0,
                        message: "Prep time cannot be negative."
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
              {
                errors.times?.prepTime &&
                  <Error>{errors.times?.prepTime.message}</Error>
              }
            </div>
            <div className="flex-1 bg-orange-500 text-white flex flex-col items-center gap-3 p-4 rounded-md">
              <h1 className="font-bold text-xl">Cook Time</h1>
              <div className="flex items-center gap-2">
                <Microwave size={28}/>
                <Input
                  { ...register("times.cookTime", {
                      min: {
                        value: 0,
                        message: "Cook time cannot be negative."
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
                        value: 0,
                        message: "Ready time cannot be negative."
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
        </Field>
        <Field className="flex-1 row-start-3 col-start-1 xl:row-start-1 xl:col-start-2 xl:row-span-2">
          <div className="flex justify-between gap-3">
            <h1 className="text-2xl font-bold">Description</h1>
          </div>
          <p className="text-muted-foreground font-[600]">Add basic information about your recipe here.</p>
          <Separator className="my-1"/>
          <textarea
            { 
              ...register("description", {
                required: "A description is required."
              }) 
            }
            spellCheck={false}
            placeholder={descriptionPlaceholder}
            autoComplete="off"
            className="min-h-[100px] resize-y leading-normal box-border flex-1 flex rounded-md"
          />
          { 
            errors.description &&
            <Error>
              {errors.description.message}
            </Error> 
          }
        </Field>
        <Field className="row-start-4 col-start-1 xl:row-start-3">
          <h1 className="font-bold text-2xl">Diets</h1>
          <div className="flex-1">
            <div className="relative flex justify-between gap-3 mb-3">
              <Input
                ref={dietInputRef}
                type="text"
                name="dish"
                value={dietInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDietInput(event.target.value)}
                placeholder="Diet..."
                autoComplete="off"
                className="text-lg py-5"
              />
              <button
                type="button" 
                ref={dietButton}
                onClick={() => dietInputRef.current?.value && setValue("diets", [...getValues("diets"), dietInputRef.current.value])}
                className="right-1.5 bg-orange-500 hover:bg-orange-700 text-white font-[600] px-6 rounded-md transition-colors"
              >
                Add
              </button>
            </div>
            {
              getValues("diets").length > 0 &&
                <ScrollArea>
                  <div className="flex flex-wrap gap-x-1 gap-y-2">
                    { 
                      diets.map((diet: string) => (
                        <button
                          type="button"
                          key={nanoid()}
                          onClick={() => setValue("diets", [...getValues("diets").filter(d => d !== diet)])}
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
        <Field className="row-start-5 col-start-1 xl:row-start-3 xl:col-start-2">
          <h1 className="font-bold text-2xl">Dish Types</h1>
          <div className="flex-1">
            <div className="relative flex justify-between gap-3 mb-3">
              <Input
                ref={dishInputRef}
                type="text"
                name="dish"
                value={dishTypeInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDishType(event.target.value)}
                placeholder="Dish Type..."
                autoComplete="off"
                className="text-lg py-5"
              />
              <button
                type="button" 
                ref={dishButton}
                onClick={() => dishInputRef.current?.value && setValue("dishTypes", [...getValues("dishTypes"), dishInputRef.current.value])}
                className="right-1.5 bg-orange-500 hover:bg-orange-700 text-white font-[600] px-6 rounded-md transition-colors"
              >
                Add
              </button>
            </div>
            {
              getValues("dishTypes").length > 0 &&
                <ScrollArea>
                  <div className="grid grid-cols-2 gap-3">
                    { 
                      dishTypes.map((dish: string) => (
                        <button
                          type="button"
                          key={nanoid()}
                          onClick={() => setValue("dishTypes", [...getValues("dishTypes").filter(d => d !== dish)])}
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
        <Field className="row-start-6 col-start-1 xl:row-start-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold after:content-['*'] after:text-red-500">Ingredients</h1>
              <p className="font-[600] text-muted-foreground">Add ingredients to your recipe here.</p>
            </div>
            { 
              ingredientsEditActive && 
                <button
                  type="button"
                  onClick={() => setIngredientsEditActive(false)}
                  className="text-red-600 hover:text-red-500 transition-colors font-[600]"
                >
                  Cancel
                </button> 
            }
          </div>
          {
            getValues("ingredients").length > 0 &&
            <div className="grid grid-cols-2 gap-2 my-2">
              { 
                ingredients.map((ingredient: Ingredient) => (
                  <button
                    type="button"
                    key={nanoid()}
                    onClick={() => setValue("ingredients", [...getValues("ingredients").filter(i => i !== ingredient)])}
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
                    value={ingredientInput?.amount}
                    placeholder="Amount"
                    autoComplete="off"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setIngredientInput)}
                    className="w-1/4"
                  />
                  <Select onValueChange={(value: string) => setIngredientInput(i => ({ ...i, unit: value }))}>
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
                    value={ingredientInput?.name}
                    placeholder="Name"
                    autoComplete="off"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setIngredientInput)}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    ref={ingredientButton}
                    onClick={() => (ingredientInput.name && ingredientInput.amount > 0 && ingredientInput.unit) && setValue("ingredients", [...getValues("ingredients"), ingredientInput])}
                    className="aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                  >
                    <Plus size={18}/>
                  </button>
                </div>
              : <button
                  type="button" 
                  onClick={() => setIngredientsEditActive(true)}
                  className="group-focus:hidden w-full h-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                >
                  <Plus size={18}/>
                </button>
          }
          { 
            errors.ingredients &&
            <Error>
              {errors.ingredients.message}
            </Error> 
          }
        </Field>
        <Field className="row-start-7 col-start-1 xl:row-start-4 xl:col-start-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold after:content-['*'] after:text-red-500">Instructions</h1>
              <p className="font-[600] text-muted-foreground">Add instructions to your recipe here.</p>
            </div>
            { 
              instructionsEditActive && 
                <button
                  type="button"
                  onClick={() => setInstructionsEditActive(false)}
                  className="text-red-600 hover:text-red-500 transition-colors font-[600]"
                >
                  Cancel
                </button> 
            }
          </div>
          {
            getValues("instructions").length > 0 &&
            <div className="flex flex-col gap-4 my-2">
              { 
                instructionsFields.map((instruction: string, index: number) => (
                  <button
                    type="button" 
                    key={nanoid()}
                    onClick={() => setValue("instructions", [...getValues("instructions").filter(i => i !== instruction)])}
                    className="group flex justify-between gap-2 bg-orange-200 hover:bg-red-200 rounded-md p-3"
                  >
                    <div className="size-10 flex justify-center items-center text-white bg-orange-500 group-hover:bg-red-500 p-3 rounded-full">
                      {index + 1}
                    </div>
                    <p className="flex-1 text-left">{instruction}</p>
                  </button>
                ))
              }
            </div>
          }
          {
            instructionsEditActive
              ? <div className="h-fit flex justify-between gap-3">
                  <textarea
                    ref={instructionInputRef}
                    name="step"
                    value={instructionInput}
                    placeholder="Add an instruction here..."
                    autoComplete="off"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setInstructionInput(event.target.value)}
                    className="flex-1 h-10 resize-none focus:resize-y border border-slate-300 p-2 rounded-md"
                    autoFocus
                  />
                  <button
                    type="button" 
                    onClick={() => instructionInput && setValue("instructions", [...getValues("instructions"), instructionInput])}
                    className="aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                  >
                    <Plus size={18}/>
                  </button>
                </div>
              : <button
                  type="button" 
                  onClick= {() => setInstructionsEditActive(true)}
                  className="w-full h-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
                >
                  <Plus size={18}/>
                </button>
          }
          { 
            errors.instructions &&
            <Error>
              {errors.instructions.message}
            </Error> 
          }
        </Field>
      </div>
    </form>
  )
}
