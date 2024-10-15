import { type ReactHookFormTypes } from "@/util/types/form"
import { type Meal } from "@/util/types/meal"
import { cn } from "@/lib/utils"
import { useWatch } from "react-hook-form"
import { useInputChange } from "@/util/hooks"
import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type TagProps = Pick<ReactHookFormTypes<Meal>, "control" | "setValue"> & React.HTMLAttributes<HTMLDivElement>

type Tag = {
  tag: ""
}

const Tag: React.FC<TagProps> = ({ control, className, setValue, ...props }) => {
  const { input, handleChange, isEditActive, setIsEditActive } = useInputChange<Tag>({ tag: "" })
  
  const tags = useWatch({
    control,
    name: "tags"
  })

  function handleEnterPress(event: React.KeyboardEvent) {
    if(input.tag && tags && event.key === "Enter")
      setValue("tags", [...tags, input.tag])
  } 

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <AnimatePresence>
        { 
          tags?.map((tag, index) => (
            <motion.button
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              type="button"
              onClick={() => {setValue("tags", tags.filter(t => t !== tag))}}
              className="h-5 bg-orange-500 hover:bg-red-500 text-white text-xs font-[600] px-2 rounded-full transition-colors"
            >
              {tag}
            </motion.button>
          ))
        }
        {
          isEditActive
            ? <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2 items-center"
              >
                <input
                  name="tag"
                  value={input.tag}
                  onChange={handleChange}
                  onKeyDown={handleEnterPress}
                  autoComplete="off"
                  className="h-5 w-[125px] bg-orange-500 text-white font-[600] text-xs rounded-full px-2"
                />
                <button
                  type="submit"
                  onClick={() => setIsEditActive(false)}
                  className="text-red-500 text-sm font-[600]"
                >
                  Cancel
                </button>
              </motion.div>
            : <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditActive(true)}
                className="size-5 flex justify-center items-center bg-orange-500 text-white rounded-sm hover:bg-orange-700 active:bg-orange-800 transition-colors"
              >
                <Plus size={14}/>
              </motion.button>
        }
      </AnimatePresence>
      
    </div>
  )
}

export default Tag