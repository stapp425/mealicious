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
import { cn } from "@/lib/utils"
import { EllipsisVertical, Trash } from "lucide-react"

type MenuType = React.FC<MenuProps> & {
  Option: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
  Delete: React.FC<DeleteProps>
}

type MenuProps = {
  triggerClassName?: string
  contentClassName?: string
  children?: React.ReactNode
}

type DeleteProps = {
  onAction: () => void
}

const Menu: MenuType = ({ triggerClassName, contentClassName, children }) => {
  return (
    <Popover>
      <PopoverTrigger className={triggerClassName}>
        <EllipsisVertical size={16}/>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className={cn("size-fit", contentClassName)}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

const Option: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {    
  return (
    <button
      className={cn("flex justify-between items-center gap-6", className)}
      {...props}
    >
      {children}
    </button>
  )
}

const Delete: React.FC<DeleteProps> = ({ onAction }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Option className="font-[600] hover:bg-red-500 active:bg-red-600 hover:text-white transition-colors p-4">
          <Trash/>
          <span>Delete</span>
        </Option>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h1 className="font-bold text-2xl">Are you sure?</h1>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-base">
              Deleting this plan will permanently remove it from our servers! No changes will be made with any of the content within.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAction} className="bg-red-500">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 

Menu.Option = Option
Menu.Delete = Delete

export default Menu