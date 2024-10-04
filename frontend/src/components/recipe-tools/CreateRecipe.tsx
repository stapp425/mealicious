import { useContext, useEffect, useState } from "react"
import { useFirestorePost, useStorageUpload } from "@/util/hooks"
import { defaultRecipe, type Recipe } from "@/util/types/recipe"
import { useToast } from "@/components/ui/use-toast"
import { AppContext } from "@/App"
import { type SubmitHandler, useForm } from "react-hook-form"
import { nanoid } from "nanoid"
import Title from "./Title"
import Description from "./Description"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import Diets from "./Diets"
import DishTypes from "./DishTypes"
import Times from "./Times"
import Image from "./Image"
import Nutrition from "./Nutrition"
import Container from "../theme/Container"
import Button from "../theme/Button"

const CreateRecipe: React.FC = () => {
  const { toast } = useToast()
  const { user } = useContext(AppContext)
  const [image, setImage] = useState<Image>({
    file: undefined,
    name: "",
    type: "",
    url: ""
  })
  const { addFirestoreDoc } = useFirestorePost()
  const { uploadFile } = useStorageUpload()

  const {
    register, 
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { 
      errors,
      isSubmitting
    }
  } = useForm<Recipe>({ defaultValues: defaultRecipe })  
  
  const submitRecipe: SubmitHandler<Recipe> = async(data: Recipe) => {     
    if(user && image.file) {
      try {
        const imageRef = await uploadFile(image.file, `${image.name}-${nanoid()}`)
        const addedRecipe = {
          ...data,
          image: imageRef,
          userId: user?.uid
        }

        await addFirestoreDoc("recipes", addedRecipe)
        toast({
          title: "Success",
          description: "Recipe successfully added!",
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

  useEffect(() => {
    document.title = "Create Recipe | Mealicious"
  }, [])
  
  return (
    <Container.Form
      onSubmit={handleSubmit(submitRecipe)}
      className="grid grid-cols-1 xl:grid-rows-[repeat(6,fit-content)] xl:grid-cols-3 gap-3 p-3"
    >
      <Image
        name="image"
        register={register}
        error={errors}
        setValue={setValue}
        image={image}
        setImage={setImage}
        className="xl:row-span-2"
      />
      <Title 
        name="title"
        register={register}
        error={errors}
        className="xl:row-start-1 xl:col-start-2 xl:col-span-2"
      />
      <Times
        register={register}
        error={errors}
        className="xl:row-start-2 xl:col-start-2 xl:col-span-2"
      />
      <Description 
        name="description"
        register={register}
        error={errors}
        className="xl:row-start-3 xl:col-start-2 xl:col-span-2"
      />
      <Nutrition
        register={register}
        control={control}
        setError={setError}
        clearErrors={clearErrors}
        error={errors}
        setValue={setValue}
        className="xl:row-start-3 xl:row-span-2"
      />
      <Diets
        control={control}
        setValue={setValue}
        className="xl:row-start-4 xl:col-start-2"
      />
      <DishTypes
        control={control}
        setValue={setValue}
        className="xl:row-start-4 xl:col-start-3"
      />
      <Ingredients
        control={control}
        setValue={setValue}
        error={errors}
        setError={setError}
        clearErrors={clearErrors}
        className="xl:row-start-5 xl:col-start-2"
      />
      <Instructions
        control={control}
        setValue={setValue}
        error={errors}
        setError={setError}
        clearErrors={clearErrors}
        className="xl:row-start-5 xl:col-start-3"
      />
      <Button
        disabled={isSubmitting}
        type="submit" 
        className="h-fit text-xl disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Working on it..." : "Create Recipe"}
      </Button>
    </Container.Form>    
  )
}

export default CreateRecipe