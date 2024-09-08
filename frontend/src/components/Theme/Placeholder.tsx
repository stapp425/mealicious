import { type FC, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import Button, { Props as ButtonProps } from "./Button"

type PlaceholderProps = {
  className?: string
  children: ReactNode
  icon: ReactNode
}

const Root: FC<PlaceholderProps> = ({ className, icon, children }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center gap-3 border-2 border-dashed border-slate-400 bg-slate-200 text-slate-600 font-[600] text-2xl py-4 rounded-lg", className)}>
      {icon}
      {children}
    </div>
  )
}

type MessageProps = {
  className?: string
  children: ReactNode
}

const Message: FC<MessageProps> = ({ className, children }) => {
  return <h1 className={className}>{children}</h1>
}

type TipProps = {
  className?: string
  children: ReactNode
}

const Tip: FC<TipProps> = ({ className, children }) => (
  <p className={cn("text-sm font-[500]", className)}>{children}</p>
)

const Action: FC<ButtonProps> = Button

export {
  Root,
  Message,
  Tip,
  Action
}