import { useFirestoreUpdate } from "@/util/hooks"
import { ArrowDownToLine, Heart, Pencil } from "lucide-react"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import { useToast } from "@/components/ui/use-toast"
import * as React from "react"
import { RecipeDetailsContext } from "./RecipeDetails"
import Spinner from "../theme/Spinner"
import { cn } from "@/lib/utils"

type OptionsProps = {
  className?: string
  printContent: HTMLDivElement
}

const Options: React.FC<OptionsProps> = ({ className, printContent }) => (
  <div className={cn("sticky top-[100px] left-0 lg:static shadow-md lg:shadow-none bg-white", className)}>
    <h1 className="hidden lg:block font-bold text-2xl px-3 py-2">Options</h1>
    <div className="w-full overflow-hidden flex justify-between *:flex-1 lg:block border-none lg:border border-slate-400">
      <Edit/>
      <Favorite/>
      <Save printContent={printContent}/>
    </div>
  </div>
)

const Edit: React.FC = () => (
  <Link
    to={`/recipes/edit/${useContext(RecipeDetailsContext).data.id}`}
    className="flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all lg:border-y lg:border-y-slate-400"
  >
    <span className="font-[600]">Edit Recipe</span>
    <Pencil/>
  </Link>
)

const Favorite: React.FC = () => {
  const { data: { id, isFavorite }, setData: setRecipe } = useContext(RecipeDetailsContext)
  const { toast } = useToast()
  const { isWorking, updateFirestoreDoc } = useFirestoreUpdate()
  
  async function toggleFavorite() {
    try {
      setRecipe(r => ({ ...r, isFavorite: !isFavorite }))
      await updateFirestoreDoc("recipes", id as string, { isFavorite: !isFavorite })
    } catch (err: any) {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive"
      })
    }
  }

  return (
    <button 
      onClick={toggleFavorite}
      disabled={isWorking}
      className="disabled:cursor-wait w-full flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all lg:border-b lg:border-b-slate-400"
    >
      <span className="font-[600]">{isFavorite ? "Unfavorite" : "Favorite"}</span>
      <Heart/>
    </button>
  )
}

const Save: React.FC<{ printContent: HTMLDivElement }> = ({ printContent }) => {
  const { data: recipe } = useContext(RecipeDetailsContext)
  const [isPrinterWindowOpen, setIsPrinterWindowOpen] = useState<boolean>(false)
  const handlePrint = useReactToPrint({
    documentTitle: recipe.title.toLowerCase().replace(/ /g, "-"), 
    content: () => printContent,
    onBeforePrint: () => setIsPrinterWindowOpen(true),
    onAfterPrint: () => setIsPrinterWindowOpen(false)
  })

  return (
    <button 
      onClick={handlePrint} 
      disabled={isPrinterWindowOpen}
      className="disabled:cursor-wait w-full flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all"
    >
      <span className="font-[600] flex flex-col lg:inline">{isPrinterWindowOpen ? <><Spinner className="inline mr-1"/> Working on It...</> : "Save as PDF"}</span>
      <ArrowDownToLine/>
    </button>
  )
}

export default Options