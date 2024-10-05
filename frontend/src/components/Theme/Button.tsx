import { forwardRef } from "react"
import { useScroll } from "@/util/hooks"
import { cn } from "@/lib/utils"
import { ArrowUp } from "lucide-react"

type ButtonRef = React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>

export type ButtonComponent = {
  Scroll: ButtonRef
} & ButtonRef

const Button: ButtonComponent = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn("text-white font-[600] bg-orange-500 rounded-md hover:bg-orange-700 active:bg-orange-800 transition-colors px-4 py-2", className)}
  >
    {children}
  </button>
)) as ButtonComponent

Button.Scroll = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => {
  const { y } = useScroll()
  
  function scrollToTop() {
    scrollTo({ top: 0, behavior: "smooth" })
  }
  
  return (
    <button
      {...props}
      ref={ref}
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 ${y ? "opacity-100" : "opacity-0 pointer-events-none"} flex justify-center items-center text-white bg-orange-500 hover:bg-orange-700 hover:scale-110 transition-all rounded-full size-14 p-0`}
    >
      <ArrowUp size={28}/>
    </button>
  )
})

export default Button