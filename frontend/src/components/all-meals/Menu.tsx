import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { EllipsisVertical, Pencil, Trash } from "lucide-react"
import { Separator } from "../ui/separator"
import { Link } from "react-router-dom"
import { type Meal } from "@/util/types/meal"

type MenuProps = {
  meal: Meal
  id: string
  removeMeal: () => void
}

const Menu: React.FC<MenuProps> = ({ id, removeMeal }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white p-2 rounded-sm transition-colors">
        <EllipsisVertical/>
      </button>
    </PopoverTrigger>
    <PopoverContent className="border-slate-300 overflow-hidden size-fit p-0 shadow-lg" side="right" align="start" sideOffset={12}>
      <div className="w-[150px]">
        <Link className="flex justify-between font-[600] p-4 hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors" to={`/meals/edit/${id}`}>
          <Pencil/>
          <span>Update</span>
        </Link>
        <Separator className="relative mx-auto w-[85%]"/>
        <AlertDialog>
          <AlertDialogTrigger className="w-full flex justify-between font-[600] hover:bg-red-500 active:bg-red-600 hover:text-white transition-colors p-4">
            <Trash/>
            <span>Delete</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-bold text-2xl">
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                Deleting this meal will permanently remove it from our servers! No changes will be made with the recipes within.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={removeMeal} className="bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PopoverContent>
  </Popover>
)

export default Menu