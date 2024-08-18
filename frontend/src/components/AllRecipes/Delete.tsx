import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import Spinner from "../ui/Spinner"

type Props = {
  isDeleting: boolean
  deleteRecipe: (id: string) => void
  id: string
}

const Delete: React.FC<Props> = ({ isDeleting, id, deleteRecipe }) => {  
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <button className="flex justify-between items-center gap-2 py-1 px-2 text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition rounded-md">
          <span className="font-[600] text-sm">Delete</span>
          <Trash2 size={18}/>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h1 className="font-bold text-2xl">Are you sure?</h1>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-base">
              Deleting this recipe will permanently remove it! Note that this recipe will still exist in some meals and plans after deletion.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => deleteRecipe(id)}
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
}

export default Delete