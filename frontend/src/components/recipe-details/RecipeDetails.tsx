import { createContext, useContext, useEffect, useRef } from "react"
import { useFirestoreGet } from "@/util/hooks"
import { useParams } from "react-router-dom"
import { defaultRecipe, formatRecipe, type Recipe } from "@/util/types/recipe"
import { Clipboard, Clock, Microwave } from "lucide-react"
import Main from "./Main"
import Description from "./Description"
import Nutrition from "./Nutrition"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import Options from "./Options"
import Sections from "./Sections"
import { AppContext } from "@/App"

export const RecipeDetailsContext = createContext<{data: Recipe, setData: React.Dispatch<React.SetStateAction<Recipe>>}>({data: defaultRecipe, setData: () => {}})

export default function RecipeDetails(): React.ReactElement {
  const { screenSizes: { lg } } = useContext(AppContext)
  const { recipeId } = useParams()
  const { data: recipe, setData: setRecipe } = useFirestoreGet<Recipe>("recipes", recipeId as string, formatRecipe, defaultRecipe)
  const contentRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const nutritionRef = useRef<HTMLDivElement>(null)
  const ingredientsRef = useRef<HTMLDivElement>(null)
  const instructionsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    document.title = `${recipe.title} | Mealicious`
  }, [recipe])
  
  return (
    <RecipeDetailsContext.Provider value={{data: recipe, setData: setRecipe}}>
      <div className="w-screen lg:w-auto relative lg:flex">
        { !lg && <Options printContent={contentRef.current as HTMLDivElement}/> }
        <div ref={contentRef} className="lg:w-[50vw] lg:max-w-[1000px] space-y-6 *:print:p-6 *:print:max-w-none *:print:w-full">
          <Main ref={mainRef} className="lg:px-6 lg:pt-6">
            <Main.Image src={recipe.image} alt={recipe.title}/>
            <div className="space-y-2.5 px-3 lg:px-0">
              <Main.Title>{recipe.title}</Main.Title>
              { recipe.isFavorite && <Main.Favorite/> }
              <Main.Times>
                <Main.Time Icon={Clock}>{recipe.times.readyTime}</Main.Time>
                <Main.Time Icon={Microwave}>{recipe.times.cookTime}</Main.Time>
                <Main.Time Icon={Clipboard}>{recipe.times.prepTime}</Main.Time>
              </Main.Times>
              { recipe.diets && <Main.Diets diets={recipe.diets}/> }
              { recipe.dishTypes && <Main.DishTypes dishTypes={recipe.dishTypes}/> }
              { recipe.source && <Main.Source to={recipe.source.url}>{recipe.source.name}</Main.Source> }
            </div>
          </Main>
          <Description ref={descriptionRef} className="px-3 lg:px-6 break-inside-avoid">{recipe.description}</Description>
          <Nutrition ref={nutritionRef} className="px-3 lg:px-6">
            <Nutrition.Serving>{recipe.servingSize.amount} {recipe.servingSize.unit}</Nutrition.Serving>
            <Nutrition.Content nutrients={recipe.nutrition}/>
          </Nutrition>
          <Ingredients ref={ingredientsRef} ingredients={recipe.ingredients} className="px-3 lg:px-6"/>
          <Instructions
            ref={instructionsRef}
            instructions={recipe.instructions}
            className="px-3 pb-3 lg:px-6 lg:pb-6"
          />
        </div>
        {
          lg && 
          <div className="overflow-hidden w-1/4 max-w-[300px] h-fit sticky top-[24px] left-0 border border-slate-400 mt-6 rounded-md">
            <Sections
              main={mainRef.current as HTMLDivElement}
              description={descriptionRef.current as HTMLDivElement}
              nutrition={nutritionRef.current as HTMLDivElement}
              ingredients={ingredientsRef.current as HTMLDivElement}
              instructions={instructionsRef.current as HTMLDivElement}
              className="hidden md:flex md:flex-col"
            />
            <Options printContent={contentRef.current as HTMLDivElement}/>
          </div>
        }
      </div>
    </RecipeDetailsContext.Provider>
  )
}