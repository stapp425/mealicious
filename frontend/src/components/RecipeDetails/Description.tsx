import { forwardRef } from "react"
import Tip from "./Tip"

type Props = {
  className?: string
  description: string
}

const Description = forwardRef<HTMLDivElement, Props>(({ className, description }, ref) => {
  return (
    <div ref={ref} className={className}>
      <div className="flex items-end gap-2 mb-2 text-slate-600">
        <h1 className="font-bold text-black text-3xl leading-none">Description</h1>
        <Tip>
          Includes all relevant information about the recipe such as cost per serving, 
          overall rating, and preparation time.
        </Tip>
      </div>
      <p className="indent-8 print:text-lg">{description}</p>
    </div>
  )
})

export default Description