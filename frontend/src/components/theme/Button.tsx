import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type ButtonRef = React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>

export type ButtonComponent = {
  Scroll: ButtonRef
} & ButtonRef

const Button: ButtonRef = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn("text-white font-[600] bg-orange-500 rounded-md hover:bg-orange-700 active:bg-orange-800 transition-colors px-4 py-2", className)}
  >
    {children}
  </button>
))

export default Button