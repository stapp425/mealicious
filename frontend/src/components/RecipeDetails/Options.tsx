import { type Recipe } from "@/types/recipe"
import { useFirestoreUpdate } from "@/util/hooks"
import { ArrowDownToLine, Heart, Pencil } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react"

type Props = {
  className?: string
  recipe: Recipe
  content: HTMLDivElement
  isFavorite: boolean,
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
}

const Options: React.FC<Props> = ({ className, recipe, content, isFavorite, setIsFavorite }) => {
  const { toast } = useToast()
  const { isWorking, updateFirestoreDoc } = useFirestoreUpdate()
  const [isPrinterWindowOpen, setIsPrinterWindowOpen] = useState<boolean>(false)
  const handlePrint = useReactToPrint({
    documentTitle: recipe.title.toLowerCase().replace(/ /g, "-"), 
    content: () => content,
    onBeforePrint: () => setIsPrinterWindowOpen(true),
    onAfterPrint: () => setIsPrinterWindowOpen(false)
  })

  async function toggleFavorite() {
    try {
      setIsFavorite(f => !f)
      await updateFirestoreDoc("recipes", recipe.id as string, { isFavorite: !recipe.isFavorite })
    } catch (err: any) {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive"
      })
    }
  }
  
  return (
    <div className={className}>
      <h1 className="hidden md:flex md:flex-col font-bold text-2xl py-2 mb-2">Options</h1>
      <div className="overflow-hidden flex flex-col border border-slate-400 rounded-md">
        <Link
          to={`/recipes/edit/${recipe.id}`}
          className="flex justify-between py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all border-b border-b-slate-400"
        >
          <span className="font-[600]">Edit Recipe</span>
          <Pencil/>
        </Link>
        <button 
          onClick={toggleFavorite}
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
  )
}

export default Options