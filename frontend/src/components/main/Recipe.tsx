import { type Recipe as RecipeType } from "@/util/types/recipe"

type Props = {
  recipe: RecipeType
}

export default function Recipe({ recipe }: Props): React.ReactElement {
  return (
    <div className="border border-slate-400 flex-1 relative overflow-hidden w-48 xl:min-h-48 xl:w-full flex flex-col justify-end items-center gap-2 shadow-md rounded-lg">
      <img 
        src={recipe.image}
        alt={recipe.title}
        className="absolute size-full shadow-md"
      />
      <p className="z-10 bg-white min-w-[50px] py-1 px-2 rounded-sm text-xs text-center font-[600] text-slate-600">
        {recipe.servingSize.amount} {recipe.servingSize.unit}
      </p>
      <div className="z-10 w-full min-h-[50px] bg-white p-1 flex justify-center items-center">
        <h1 className="font-[600] text-center line-clamp-2 text-[100%]">{recipe.title}</h1>
      </div>
    </div>
  )
}