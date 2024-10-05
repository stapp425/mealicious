import { cn } from "@/lib/utils"

const Field: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
	<div 
		className={cn("flex flex-col justify-between gap-2 border border-orange-400 p-4 rounded-md", className)}
		{...props}
	>
		{ children }
	</div>
)

export default Field