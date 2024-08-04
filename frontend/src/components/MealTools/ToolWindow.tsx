import { type Meal } from "@/types/meal"
import { type UseFormReset } from "react-hook-form"
import { type RequiredFieldArray, type RequiredSingleField } from "@/types/form"
import { type Obj } from "@/types/app"
import Title from "./Title"
import Description from "./Description"
import Time from "./Time"
import Tag from "./Tag"
import RecipeList from "./RecipeList"
import Errors from "./Errors"

interface Props<T extends Obj> extends RequiredSingleField<T>, RequiredFieldArray<T> {
  toggleEditMode: (...params: any) => unknown
  reset: UseFormReset<T>
}

const ToolWindow: React.FC<Props<Meal>> = (props) => {  
  return (
    <div className="relative flex-1 flex flex-col gap-2">
      <Title
        register={props.register}
        className="px-4 pt-4"
      />
      <Tag
        control={props.control}
        setValue={props.setValue}
        className="px-4"
      />
      <Description
        register={props.register}
        className="px-4"
      />
      <Time
        setValue={props.setValue}
        control={props.control}
        setError={props.setError}
        clearErrors={props.clearErrors}
        error={props.error}
        className="px-4"
      />
      <RecipeList
        control={props.control}
        toggleEditMode={props.toggleEditMode}
        setValue={props.setValue}
        setError={props.setError}
        clearErrors={props.clearErrors}
        error={props.error}
        className="flex-1"
        contentClassName="h-1/2 px-4 py-2"
      />
      <Errors 
        errors={props.error}
        className="absolute top-4 right-4"
      />
    </div>
  )
}

export default ToolWindow