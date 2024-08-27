import * as dateFns from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props =  {
  day: Date
  children: React.ReactNode
}

const Box: React.FC<Props> = ({ day, children }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="size-3 bg-orange-500 rounded-md hover:scale-[120%] transition-transform"/>
      </DialogTrigger>
      <DialogContent className="min-w-[400px] min-h-[560px]">
        <DialogTitle>
          Events
        </DialogTitle>
        <DialogDescription>
          {dateFns.format(day, "MMMM dd, yyyy")}
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Box