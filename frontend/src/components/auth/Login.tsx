import { useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "@/util/auth"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import loginImage from "@/img/login-page.jpg"
import { useForm, type SubmitHandler } from "react-hook-form"
import AuthInput from "./AuthInput"
import GoogleButton from "./GoogleButton"
import ForgotPassword from "./ForgotPassword"

type UserLoginInput = {
  email: string,
  password: string
}

const Login: React.FC = () => {  
  const { register, handleSubmit, formState: { errors } } = useForm<UserLoginInput>({ 
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const submitUserInput: SubmitHandler<UserLoginInput> = async (data) => {
    const { email, password } = data
    
    try {
      await signIn(email, password)
    } catch (err: any) {
      toast({
        title: "Uh Oh!",
        description: err.message || "Invalid username/password.",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    document.title = "Login | Mealicious"
  }, [])

  return (
    <form onSubmit={handleSubmit(submitUserInput)} className="size-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 *:py-0">
      <img
        src={siteLogo}
        alt="Mealicious Logo"
        className="mx-auto w-[clamp(100px,50%,200px)] pt-4"
      />
      <div className="text-center flex flex-col justify-center items-center -mt-4">
        <h1 className="font-bold text-3xl">Welcome Back!</h1>
        <p className="text-muted-foreground">Log In to Continue</p>
      </div>
      <AuthInput
        id="email"
        label="E-Mail"
        {
          ...register("email", {
            required: "E-mail is required",
            pattern: {
              value: /(^[^\s@]+@[^\s@]+\.[^\s@]+$)/,
              message: "Not a valid email format"
            },
            maxLength: {
              value: 20,
              message: "Cannot exceed 20 characters long"
            }
          })
        }
        placeholder="E-Mail"
        errorMessage={errors.email?.message}
        autoFocus
        className="px-6"
      />
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
      />
      <hr className="or"/>
      <GoogleButton mode="login"/>
      <div className="flex flex-col justify-center px-6">
        <ForgotPassword/>
        <button type="submit" className="self-stretch px-6 py-3 bg-orange-500 hover:bg-orange-700 transition text-white font-bold rounded-md my-2">
          Log In
        </button>
      </div>
      <div className="text-center">
        Don't have an account? | <Link to="/auth/register" className="text-orange-500 hover:text-orange-700">Sign Up</Link>
      </div>
      <div className="hidden lg:flex justify-center items-center bg-orange-500 row-start-1 col-start-2 row-span-8 rounded-lg overflow-hidden">
        <img 
          src={loginImage} 
          alt="Credit: Julie Aagaard (https://www.pexels.com/photo/salad-on-a-plate-2097090/)"
          className="h-full object-cover"
        />
      </div>
    </form>
  )
}

export default Login