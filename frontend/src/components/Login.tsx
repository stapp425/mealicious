import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { signIn, signInWithGoogle } from "@/util/auth"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import googleLogo from "@/img/logo/google-logo.svg"
import loginImage from "@/img/login-page.jpg"

type UserInput = {
  email: string,
  password: string
}

export default function Login() {
  const [userInput, setUserInput] = useState<UserInput>({
    email: "",
    password: ""
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setUserInput(u => ({
      ...u,
      [name]: value
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { email, password } = userInput
    
    if(!email || !password) {
      return toast({
        description: "Email and/or password is empty.",
        variant: "destructive"
      })
    }

    if(!email.match(/(^[^\s@]+@[^\s@]+\.[^\s@]+$)/)) {
      return toast({
        description: "Please enter a valid email.",
        variant: "destructive"
      })
    }

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

  return (
    <form onSubmit={handleSubmit} className="size-full grid grid-cols-1 md:grid-cols-2 gap-x-4 *:py-0">
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
        <Label htmlFor="email" className="after:content-['_*'] after:font-bold after:text-red-600">E-Mail</Label>
        <Input
          id="email"
          type="text"
          name="email"
          value={userInput.email}
          placeholder="E-Mail"
          onChange={handleChange}
          className="mt-2"
          autoFocus
        />
      </div>
      <div className="px-6">
        <Label htmlFor="password" className="after:content-['_*'] after:font-bold after:text-red-600">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          value={userInput.password}
          placeholder="Password"
          onChange={handleChange}
          minLength={5}
          maxLength={20}
        />
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