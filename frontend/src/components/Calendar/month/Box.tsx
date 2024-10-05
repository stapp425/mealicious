import * as dateFns from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type BoxProps =  {
  day: Date
  children: React.ReactNode
}

const Box: React.FC<BoxProps> = ({ day, children }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="size-3 bg-orange-500 rounded-md hover:scale-[120%] transition-transform"/>
      </DialogTrigger>
      <DialogContent className="min-w-[400px] min-h-[560px] space-y-1">
        <DialogTitle className="font-bold text-3xl">
          Events
        </DialogTitle>
        <DialogDescription className="font-[600]">
          {dateFns.format(day, "MMMM dd, yyyy")}
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Box