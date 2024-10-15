import { useEffect, useContext } from "react"
import { AppContext } from "@/App"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type Meal, defaultMeal, formatMeal } from "@/util/types/meal"
import { useFirestoreFetch, useFirestoreGet, useFirestoreUpdate } from "@/util/hooks"
import AddWindow from "./AddWindow"
import { useParams } from "react-router-dom"
import Container from "../theme/Container"
import { defaultRecipe, formatRecipes, Recipe } from "@/util/types/recipe"
import { createQuery } from "@/util/types/app"
import { type User } from "firebase/auth"
import RecipeList from "./RecipeList"
import Button from "../theme/Button"
import Time from "./Time"
import Description from "./Description"
import Tag from "./Tag"
import Title from "./Title"
import Spinner from "../theme/Spinner"

const EditMeal: React.FC = () => {
  const { mealId } = useParams()
  const { user } = useContext(AppContext)
  const { data: meal } = useFirestoreGet<Meal>("meals", mealId as string, formatMeal, defaultMeal)
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
      isSubmitting
    }
  } = useForm<Meal>({ defaultValues: defaultMeal })
  const { updateFirestoreDoc: updateMeal } = useFirestoreUpdate()

  const submitMeal: SubmitHandler<Meal> = async (data) => {
    if(user) {
      const editedData = { 
        ...data,
        contents: data.contents.map(content => ({
          type: content.type,
          recipe: content.recipe.id
        })),
        userId: user.uid }

      updateMeal("meals", mealId as string, editedData)
    }
  }

  useEffect(() => {
    document.title = "Edit Meal | Mealicious"
    
    function handleUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
    }

    window.addEventListener("beforeunload", handleUnload)

    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [])

  useEffect(() => {
    meal && reset(meal)
  }, [meal])

  return (
    <Container.Form onSubmit={handleSubmit(submitMeal)} className="justify-between gap-4 p-0 bg-orange-200">
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

export default EditMeal