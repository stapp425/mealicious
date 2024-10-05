import { AppContext } from "@/App"
import { cn } from "@/lib/utils"
import { useScroll } from "@/util/hooks"
import { useContext } from "react"

type SectionBarProps = {
  className?: string
  main: HTMLDivElement
  description: HTMLDivElement
  nutrition: HTMLDivElement
  ingredients: HTMLDivElement
  instructions: HTMLDivElement
}

const SectionBar: React.FC<SectionBarProps> = ({ className, main, description, nutrition, ingredients, instructions }) => {
  const { screenSizes: { lg } } = useContext(AppContext)
  const { y } = useScroll()
  
  function checkBounds(element: HTMLDivElement) {
    const top = element?.getBoundingClientRect().top + y - (lg ? 0 : 100)
    const bottom = top + element?.offsetHeight
    
    return (y >= top && y < bottom)
  }

  function handleChange(element: HTMLDivElement) {
    const position = (element.getBoundingClientRect().top || 0) + scrollY - (lg ? 0 : 100)

    scrollTo({ top: position, behavior: "smooth" })
  }

  return (
    <div className={cn("rounded-md", className)}>
      <h1 className="font-bold text-3xl py-2 px-3">Quick Scroll</h1>
      <div className="flex flex-col *:p-3">
        <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-l-[6px] has-[:checked]:border-l-orange-500 transition-all">
          <input 
            type="radio"
            name="section"
            value="main"
            checked={checkBounds(main)}
            onChange={() => main != null && handleChange(main)}
            className="hidden"
          />
          <span className="font-[600]">Main</span>
        </label>
        <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-l-[6px] has-[:checked]:border-l-orange-500 transition-all">
          <input 
            type="radio"
            name="section"
            value="description"
            checked={description != null && checkBounds(description)}
            onChange={() => description != null && handleChange(description)}
            className="hidden"
          />
          <span className="font-[600]">Description</span>
        </label>
        <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-l-[6px] has-[:checked]:border-l-orange-500 transition-all">
          <input 
            type="radio"
            name="section"
            value="nutrition"
            checked={nutrition != null && checkBounds(nutrition)}
            onChange={() => nutrition != null && handleChange(nutrition)}
            className="hidden"
          />
          <span className="font-[600]">Nutrition</span>
        </label>
        <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-l-[6px] has-[:checked]:border-l-orange-500 transition-all">
          <input 
            type="radio"
            name="section"
            value="ingredients"
            checked={ingredients != null && checkBounds(ingredients)}
            onChange={() => ingredients != null && handleChange(ingredients)}
            className="hidden"
          />
          <span className="font-[600]">Ingredients</span>
        </label>
        <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-l-[6px] has-[:checked]:border-l-orange-500 transition-all">
          <input 
            type="radio"
            name="section"
            value="instructions"
            checked={instructions != null && checkBounds(instructions)}
            onChange={() => instructions != null && handleChange(instructions)}
            className="hidden"
          />
          <span className="font-[600]">Instructions</span>
        </label>
      </div>
    </div>
  )
}

export default SectionBar