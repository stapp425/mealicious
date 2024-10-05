import { type Meal as MealType } from "@/util/types/meal"

type MealProps = {
  meal: MealType
}

const Meal: React.FC<MealProps> = ({ meal }) => (
  <div className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-slate-300 [&:not(:last-child)]:pb-3 pt-3">
    <div className="flex justify-between items-center">
      <h1 className="font-[600]">
        {meal.title}
      </h1>
      <div className=" text-center min-w-[75px] bg-orange-500 text-sm text-white font-[600] px-2 rounded-sm">
        {meal.time}
      </div>
    </div>
    {
      meal.tags && 
      <div className="flex gap-2">
        {
          meal.tags.map(tag =>
            <div className="text-white bg-orange-500 font-[600] text-xs px-2 rounded-full">
              {tag}
            </div>
          )
        }
      </div>
    }
    <div className="space-y-2 my-2">
      {
        meal.contents.map(content => 
          <h3 className="border border-slate-400 p-2 rounded-md">
            {content.recipe.title}
          </h3>
        )
      }
    </div>
  </div>
)

export default Meal