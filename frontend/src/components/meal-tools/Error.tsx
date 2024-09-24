import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: React.ReactNode
}

const Error: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2 font-bold text-red-500 text-sm", className)}>
      <i className="fa-solid fa-circle-exclamation"/>
      {children}
    </div>
  )
}

export default Error