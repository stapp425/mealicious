import { type Recipe } from "@/util/types/recipe"
import { type ReactHookFormTypes } from "@/util/types/form"
import { useInputChange } from "@/util/hooks"
import { useWatch } from "react-hook-form"
import { useEffect } from "react"
import { Plus } from "lucide-react"
import Error from "../theme/Error"
import Field from "./Field"

type InstructionsProps = 
  Pick<ReactHookFormTypes<Recipe>, "control" | "setValue" | "error" | "setError" | "clearErrors"> & 
  React.HTMLAttributes<HTMLDivElement>

const Instructions: React.FC<InstructionsProps> = ({ className, control, setValue, error, setError, clearErrors }) => {
  const { input, isEditActive, setIsEditActive, handleChange } = useInputChange<{[key: string]: string}>({ step: "" })
  
  const instructions = useWatch({
    control,
    name: "instructions"
  })

  useEffect(() => {
    if(instructions.length === 0) {
      setError("instructions", {
        type: "missing",
        message: "Instructions must be included for a recipe."
      })
    } else
      clearErrors("instructions")
  }, [instructions])

  return (
    <Field className={className}>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold after:content-['*'] after:text-red-500">Instructions</h1>
          <p className="font-[600] text-muted-foreground">Add instructions to your recipe here.</p>
        </div>
        { 
          isEditActive && 
            <button
              type="button"
              onClick={() => setIsEditActive(false)}
              className="text-red-600 hover:text-red-500 transition-colors font-[600]"
            >
              Cancel
            </button> 
        }
      </div>
      {
        instructions.length > 0 &&
        <div className="flex-1">
          <div className="flex flex-col gap-4 my-2">
            { 
              instructions.map((instruction: string, index: number) => (
                <button
                  type="button" 
                  key={index}
                  onClick={() => setValue("instructions", [...instructions.filter(i => i !== instruction)])}
                  className="group flex justify-between gap-2 bg-orange-200 hover:bg-red-200 rounded-md p-3"
                >
                  <div className="size-10 flex justify-center items-center text-white bg-orange-500 group-hover:bg-red-500 p-3 rounded-full">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-left">{instruction}</p>
                </button>
              ))
            }
          </div>
        </div>
      }
      {
        isEditActive
        ? <div className="h-fit flex justify-between gap-3">
            <textarea
              name="step"
              value={input.step}
              placeholder="Add an instruction here..."
              autoComplete="off"
              onChange={handleChange}
              className="flex-1 h-10 resize-none focus:resize-y border border-slate-300 p-2 rounded-md"
              autoFocus
            />
            <button
              type="button" 
              onClick={() => input && setValue("instructions", [...instructions, input.step])}
              className="aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
            >
              <Plus size={18}/>
            </button>
          </div>
        : <button
            type="button" 
            onClick= {() => setIsEditActive(true)}
            className="w-full h-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md"
          >
            <Plus size={18}/>
          </button>
      }
      { 
        error.instructions &&
        <Error.Label>
          {error.instructions.message}
        </Error.Label> 
      }
    </Field>
  )
}

export default Instructions