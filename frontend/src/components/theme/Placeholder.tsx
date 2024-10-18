import { forwardRef } from 'react'
import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import Button, { ButtonRef } from "./Button"
import { RefComponent } from '@/util/types/app'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

type PlaceholderComponent = {
  Message: React.FC<Omit<PlaceholderProps, "icon">>
  Tip: React.FC<Omit<PlaceholderProps, "icon">>
  Action: ButtonRef
} & RefComponent<HTMLDivElement, PlaceholderProps>

type PlaceholderProps = {
  className?: string
  children: ReactNode
  icon?: ReactNode
}

const Placeholder: PlaceholderComponent = forwardRef<HTMLDivElement, PlaceholderProps>(({ className, icon = <X size={64}/>, children }, ref) => (
  <div ref={ref} className={cn("flex flex-col justify-center items-center gap-3 bg-slate-200 text-slate-600 font-[600] text-2xl py-4 rounded-lg", className)}>
    {icon}
    {children}
  </div>
)) as PlaceholderComponent

export const MotionPlaceholder = motion(Placeholder)

Placeholder.Message = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
)

Placeholder.Tip = ({ className, children }) => (
  <p className={cn("text-sm font-[500]", className)}>{children}</p>
)

Placeholder.Action = Button

export default Placeholder