import { forwardRef, useState } from "react"
import { ChangeHandler } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Eye, EyeOff } from "lucide-react"
import Error from "../theme/Error"
import { cn } from "@/lib/utils"

type InputElement = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>

type InputProps = {
  className?: string
  onChange: ChangeHandler
  onBlur: ChangeHandler
  name: string
  id: string
  label: string
  placeholder?: string
  errorMessage?: string
  autoFocus?: boolean
}

type Input = {
  Password: InputElement
} & InputElement

const AuthInput = forwardRef<HTMLInputElement, InputProps>(({ className, placeholder, id, label, autoFocus = false, errorMessage, ...props }, ref) => (
  <div className={className}>
    <div className="flex justify-between">
      <Label htmlFor={id} className="after:content-['_*'] after:font-bold after:text-red-600">{label}</Label>
      { errorMessage && <Error>{errorMessage}</Error> }
    </div>
    <Input
      ref={ref}
      id={id}
      type="text"
      {...props}
      placeholder={placeholder}
      className="mt-2"
      autoFocus={autoFocus}
      autoComplete="off"
    />
  </div>
)) as Input

AuthInput.Password = forwardRef<HTMLInputElement, InputProps>(({ className, placeholder, id, label, errorMessage, autoFocus = false, ...props }, ref) => {
  const [visible, setVisible] = useState<boolean>(false)
  const Icon = visible ? Eye : EyeOff

  function toggleVisibility() {
    setVisible(v => !v)
  }
  
  return (
    <div className={cn("px-6", className)}>
      <div className="flex justify-between">
        <Label htmlFor={id} className="after:content-['_*'] after:font-bold after:text-red-600">{label}</Label>
        { errorMessage && <Error>{errorMessage}</Error> }
      </div>
      <div className="relative">
        <Input
          ref={ref}
          id={id}
          type={visible ? "text" : "password"}
          {...props}
          placeholder={placeholder}
          className="mt-2"
          autoFocus={autoFocus}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-500 cursor-pointer hover:text-slate-600 active:text-slate-700 transition-colors"
        >
          <Icon size={20} strokeWidth={1}/>
        </button>
      </div>
    </div>
  )
})

export default AuthInput