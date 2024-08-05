import { 
  type Control, 
  type UseFormSetValue, 
  type ErrorOption,
  type UseFormRegister, 
  type FieldErrors
} from "react-hook-form"
import { Obj } from "./app"



export interface Field {
  className?: string
}

export interface RequiredField<T extends Obj> extends Field {
  error: FieldErrors<T>
}

export interface RequiredSingleField<T extends Obj> extends RequiredField<T> {
  name?: keyof T
  register: UseFormRegister<T>
}

export interface FieldArray<T extends Obj> extends Field {
  control: Control<T>
  setValue: UseFormSetValue<T>
}

export interface RequiredFieldArray<T extends Obj> extends RequiredField<T>, FieldArray<T> {
  setError: (name: keyof T, error: ErrorOption, options?: { shouldFocus: boolean }) => void
  clearErrors: (name?: keyof T) => void
}
