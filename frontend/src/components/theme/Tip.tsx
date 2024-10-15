import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Props = {
  children: React.ReactNode
}

const Tip: React.FC<Props> = ({ children }) => (
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


export default Tip