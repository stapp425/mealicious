import { cn } from "@/lib/utils"

type Props = {
	children: React.ReactNode
	className?: string
}

const Field: React.FC<Props> = ({ children, className }) => {  
  return (
		<div className={cn("flex flex-col justify-between gap-2 border border-orange-300 p-4 rounded-md", className)}>
			{ children }
		</div>
	)
}

export default Field