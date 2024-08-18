import { useContext, useEffect, useRef, useState } from "react"
import { useFirestoreGet, useFirestoreUpdate, useStorageDelete, useStorageUpload } from "@/util/hooks"
import { defaultRecipe, type Recipe } from "@/types/recipe"
import { useToast } from "@/components/ui/use-toast"
import { AppContext } from "@/App"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { nanoid } from "nanoid"
import Title from "./Title"
import Description from "./Description"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import Diets from "./Diets"
import DishTypes from "./DishTypes"
import Times from "./Times"
import Image from "./Image"
import Serving from "./Serving"
import Nutrition from "./Nutrition"

// TODO: Fix image issues
const EditRecipe: React.FC = () => {
  const { toast } = useToast()
  const { user, setRecipes } = useContext(AppContext)
  const { recipeId } = useParams()
  const { data } = useFirestoreGet<Recipe>(defaultRecipe, { name: "recipes", id: recipeId as string })
  const [image, setImage] = useState<Image>({
    file: undefined,
    name: "",
    type: "",
    url: ""
  })
  const { updateFirestoreDoc } = useFirestoreUpdate()
  const { uploadFile } = useStorageUpload()
  const { deleteFile } = useStorageDelete()

  const { 
    register, 
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    control,
    formState: { 
      errors,
      isSubmitting,
    }
  } = useForm<Recipe>({ defaultValues: defaultRecipe })

  const originalImageURL = useRef<string>("")
  
  const submitRecipe: SubmitHandler<Recipe> = async(data: Recipe) => {
    if(user) {
      try {
        let imageRef

        if(image.file) {
          imageRef = await uploadFile(image.file, `${image.name}-${nanoid()}`)
          if(originalImageURL.current.includes("firebasestorage") && originalImageURL.current !== imageRef)
            await deleteFile(getImageNameFromURL(originalImageURL.current))
        } else {
          imageRef = image.url
        }

        const editedRecipe = {
          ...data,
          image: imageRef,
          userId: user.uid
        }
  
        await updateFirestoreDoc(editedRecipe, { name: "recipes", id: recipeId as string })
        setRecipes(recipes => [...recipes.filter(r => r.id !== editedRecipe.id), editedRecipe])
        toast({
          title: "Success",
          description: "Recipe successfully updated!",
          variant: "success"
        })
      } catch (err: any) {
        toast({
          title: "Error!",
          description: err.message,
          variant: "destructive"
        })
      }
    }
  }

  function getImageNameFromURL(url: string) {
    const decodedURL = decodeURIComponent(url)
    const splitURL = decodedURL.split("/o/")
    const imageName = splitURL[1].split("?")

    return imageName[0]
  }

  useEffect(() => {
    if(data) {
      reset(data)
      setImage(i => ({
        ...i,
        url: data.image
      }))
      originalImageURL.current = data.image
    }
  }, [data])
  
  return (
    <form onSubmit={handleSubmit(submitRecipe)} className="relative min-h-[calc(100vh-150px)] grid grid-cols-[350px_1fr]">
      <div className="overflow-hidden h-[calc(100vh-150px)] sticky top-[150px] flex flex-col justify-between gap-3 p-4 bg-white border-r border-r-slate-300">
        <Image
          name="image"
          register={register}
          error={errors}
          setValue={setValue}
          image={image}
          setImage={setImage}
        />
        <Nutrition
          control={control}
          setError={setError}
          clearErrors={clearErrors}
          error={errors}
          setValue={setValue}
        >
          <Serving
            className="p-2"
            name="servingSize"
            register={register}
            error={errors}
          />
        </Nutrition>
        <button
          disabled={isSubmitting}
          type="submit" 
          className="font-[600] text-xl text-white py-2 bg-orange-500 rounded-md disabled:cursor-not-allowed"
        >
          { isSubmitting ? "Working on it..." : "Update Recipe" }
        </button>
      </div>
      <div className="grid grid-rows-[repeat(6,max-content)] grid-cols-1 xl:grid-rows-[repeat(4,_max-content)] xl:grid-cols-2 gap-3 p-3 *:border *:border-orange-300 *:p-4 *:rounded-md">
        <Title 
          className="row-start-1 col-start-1"
          name="title"
          register={register}
          error={errors}
        />
        <Times
          className="row-start-2"
          register={register}
          error={errors}
        />
        <Description 
          className="flex-1 row-start-3 col-start-1 xl:row-start-1 xl:col-start-2 xl:row-span-2"
          name="description"
          register={register}
          error={errors}
        />
        <Diets
          className="row-start-4 col-start-1 xl:row-start-3"
          control={control}
          setValue={setValue}
        />
        <DishTypes
          className="row-start-5 col-start-1 xl:row-start-3 xl:col-start-2"
          control={control}
          setValue={setValue}
        />
        <Ingredients
          className="row-start-6 col-start-1 xl:row-start-4"
          control={control}
          setValue={setValue}
          error={errors}
          setError={setError}
          clearErrors={clearErrors}
        />
        <Instructions
          className="row-start-7 col-start-1 xl:row-start-4 xl:col-start-2"
          control={control}
          setValue={setValue}
          error={errors}
          setError={setError}
          clearErrors={clearErrors}
        />
      </div>
    </form>    
  )
}

export default EditRecipe