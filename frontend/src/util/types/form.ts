import { 
  type Control, 
  type UseFormSetValue, 
  type ErrorOption,
  type UseFormRegister, 
  type FieldErrors
} from "react-hook-form"
import { Obj } from "./app"

export type ReactHookFormTypes<T extends Obj> = {
  name: keyof T
  register: UseFormRegister<T>
  error: FieldErrors<T>
  control: Control<T>
  setValue: UseFormSetValue<T>
  setError: (name: keyof T, error: ErrorOption, options?: { shouldFocus: boolean }) => void
  clearErrors: (name?: keyof T) => void
}

// export type RequiredField<T extends Obj> = Pick<ReactHookFormTypes<T>, "error" | "name"> & Field

// export type RequiredSingleField<T extends Obj> = RequiredField<T> & Pick<ReactHookFormTypes<T>, "name" | "register">

// export type FieldArray<T extends Obj> = Pick<ReactHookFormTypes<T>, "control" | "setValue"> & Field

// export type RequiredFieldArray<T extends Obj> = Pick<ReactHookFormTypes<T>, "setError" | "clearErrors"> & RequiredField<T> & FieldArray<T>