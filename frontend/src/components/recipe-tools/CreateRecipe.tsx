import { useContext, useEffect, useState } from "react"
import { useFirestorePost, useStorageUpload } from "@/util/hooks"
import { defaultRecipe, type Recipe } from "@/util/types/recipe"
import { AppContext } from "@/App"
import { type SubmitHandler, useForm } from "react-hook-form"
import { defaultImage, type Image as ImageType } from "@/util/types/app"
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
import Spinner from "../theme/Spinner"

const CreateRecipe: React.FC = () => {
  const { user } = useContext(AppContext)
  const [image, setImage] = useState<ImageType>(defaultImage)
  const { addFirestoreDoc } = useFirestorePost()
  const { uploadFile } = useStorageUpload()

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
      isSubmitSuccessful
    }
  } = useForm<Recipe>({ defaultValues: defaultRecipe, mode: "all" })  
  
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
        alert("Recipe successfully added!")
      } catch (err: any) {
        alert(err.message)
      }
    }
  }

  useEffect(() => {
    document.title = "Create Recipe | Mealicious"

    
    return () => {

    }
  }, [])

  useEffect(() => {
    reset()
    setImage(defaultImage)
  }, [isSubmitSuccessful])
  
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
        imageState={[image, setImage]}
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
        id="recipe-tools-nutrition"
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
        className="h-fit text-xl disabled:cursor-not-allowed disabled:bg-orange-300"
      >
        {isSubmitting ? <><Spinner className="inline mr-2"/> Working on it...</> : "Create Recipe"}
      </Button>
    </Container.Form>
  )
}

export default CreateRecipe