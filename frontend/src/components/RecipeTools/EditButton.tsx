import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"

type Props = {
  className?: string
  onClick: () => void
}

const EditButton: React.FC<Props> = ({ onClick, className }) => (
  <button
    type="button"
    onClick={() => onClick()}
    className={cn("group text-slate-600", className)}
  >
    <Pencil className="group-hover:text-orange-500 transition-colors"/>
  </button>
)

export default EditButton