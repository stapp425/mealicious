import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface  Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, Props>(({ className, children, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cn("text-white font-[600] bg-orange-500 rounded-md hover:bg-orange-700 active:bg-orange-800 transition-colors px-4 py-2", className)}
    >
      {children}
    </button>
  )
}) 

export default Button