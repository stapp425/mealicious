import { useEffect, useRef } from "react"
import { type Recipe } from "@/util/types/recipe"
import { type Image } from "@/util/types/app"
import { type ReactHookFormTypes } from "@/util/types/form"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import Error from "../theme/Error"
import * as Placeholder from "../theme/Placeholder"

type ImageProps = {
  image: Image
  setImage: React.Dispatch<React.SetStateAction<Image>>
} & Pick<ReactHookFormTypes<Recipe>, "name" | "register" | "error" | "setValue">
& React.HTMLAttributes<HTMLDivElement>

const Image: React.FC<ImageProps> = ({ className, name = "image", register, error, setValue, image, setImage, ...props }) => {
  const addImageButton = useRef<HTMLInputElement>(null)

  function getImageDetails(image: File) {
    const name = image.name
    const parsedName = name?.split(".")
    
    return {
      name: parsedName?.slice(0, parsedName.length - 1).join(""),
      type: parsedName?.[parsedName.length - 1].toUpperCase()
    }
  }
  
  function handleImageInsert(event: React.ChangeEvent<HTMLInputElement>) {
    const addedImage = event.target.files?.[0]

    // images can't be more than 5MB in size
    if(addedImage && addedImage.size <= 5 * 1024 * 1024) {
      setImage(i => ({ ...i, file: addedImage }))
    }
  }
  
  useEffect(() => {
    if(image.file) {
      const url = URL.createObjectURL(image.file)
      const { name, type } = getImageDetails(image.file)
      setImage(i => ({
        ...i,
        name: name,
        type: type,
        url: url
      }))
      
      setValue("image", url)
    }

    return () => URL.revokeObjectURL(image.url)
  }, [image.file])
  
  return (
    <div
      {...props}
      className={cn(`h-[375px] overflow-hidden relative group bg-slate-200 border-slate-400 rounded-md`, className)}
    >
      <Input
        {
          ...register(name, {
            required: "An image is required for a recipe."
          })
        }
        ref={addImageButton}
        type="file"
        onChange={handleImageInsert}
        accept=".jpg, .jpeg, .png"
        className="hidden"
      />
      {
        image.url
        ? <>
            <img 
              src={image.url}
              alt="Added Image"
              className="size-full object-cover"
            />
            { image.file && <h1 className="absolute top-2 left-2 bg-orange-500 size-fit select-none text-white font-[600] text-sm px-3 py-1 rounded-md">{image.type}</h1> }
            <div className="absolute bottom-0 w-full flex justify-between items-center gap-2 p-2">
              <button
                type="button"
                onClick={() => addImageButton.current?.click()}
                className="bg-orange-500 font-[600] text-white text-nowrap text-xs py-1 px-3 rounded-md"
              >
                Change Image
              </button>
              { image.file && <h1 className="overflow-hidden bg-white border border-slate-500 py-1 px-3 text-nowrap text-center text-xs font-[600] rounded-md line-clamp-1">{image.name}</h1> }
            </div>
          </>
        : <>
          <Placeholder.Root
            icon={<Plus size={30}/>}
            className="size-full relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2 bg-slate-200 text-lg text-slate-500 font-bold rounded-md"
          >
            <Placeholder.Message>Add an Image</Placeholder.Message>
            <Placeholder.Action type="button" onClick={() => addImageButton.current?.click()} className="text-base">Add an Image</Placeholder.Action>
          </Placeholder.Root>
          <div className="w-full absolute bottom-0 p-4">
            {
              error.image && 
              <Error.Label>
                {error.image.message}
              </Error.Label>
            }
          </div>
          </>
      }
    </div>
  )
}

export default Image