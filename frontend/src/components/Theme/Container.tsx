import { cn } from "@/lib/utils"

type ContainerComponent = {
  Form: React.FC<Props & React.HTMLAttributes<HTMLFormElement>> 
} & React.FC<Props & React.HTMLAttributes<HTMLDivElement>>

type Props = {
  className?: string
} 

const Container: ContainerComponent = ({ className, children, ...props }) => (
  <div className={cn("relative overflow-x-hidden w-full md:w-auto min-h-site-container lg:min-h-screen", className)} {...props}>{children}</div>
)

Container.Form = ({ className, children, ...props }) => (
  <form className={cn("relative overflow-x-hidden w-full md:w-auto min-h-site-container lg:min-h-screen", className)} {...props}>{children}</form>
)

export default Container