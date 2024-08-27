import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { signIn, signInWithGoogle } from "@/util/auth"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import googleLogo from "@/img/logo/google-logo.svg"
import loginImage from "@/img/login-page.jpg"
import { useForm, type SubmitHandler } from "react-hook-form"
import Error from "./Error"
import { Eye, EyeOff } from "lucide-react"

type UserInput = {
  email: string,
  password: string
}

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<UserInput>({ 
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const submitUserInput: SubmitHandler<UserInput> = async (data) => {
    const { email, password } = data
    
    try {
      await signIn(email, password)
    } catch (err: any) {
      toast({
        title: "Uh Oh!",
        description: "Invalid username/password." || err.message,
        variant: "destructive"
      })
    }
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible(p => !p)
  }

  return (
    <form onSubmit={handleSubmit(submitUserInput)} className="size-full grid grid-cols-1 md:grid-cols-2 gap-x-4 *:py-0">
      <div className="justify-self-center">
        <img
          src={siteLogo}
          alt="Mealicious Logo"
          className="w-[200px] pt-4"
        />
      </div>
      <div className="text-center flex flex-col justify-center items-center -mt-4">
        <h1 className="font-bold text-3xl">Welcome Back!</h1>
        <p className="text-muted-foreground">Log In to Continue</p>
      </div>
      <div className="px-6">
        <div className="flex justify-between">
          <Label htmlFor="email" className="after:content-['_*'] after:font-bold after:text-red-600">E-Mail</Label>
          {
            errors.email &&
            <Error>{errors.email.message}</Error>
          }
        </div>
        <Input
          id="email"
          type="text"
          {
            ...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /(^[^\s@]+@[^\s@]+\.[^\s@]+$)/,
                message: "Not a valid e-mail format"
              },
              maxLength: {
                value: 20,
                message: "Cannot exceed 20 characters long"
              }
            })
          }
          placeholder="E-Mail"
          className="mt-2"
          autoFocus
        />
      </div>
      <div className="px-6">
        <div className="flex justify-between">
          <Label htmlFor="password" className="after:content-['_*'] after:font-bold after:text-red-600">Password</Label>
          {
            errors.password &&
            <Error>{errors.password.message}</Error>
          }
        </div>

        <div className="relative">
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
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
            className="mt-2"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-500 cursor-pointer hover:text-slate-600 active:text-slate-700 transition-colors"
          >
            { isPasswordVisible ? <Eye size={20}/> : <EyeOff size={20}/> }
          </button>
        </div>
      </div>
      <div className="text-center font-bold text-muted-foreground">
        ---------------------- OR ----------------------
      </div>
      <div className="flex justify-center items-stretch">
        <button type="button" className="gsi-material-button" onClick={signInWithGoogle}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <img src={googleLogo} alt="Google Icon" className="gsi-material-button-icon" />
            <span className="gsi-material-button-contents">Sign in with Google</span>
            <span className="hidden">Sign in with Google</span>
          </div>
        </button>
      </div>
      <div className="flex flex-col justify-center px-6">
        <span className="text-center">Forgot your password?</span>
        <button type="submit" className="self-stretch px-6 py-3 bg-orange-500 hover:bg-orange-700 transition text-white font-bold rounded-md my-2">
          Log In
        </button>
      </div>
      <div className="text-center">
        Don't have an account? | <Link to="/auth/register" className="text-orange-500 hover:text-orange-700">Sign Up</Link>
      </div>
      <div className="hidden md:flex justify-center items-center bg-orange-500 row-start-1 col-start-2 row-span-8 rounded-lg overflow-hidden">
        <img 
          src={loginImage} 
          alt="Credit: Julie Aagaard (https://www.pexels.com/photo/salad-on-a-plate-2097090/)"
          className="h-full"
        />
      </div>
    </form>
  )
}