import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
}

const Description: React.FC<Props> = ({ children, className }) => (
  <p className={cn("text-muted-foreground font-[600]", className)}>
    { children }
  </p>
)

export default Description