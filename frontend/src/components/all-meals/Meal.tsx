import { type Meal } from "@/util/types/meal"
import { Recipe, NotFound } from "./Recipe"
import Menu from "./Menu"

type MealProps = {
  meal: Meal
}

const Meal: React.FC<MealProps> = ({ meal }) => (
  <div className="relative w-full h-fit border border-orange-500 rounded-md p-3 lg:p-6 space-y-2">
    <div className="select-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-lg font-[600] px-6 rounded-full">{meal.time}</div>
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-2xl">{meal.title}</h1>
      <Menu 
        meal={meal}
        id={meal.id as string}
      />
    </div>
    <div className="flex flex-wrap gap-2">
      {
        meal.tags?.map((tag, index) => 
          <div key={index} className="bg-orange-500 text-white font-[600] text-xs px-2 rounded-full">
            {tag}
          </div>
        )
      }
    </div>
    <p className="text-muted-foreground font-[600]">
      {meal.description}
    </p>
    <div className="flex flex-col gap-4">
      {
        meal.contents.map((content, index) => 
          content.recipe.title
            ? <Recipe key={index} recipe={content.recipe}/>
            : <NotFound key={index} id={content.recipe.id as string}/>
        )
      }
    </div>
  </div>
)

export default Meal