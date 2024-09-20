import { useEffect } from "react"
import { Link } from "react-router-dom"
import { createUser, type UserInput } from "@/util/auth"
import { toast } from "@/components/ui/use-toast"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import registerImage from "@/img/register-page.jpg"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import AuthInput from "./AuthInput"
import GoogleButton from "./GoogleButton"

const Register: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    setError, 
    clearErrors,
    control,
    formState: { 
      errors 
    } 
  } = useForm<UserInput>({
    defaultValues: {
      name: {
        first: "",
        last: "",
        display: ""
      },
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const [password, confirmPassword] = useWatch({
    control,
    name: ["password", "confirmPassword"]
  })

  useEffect(() => {
    document.title = "Register | Mealicious"
  }, [])

  useEffect(() => {
    if(password !== confirmPassword) {
      setError("confirmPassword", {
        type: "Input Mismatch",
        message: "Passwords do not match"
      })
    } else {
      clearErrors("confirmPassword")
    }
  }, [password, confirmPassword])

  const submitUserInput: SubmitHandler<UserInput> = async (data) => {
    try {
      await createUser(data)
    } catch (err: any) {
      toast({
        title: "Error!",
        description: err.message || "Something went wrong.",
        variant: "destructive"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(submitUserInput)} className="size-full grid grid-cols-1 lg:grid-cols-2 gap-x-4">
      <div className="hidden lg:flex justify-center items-center bg-orange-500 row-start-1 col-start-1 row-span-10 rounded-lg overflow-hidden">
        <img 
          src={registerImage} 
          alt="Credit: Julie Aagaard (https://www.pexels.com/photo/salad-on-a-plate-2097090/)"
          className="h-full"
        />
      </div>
      <div className="h-[658px] flex flex-col justify-between">
        <img
          src={siteLogo}
          alt="Mealicious Logo"
          className="w-[200px] pt-4 relative left-1/2 -translate-x-1/2"
        />
        <div className="grid grid-cols-2 place-items-stretch gap-4 px-6">
          <AuthInput
            id="firstName"
            label="First Name"
            {
              ...register("name.first", {
                required: "Required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 letters long"
                }
              })
            }
            placeholder="First Name"
            errorMessage={errors.name?.first?.message}
            autoFocus
            className="mt-2"
          />
          <AuthInput
            id="lastName"
            label="Last Name"
            {
              ...register("name.last", {
                required: "Required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 letters long"
                }
              })
            }
            placeholder="Last Name"
            errorMessage={errors.name?.last?.message}
            autoFocus
            className="mt-2"
          />
        </div>
        <div className="grid grid-cols-2 place-items-stretch gap-4 px-6">
          <AuthInput
            id="displayName"
            label="Display Name"
            {
              ...register("name.display", {
                required: "Required",
                minLength: {
                  value: 5,
                  message: "Must be at least 5 characters long"
                }
              })
            }
            placeholder="Display Name"
            errorMessage={errors.name?.display?.message}
            autoFocus
            className="mt-2"
          />
          <AuthInput
            id="email"
            label="E-Mail"
            {
              ...register("email", {
                required: "Required",
                pattern: {
                  value: /(^[^\s@]+@[^\s@]+\.[^\s@]+$)/,
                  message: "Invalid"
                }
              })
            }
            placeholder="E-Mail"
            errorMessage={errors.email?.message}
            autoFocus
            className="mt-2"
          />
        </div>      
        <AuthInput.Password
          id="password"
          label="Password"
          {
            ...register("password", {
              required: "A password is required",
              minLength: {
                value: 5,
                message: "Must contain at least 5 characters"
              },
              maxLength: {
                value: 20,
                message: "Cannot exceed 20 characters"
              }
            })
          }
          placeholder="Password"
          errorMessage={errors.password?.message}
          className="w-full"
        />
        <AuthInput.Password
          id="confirmPassword"
          label="Confirm Password"
          {...register("confirmPassword")}
          placeholder="Password"
          errorMessage={errors.confirmPassword?.message}
          className="w-full"
        />
        <hr className="or"/>
        <GoogleButton mode="register"/>
        <div className="w-full flex flex-col justify-center px-6">
          <button type="submit" className="self-stretch px-6 py-3 bg-orange-500 hover:bg-orange-700 transition text-white font-bold rounded-md my-2">
            Sign Up
          </button>
        </div>
        <div className="text-center">
          Already have an account? | <Link to="/auth/login" className="text-orange-500 hover:text-orange-700">Log In</Link>
        </div>
      </div>
      
    </form>
  )
}

export default Register