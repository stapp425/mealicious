import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

type ErrorComponent = {
  Label: React.FC<React.HTMLAttributes<HTMLDivElement>>
} & React.FC<React.HTMLAttributes<HTMLDivElement>>

const Error: ErrorComponent = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-1.5 font-bold text-red-500 text-xs", className)}>
      <i className="fa-solid fa-circle-exclamation"/>
      {children}
    </div>
  )
}

Error.Label = ({ children, className }) => (
  <div className={cn("flex gap-2 border bg-red-200 border-red-500 p-3 rounded-sm mt-2", className)}>
    <Info />
    {children}
  </div> 
)

export default Error