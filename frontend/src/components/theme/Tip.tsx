import { Info, Lightbulb } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type TipComponent = {
  Label: React.FC<{ className?: string, children: React.ReactNode }>
} & React.FC<{ children: React.ReactNode }>

const Tip: TipComponent = ({ children }) => (
  <Popover>
    <PopoverTrigger className="print:hidden">
      <Info size={20}/>
    </PopoverTrigger>
    <PopoverContent side="top" className="size-auto p-0">
      <p className="p-4 max-w-[300px]">
        {children}
      </p>
    </PopoverContent>
  </Popover>
)

Tip.Label = ({ className, children }) => (
  <div className={cn("border bg-orange-200 border-orange-500 mt-2 p-3 rounded-sm", className)}>
    <Lightbulb className="inline mr-2"/>
    {children}
  </div>
)

export default Tip