import { useContext, useEffect } from "react"
import { type User } from "firebase/auth"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type Meal, defaultMeal } from "@/util/types/meal"
import { useFirestoreFetch, useFirestorePost } from "@/util/hooks"
import { defaultRecipe, formatRecipes, type Recipe } from "@/util/types/recipe"
import { createQuery } from "@/util/types/app"
import { AppContext } from "@/App"
import AddWindow from "./AddWindow"
import Container from "../theme/Container"
import Title from "./Title"
import Tag from "./Tag"
import Description from "./Description"
import Time from "./Time"
import Button from "../theme/Button"
import RecipeList from "./RecipeList"
import Spinner from "../theme/Spinner"

const CreateMeal: React.FC = () => {
  const { user }  = useContext(AppContext)
  const { data: recipes } = useFirestoreFetch<Recipe>(
    createQuery(user as User, "recipes"), 
    formatRecipes, { initialData: [], defaultData: defaultRecipe }
  )

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { 
      errors, 
      isSubmitting,
      isSubmitSuccessful
    }
  } = useForm<Meal>({ defaultValues: defaultMeal })
  const { addFirestoreDoc: addMeal } = useFirestorePost()

  const submitMeal: SubmitHandler<Meal> = async (data) => {
    try {
      const addedData = {
        ...data,
        contents: data.contents.map(({ type, recipe }) => ({
          type,
          recipe: recipe.id as string
        })),
        userId: user?.uid
      }
      
      await addMeal("meals", addedData)
    } catch (err: any) {
      alert(err.message)
    }
  }

  useEffect(() => {
    document.title = "Create Meal | Mealicious"
    window.addEventListener("beforeunload", handleUnload)

    return () => window.removeEventListener("beforeunload", handleUnload)

    function handleUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
    }
  }, [])

  useEffect(() => {
    if(isSubmitSuccessful)
      reset()
  }, [isSubmitSuccessful])
  
  return (
    <Container.Form onSubmit={handleSubmit(submitMeal)} className="bg-orange-200">
      <div className="mx-auto max-w-[1000px] min-h-site-container lg:min-h-screen p-4 space-y-3 bg-white">
        <Title
          register={register}
          error={errors}
        />
        <Tag
          control={control}
          setValue={setValue}
        />
        <Description
          register={register}
          className="w-full"
        />
        <div className="flex justify-between items-start">
          <Time
            setValue={setValue}
            control={control}
            error={errors}
            setError={setError}
            clearErrors={clearErrors}
          />
          <Button>{ isSubmitting ? <><Spinner className="inline"/> Working on it...</> : "Submit Meal"}</Button>
        </div>
        <AddWindow className="w-full" recipes={recipes} error={errors} setValue={setValue} getValues={getValues}/>
        <RecipeList
          control={control}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          className="flex-1"
        />
      </div>
    </Container.Form>
  )
}

export default CreateMeal