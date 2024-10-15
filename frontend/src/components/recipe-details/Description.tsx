import { forwardRef } from "react"
import Tip from "../theme/Tip"

type DescriptionProps = {
  className?: string
  children: React.ReactNode
}

const Description = forwardRef<HTMLDivElement, DescriptionProps>(({ className, children }, ref) => (
  <div ref={ref} className={className}>
    <div className="flex items-end gap-2 mb-2 text-slate-600">
      <h1 className="font-bold text-black text-3xl leading-none">Description</h1>
      <Tip>
        Includes all relevant information about the recipe such as cost per serving, 
        overall rating, and preparation time.
      </Tip>
    </div>
    <p className="indent-8 print:text-lg">{children}</p>
  </div>
))

export default Description