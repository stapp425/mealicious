import { 
  type Control, 
  type UseFormSetValue, 
  type ErrorOption,
  type UseFormRegister, 
  type FieldErrors,
  UseFormReset,
  UseFormGetValues
} from "react-hook-form"
import { Obj } from "./app"

export type ReactHookFormTypes<T extends Obj> = {
  name: keyof T
  register: UseFormRegister<T>
  error: FieldErrors<T>
  control: Control<T>
  setValue: UseFormSetValue<T>
  getValues: UseFormGetValues<T>
  setError: (name: keyof T, error: ErrorOption, options?: { shouldFocus: boolean }) => void
  clearErrors: (name?: keyof T) => void
  reset: UseFormReset<T>
}