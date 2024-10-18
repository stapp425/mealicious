import { type Recipe } from "@/util/types/recipe"
import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import Spinner from "../theme/Spinner"

type DeleteProps = {
  isDeleting: boolean
  deleteRecipe: (recipe: Recipe) => void
  recipe: Recipe
}

const Delete: React.FC<DeleteProps> = ({ isDeleting, recipe, deleteRecipe }) => (
  <AlertDialog>
    <AlertDialogTrigger className="w-full" asChild>
      <button className="flex justify-between items-center gap-2 py-1 px-2 text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition rounded-md">
        <span className="font-[600] text-sm">Delete</span>
        <Trash2 size={18}/>
      </button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="font-bold text-2xl">
          Are you sure?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-base">
          Deleting this recipe will permanently remove it! This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction 
          onClick={() => deleteRecipe(recipe)}
          className="bg-red-500"
        >
          { 
            isDeleting
              ? <div>
                  <span>Working on it...</span>
                  <Spinner/> 
                </div>
              : "Continue" 
          }
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

export default Delete