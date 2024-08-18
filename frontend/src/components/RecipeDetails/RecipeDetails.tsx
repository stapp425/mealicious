import { useEffect, useRef, useState } from "react"
import { useFirestoreGet, useScroll } from "@/util/hooks"
import { useParams } from "react-router-dom"
import { defaultRecipe, Recipe } from "@/types/recipe"
import { ArrowUp } from "lucide-react"
import Title from "./Title"
import Description from "./Description"
import Nutrition from "./Nutrition"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import Options from "./Options"
import Sections from "./Sections"

export default function RecipeDetails(): React.ReactElement {
  const { y } = useScroll()
  const { recipeId } = useParams()
  const { data } = useFirestoreGet<Recipe>(defaultRecipe, { name: "recipes", id: recipeId as string })
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const nutritionRef = useRef<HTMLDivElement>(null)
  const ingredientsRef = useRef<HTMLDivElement>(null)
  const instructionsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    data.isFavorite && 
    setIsFavorite(data.isFavorite)
  }, [data])
  
  return (
    <div className="relative flex">
      <div className="sticky top-[150px] left-0 border-r border-r-slate-300 w-1/4 max-w-[300px] h-[calc(100vh-150px)] flex flex-col pt-3">
        <Sections
          title={titleRef.current as HTMLDivElement}
          description={descriptionRef.current as HTMLDivElement}
          nutrition={nutritionRef.current as HTMLDivElement}
          ingredients={ingredientsRef.current as HTMLDivElement}
          instructions={instructionsRef.current as HTMLDivElement}
        />
        <Options
          content={contentRef.current as HTMLDivElement}
          recipe={data}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          className="px-3"
        />
      </div>
      <div ref={contentRef} className="h-min flex-1 flex flex-col *:max-w-[1000px] *:print:p-6 *:print:max-w-none *:print:w-full *:px-6">
        <Title
          ref={titleRef}
          title={data.title}
          isFavorite={isFavorite}
          image={data.image}
          times={data.times}
          diets={data.diets}
          dishTypes={data.dishTypes}
          source={data.source}
          className="h-fit flex gap-3 pt-6"
        />
        <Description
          ref={descriptionRef}
          description={data.description}
          className="pt-6"
        />
        <Nutrition
          ref={nutritionRef}
          servingSize={data.servingSize}
          nutrition={data.nutrition}
          className="pt-6 break-inside-avoid-page"
        />
        <Ingredients
          ref={ingredientsRef}
          ingredients={data.ingredients}
          className="pt-6 break-inside-avoid"
        />
        <Instructions
          ref={instructionsRef}
          instructions={data.instructions}
          className="py-6 break-inside-avoid-page"
        />
      </div>
      <button 
        className={`peer fixed bottom-4 right-4 ${y ? "opacity-100" : "opacity-0 pointer-events-none"} flex justify-center items-center text-white bg-orange-500 hover:bg-orange-700 hover:scale-110 transition-all rounded-full size-14`}
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={28}/>
      </button>
    </div>
  )
}