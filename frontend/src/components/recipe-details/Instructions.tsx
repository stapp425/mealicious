import { forwardRef } from "react"
import Tip from "../theme/Tip"
import { cn } from "@/lib/utils"

type InstructionsProps = {
  className?: string
  instructions: string[]
}

const Instructions = forwardRef<HTMLDivElement, InstructionsProps>(({ className, instructions }, ref) => (
  <div ref={ref} className={cn("break-inside-avoid-page", className)}>
    <div className="flex items-end gap-2 mb-4 text-slate-600">
      <h1 className="font-bold text-black text-3xl leading-none">Instructions</h1>
      <Tip>
        The steps needed to complete this recipe. For exact measurements for ingredients,
        scroll to the ingredients section.
      </Tip>
    </div>
    <div className="flex flex-col gap-4">
      {
        instructions.map((instruction, index) => (
          <div key={index} className="flex justify-between gap-3 bg-orange-100 rounded-md p-4">
            <div className="size-12 flex justify-center items-center text-white font-bold bg-orange-500 rounded-full">
              {index + 1}
            </div>
            <p className="flex-1">{instruction}</p>
          </div>
        ))
      }
    </div>
  </div>
))

export default Instructions