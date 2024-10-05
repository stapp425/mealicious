import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import Button, { ButtonComponent } from "./Button"

type PlaceholderComponent = {
  Message: React.FC<Omit<PlaceholderProps, "icon">>
  Tip: React.FC<Omit<PlaceholderProps, "icon">>
  Action: ButtonComponent
} & React.FC<PlaceholderProps>

type PlaceholderProps = {
  className?: string
  children: ReactNode
  icon: ReactNode
}

const Placeholder: PlaceholderComponent = ({ className, icon, children }) => (
  <div className={cn("flex flex-col justify-center items-center gap-3 bg-slate-200 text-slate-600 font-[600] text-2xl py-4 rounded-lg", className)}>
    {icon}
    {children}
  </div>
)

Placeholder.Message = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
)

Placeholder.Tip = ({ className, children }) => (
  <p className={cn("text-sm font-[500]", className)}>{children}</p>
)

Placeholder.Action = Button

export default Placeholder