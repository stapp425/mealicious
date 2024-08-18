import { useScroll } from "@/util/hooks"

type Props = {
  className?: string
  title: HTMLDivElement
  description: HTMLDivElement
  nutrition: HTMLDivElement
  ingredients: HTMLDivElement
  instructions: HTMLDivElement
}

const SectionBar: React.FC<Props> = ({ className, title, description, nutrition, ingredients, instructions }) => {
  const { y } = useScroll()
  
  function checkBounds(element: HTMLDivElement) {
    return y >= element?.getBoundingClientRect().top + y - 150 && y < element?.getBoundingClientRect().top + y - 150 + element?.offsetHeight
  }

  function handleChange(element: HTMLDivElement) {
    const position = (element.getBoundingClientRect().top || 0) + scrollY - 150

    scrollTo({ top: position, behavior: "smooth" })
  }

  return (
    <div className={className}>
      <div>
        <h1 className="hidden md:flex md:flex-col font-bold text-3xl py-2 px-3">Quick Scroll</h1>
        <div className="flex flex-col *:p-3">
          <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
            <input 
              type="radio"
              name="section"
              value="title"
              checked={checkBounds(title)}
              onChange={() => title != null && handleChange(title)}
              className="hidden"
            />
            <span className="font-[600]">Title</span>
          </label>
          <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
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
          <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
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
          <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
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
          <label className="hover:cursor-pointer hover:bg-slate-200 has-[:checked]:hover:bg-orange-200 has-[:checked]:bg-orange-100 has-[:checked]:border-r-[6px] has-[:checked]:border-r-orange-500 transition-all">
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
    </div>
  )
}

export default SectionBar