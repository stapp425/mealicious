
import { Recipe } from "@/util/types/recipe"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { 
  Clock, Microwave, 
  Clipboard, Earth
} from "lucide-react"

type DetailsProps = {
  recipe: Recipe
}

const Details: React.FC<DetailsProps> = ({ recipe }) => (
  <div className="size-full space-y-3">
    <img
      src={recipe.image}
      alt={recipe.title}
      className="size-full min-h-[150px] max-h-[300px] object-cover md:rounded-md"
    />
    <div className="flex justify-between items-center gap-2 rounded-md *:flex-1 *:flex-col *:p-2 *:justify-center *:items-center *:bg-orange-500 *:text-white *:rounded-md px-3">
      <div className="flex gap-1">
        <Clock/>
        <div className="text-center">
          <p>
            <b>{recipe.times.readyTime}</b> mins
          </p>
        </div>
      </div>
      <div className="flex gap-1">
        <Microwave/>
        <div className="text-center">
          <b>{recipe.times.cookTime || "-"}</b>
        </div>
      </div>
      <div className="flex gap-1">
        <Clipboard/>
        <div className="text-center">
          <p>
            {recipe.times.prepTime > 0 ? <><b>{recipe.times.prepTime}</b> mins</> : <b>-</b>}
          </p>
        </div>
      </div>
    </div>
    <DialogTitle className="font-bold text-md md:text-xl text-center md:text-left px-3">
      {recipe.title}
    </DialogTitle>
    {
      recipe.diets &&
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-1 gap-y-2 px-3">
        {recipe.diets?.map((diet, index) => <Badge key={index} className="line-clamp-1 pointer-events-none bg-orange-500">{diet}</Badge>)}
      </div>
    }
    {
      recipe.dishTypes &&
      <div className="group grid grid-cols-2 gap-2 mt-2 *:border *:border-slate-300 *:rounded-sm group-hover:bg-orange-500 px-3">
        {
          recipe.dishTypes?.map((dish, index) => (
            <h1 key={index} className=" hover:cursor-default border border-slate-400 hover:bg-orange-500 hover:text-white transition text-center py-2 px-3 odd:last:col-span-2">
              {dish}
            </h1>
          ))
        }
      </div>
    }
    <div className="flex items-center gap-2 px-3">
      <Link to={recipe.source?.url as string} target="_blank" className="flex justify-center items-center size-8 my-2">
        <Earth size={32} className="text-muted-foreground hover:scale-110 transition"/>
      </Link>
      <p>{recipe.source?.name}</p>
    </div>
    <div className="space-y-2 px-3">
      <h1 className="text-2xl font-bold mx-0 my-1">Description</h1>
      <DialogDescription className="text-base text-black">
        {recipe.description}
      </DialogDescription>
    </div>
    <div className="px-3 pb-3 space-y-3">
      <div className="overflow-hidden bg-orange-100 p-4 flex flex-col rounded-lg">
        <h1 className="text-3xl font-bold">Nutrition</h1>
        <p className="text-sm">Serving Size: {`${recipe.servingSize.amount}${recipe.servingSize.unit}`}</p>
        {
          recipe.nutrition.map((nutrition, index) => (
            <div key={index} className="flex justify-between my-2">
              <h1 className="text-lg">{nutrition.name} <span className="text-sm text-muted-foreground">({nutrition.unit})</span></h1>
              <h1 className="bg-orange-500 px-4 w-16 font-medium text-white rounded-full text-center pointer-events-none">
                {Math.round(nutrition.amount)}
              </h1>
            </div>
          ))
        }
      </div>
      <div className="flex flex-col p-4 border-2 border-slate-200 rounded-md">
        <h1 className="font-bold text-2xl">Ingredients</h1>
        <div className="flex flex-col gap-2">
          {
            recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="bg-slate-200 rounded-md text-center py-2 px-1">
                <p className="font-bold text-sm text-muted-foreground">
                  {ingredient.amount} {ingredient.unit}
                </p>
                <h1 className="text-md font-bold text-wrap">{ingredient.name}</h1>
              </div>
            ))
          }
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-orange-100 rounded-lg">
        <h1 className="font-bold text-2xl">Instructions</h1>
        <div className="flex flex-col gap-5">
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="sticky top-0 flex justify-center items-center size-8 bg-orange-500 p-4 text-white rounded-full">
                {index + 1}
              </div>
              <p>
                {instruction}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default Details