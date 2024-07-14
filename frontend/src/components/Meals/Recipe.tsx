import { type Recipe as RecipeType } from "@/types/recipe"

type Props = {
  recipe: RecipeType
}

export default function Recipe({ recipe }: Props): React.ReactElement {
  return (
    <div className="flex-1 relative overflow-hidden h-full xl:h-48 max-w-48 xl:w-full xl:max-w-none flex flex-col justify-end items-center gap-2 shadow-md rounded-lg">
      <img 
        src={recipe.image}
        alt={recipe.title}
        className="absolute size-full shadow-md"
      />
      <div className="z-10 flex justify-between gap-4">
        <p className="bg-white min-w-[50px] py-1 px-2 rounded-sm text-[min(1.25vw,_14px)] text-center text-slate-600"><b>{Math.round(recipe.nutrition[0].amount)}</b> cal</p>
        <p className="bg-white min-w-[50px] py-1 px-2 rounded-sm text-[min(1.25vw,_14px)] text-center text-slate-600"><b>{recipe.servingSize.amount}</b> {recipe.servingSize.unit}</p>
      </div>
      <div className="z-10 w-full min-h-[50px] bg-white p-1 flex justify-center items-center">
        <h1 className="font-[600] text-center line-clamp-2 text-[100%]">{recipe.title}</h1>
      </div>
    </div>
  )
}