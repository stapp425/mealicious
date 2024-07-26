import { useEffect, useRef, useState } from "react"
import { useFirestoreGet, useFirestoreUpdate, useScroll } from "@/util/hooks"
import { Link, useParams } from "react-router-dom"
// import { sampleFullRecipe as data } from "@/test"
import { type Section } from "@/types/app"
import { Recipe, type Ingredient, type Nutrition } from "@/types/recipe"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ArrowDownToLine, ArrowUp, Clock, Heart, Microwave, Clipboard, Plus, Earth, Minus, Info, Pencil } from "lucide-react"
import { Badge } from "../ui/badge"
import { nanoid } from "nanoid"
import { useReactToPrint } from "react-to-print"

type SectionRefs = {[key in Section]: HTMLDivElement | null}

export default function RecipeDetails(): React.ReactElement {
  const { recipeId } = useParams()
  const { data } = useFirestoreGet<Recipe>("recipes", recipeId as string)
  const { isWorking, updateFirestoreDoc } = useFirestoreUpdate()
  const [count, setCount] = useState<number>(1)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isPrinterWindowOpen, setIsPrinterWindowOpen] = useState<boolean>(false)
  const { y } = useScroll()
  const contentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    documentTitle: data?.title.toLowerCase().replace(/ /g, "-"), 
    content: () => contentRef.current,
    onBeforePrint: () => setIsPrinterWindowOpen(true),
    onAfterPrint: () => setIsPrinterWindowOpen(false)
  })
  const sectionRefs = useRef<SectionRefs>({
    title: null,
    description: null,
    nutrition: null,
    ingredients: null,
    instructions: null
  })

  useEffect(() => {
    data?.isFavorite != null && 
    setIsFavorite(data?.isFavorite)
  }, [data])
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    const position: number = (sectionRefs.current[value as Section]?.getBoundingClientRect().top || 0) + scrollY - 150

    scrollTo({ top: position, behavior: "smooth" })
  }

  function checkBounds(key: Section) {
    const current = sectionRefs.current[key]
    const element = current as HTMLDivElement

    return y >= element?.getBoundingClientRect().top + y - 150 && y < element?.getBoundingClientRect().top + y - 150 + element?.offsetHeight
  }
  
  return (
    <div className="relative flex">
      <div className="sticky top-[150px] left-0 border-r border-r-slate-300 w-1/4 max-w-[300px] h-[calc(100vh-150px)] flex flex-col pt-3">
        <div>
          <h1 className="hidden md:flex md:flex-col font-bold text-3xl py-2 px-3">Quick Scroll</h1>
          <div className="flex flex-col *:p-3">
            <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
              <input 
                type="radio"
                name="section"
                value="title"
                checked={checkBounds("title")}
                onChange={handleChange}
                className="hidden"
              />
              <span className="font-[600]">Title</span>
            </label>
            <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
              <input 
                type="radio"
                name="section"
                value="description"
                checked={checkBounds("description")}
                onChange={handleChange}
                className="hidden"
              />
              <span className="font-[600]">Description</span>
            </label>
            <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
              <input 
                type="radio"
                name="section"
                value="nutrition"
                checked={checkBounds("nutrition")}
                onChange={handleChange}
                className="hidden"
              />
              <span className="font-[600]">Nutrition</span>
            </label>
            <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
              <input 
                type="radio"
                name="section"
                value="ingredients"
                checked={checkBounds("ingredients")}
                onChange={handleChange}
                className="hidden"
              />
              <span className="font-[600]">Ingredients</span>
            </label>
            <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
              <input 
                type="radio"
                name="section"
                value="instructions"
                checked={checkBounds("instructions")}
                onChange={handleChange}
                className="hidden"
              />
              <span className="font-[600]">Instructions</span>
            </label>
          </div>
        </div>
        <div className="px-3">
          <h1 className="hidden md:flex md:flex-col font-bold text-2xl py-2 mb-2">Options</h1>
          <div className="overflow-hidden flex flex-col border border-slate-400 rounded-md">
            <Link
              to={`/recipes/edit/${data?.id}`}
              className="flex justify-between py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all border-b border-b-slate-400"
            >
              <span className="font-[600]">Edit Recipe</span>
              <Pencil/>
            </Link>
            <button className="flex justify-between py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all border-b border-b-slate-400">
              <span className="font-[600]">Add to Meal</span>
              <Plus/>
            </button>
            <button 
              onClick={async () => {
                try {
                  await updateFirestoreDoc(recipeId as string, { isFavorite: !data?.isFavorite })
                  setIsFavorite(f => !f)
                } catch (err: any) {
                  console.error(err.message)
                }
              }}
              disabled={isWorking}
              className="disabled:cursor-wait flex justify-between py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all border-b border-b-slate-400"
            >
              <span className="font-[600]">{ isFavorite ? "Unfavorite" : "Favorite" }</span>
              <Heart/>
            </button>
            <button 
              onClick={handlePrint} 
              disabled={isPrinterWindowOpen}
              className="disabled:cursor-wait flex justify-between py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all"
            >
              <span className="font-[600]">{isPrinterWindowOpen ? "Working on It..." : "Save as PDF"}</span>
              <ArrowDownToLine/>
            </button>
          </div>
        </div>
      </div>
      {
        data &&
          <div ref={contentRef} className="h-min flex-1 flex flex-col *:max-w-[1000px] *:print:p-6 *:print:max-w-none *:print:w-full *:px-6">
            <div ref={el => sectionRefs.current.title = el} className="h-fit flex gap-3 pt-6">
              <img 
                src={data.image} 
                alt={data.title}
                className="rounded-md shadow-md max-w-[300px]"
              />
              <div className="flex-1 flex flex-col gap-2">
                <h1 className="font-bold text-3xl">{data.title}</h1>
                {
                  isFavorite &&
                    <div className="flex gap-1.5 text-rose-400 font-[600]">
                      <Heart/>
                      <span>Favorited Recipe</span>
                    </div>
                }
                <div className="flex gap-2">
                  <div className="flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md">
                    <Clock/>
                    <span className="text-center">
                      <b>{data.times.readyTime || "-"}</b> mins
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md">
                    <Microwave/>
                    <span className="text-center">
                      <b>{data.times.cookTime || "-"}</b> mins
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md">
                    <Clipboard/>
                    <span className="text-center">
                      <b>{data.times.prepTime || "-"}</b> mins
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 text-nowrap">
                  { data.diets.map((diet: string) => <Badge key={nanoid()} className="bg-orange-500 gap-2 select-none pointer-events-none">{diet}</Badge>) }
                </div>
                <div className="flex-1 flex flex-wrap gap-2 text-nowrap">
                  { 
                    data.dishTypes.map((dish: string) => (
                      <div key={nanoid()} className="flex-1 border border-slate-300 font-[600] flex justify-center items-center py-1 px-3 rounded-md">
                        {dish}
                      </div>
                    ))
                  }
                </div>
                {
                  data.source &&
                    <div className="flex gap-2">
                      <Link to={data.source?.url as string} target="_blank">
                        <Earth/>
                      </Link>
                      <p className="text-muted-foreground">{data.source?.name}</p>
                    </div>
                }
              </div>
            </div>
            <div ref={el => sectionRefs.current.description = el} className="pt-6">
              <div className="flex items-end gap-2 mb-2 text-slate-600">
                <h1 className="font-bold text-black text-3xl leading-none">Description</h1>
                <Popover>
                  <PopoverTrigger className="print:hidden">
                    <Info size={20}/>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="size-auto p-0">
                    <p className="p-4 max-w-[300px]">
                      Includes all relevant information about the recipe such as cost per serving, 
                      overall rating, and preparation time.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="indent-8 print:text-lg">{data.description}</p>
            </div>
            <div ref={el => sectionRefs.current.nutrition = el} className="pt-6 break-inside-avoid-page">
              <div className="flex items-end gap-2 mb-2 text-slate-600">
                <h1 className="font-bold text-black text-3xl leading-none">Nutrition</h1>
                <Popover>
                  <PopoverTrigger className="print:hidden">
                    <Info size={20}/>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="size-auto p-0">
                    <p className="p-4 max-w-[300px]">
                      Contains all nutrients contributing to one's daily, 
                      including macronutrients such as calories, carbohydrates, and fats.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-lg">
                  <b>Serving Size</b>: {data.servingSize.amount} {data.servingSize.unit}
                </h1>
                <div className="flex overflow-hidden border border-slate-400 rounded-md *:aspect-square *:w-8">
                  <button onClick={() => count > 1 && setCount(c => c - 1)} className="flex justify-center items-center border-r border-r-slate-400 hover:bg-orange-500 active:bg-orange-700 hover:text-white transition-colors">
                    <Minus size={18}/>
                  </button>
                  <span className="flex justify-center items-center border-r border-r-slate-400">{count}</span>
                  <button onClick={() => setCount(c => c + 1)} className="flex justify-center items-center aspect-square hover:bg-orange-500 active:bg-orange-700 hover:text-white transition-colors">
                    <Plus size={18}/>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border border-slate-400 p-4 rounded-lg">
                {
                  data.nutrition.map((nutrient: Nutrition) => (
                    <div key={nanoid()} className="flex justify-between odd:last:w-full">
                      <div>
                        <span className="font-[500]">{nutrient.name}</span>
                        <span className="text-sm text-muted-foreground font-[300]"> ({nutrient.unit})</span>
                      </div>
                      <span className="bg-orange-500 min-w-[65px] px-3 font-[600] text-white text-center rounded-full">{Math.round(nutrient.amount) * count}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div ref={el => sectionRefs.current.ingredients = el} className="pt-6 break-inside-avoid">
              <div className="flex items-end gap-2 mb-4 text-slate-600">
                <h1 className="font-bold text-black text-3xl leading-none">Ingredients</h1>
                <Popover>
                  <PopoverTrigger className="print:hidden">
                    <Info size={20}/>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="size-auto p-0">
                    <p className="p-4 max-w-[300px]">
                      The list of ingredients <i>required</i> to prepare this recipe.
                      Exact measurements are provided for the best results.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-wrap justify-between gap-3">
                {
                  data.ingredients.map((ingredient: Ingredient) => (
                    <div key={nanoid()} className="overflow-hidden flex-1 min-w-[200px] h-[75px] text-nowrap border border-slate-400 py-2 px-3 rounded-md">
                      <h1 className="text-slate-600 font-[500]">
                        <b className="font-bold text-black text-lg">{ingredient.amount}</b> {ingredient.unit}
                      </h1>
                      <span>{ingredient.name}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div ref={el => sectionRefs.current.instructions = el} className="py-6 break-inside-avoid-page">
              <div className="flex items-end gap-2 mb-4 text-slate-600">
                <h1 className="font-bold text-black text-3xl leading-none">Instructions</h1>
                <Popover>
                  <PopoverTrigger className="print:hidden">
                    <Info size={20}/>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="size-auto p-0">
                    <p className="p-4 max-w-[300px]">
                      The steps needed to complete this recipe. For exact measurements for ingredients,
                      scroll to the ingredients section.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-4">
                {
                  data.instructions.map((instruction: string, index: number) => (
                    <div key={nanoid()} className="flex justify-between gap-3 bg-orange-100 rounded-md p-4">
                      <div className="size-12 flex justify-center items-center text-white font-bold bg-orange-500 rounded-full">
                        {index + 1}
                      </div>
                      <p className="flex-1">{instruction}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
      }
      
      <button 
        className={`peer fixed bottom-4 right-4 ${y ? "opacity-100" : "opacity-0 pointer-events-none"} flex justify-center items-center text-white bg-orange-500 hover:bg-orange-700 hover:scale-110 transition-all rounded-full size-14`}
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={28}/>
      </button>
    </div>
  )
}