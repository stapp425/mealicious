import { cn } from "@/lib/utils"

type Props = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement | HTMLFormElement>

const Container: React.FC<Props> = ({ className, children, ...props }) => (
  <div className={cn("h-[100vh-100px] lg:h-screen", className)} {...props}>{children}</div>
)

export default Container