import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { signInWithGoogle, createUser, type UserInput } from "@/util/auth"
import { toast } from "@/components/ui/use-toast"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import googleLogo from "@/img/logo/google-logo.svg"
import registerImage from "@/img/register-page.jpg"

export default function Register() {
  const [userInput, setUserInput] = useState<UserInput>({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setUserInput((u: UserInput) => ({
      ...u,
      [name]: value
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const { firstName, lastName, displayName, email, password, confirmPassword } = userInput
    event.preventDefault()    
    
    if(!firstName || !lastName)
      return toast({
        description: "A full name must be provided.",
        variant: "destructive"
      })

    if(!displayName || !email)
      return toast({
        description: "Display and/or email is missing.",
        variant: "destructive"
      })
    
    if(!password || !confirmPassword)
      return toast({
        description: "Enter a password or confirm your password.",
        variant: "destructive"
      })
    
    if(password !== confirmPassword)
      return toast({
        description: "Passwords don't match.",
        variant: "destructive"
      })
    
    try {
      await createUser(userInput)
    } catch (err: any) {
      toast({
        title: "Error!",
        description: err.message || "Something went wrong.",
        variant: "destructive"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="size-full grid grid-cols-1 md:grid-cols-2 gap-x-4 *:py-0">
      <div className="hidden md:flex justify-center items-center bg-orange-500 row-start-1 col-start-1 row-span-10 rounded-lg overflow-hidden">
        <img 
          src={registerImage} 
          alt="Credit: Julie Aagaard (https://www.pexels.com/photo/salad-on-a-plate-2097090/)"
          className="h-full"
        />
      </div>
      <div className="justify-self-center">
        <img
          src={siteLogo}
          alt="Mealicious Logo"
          className="w-[200px] pt-4"
        />
      </div>
      <div className="grid grid-cols-2 place-items-stretch gap-4 px-6">
        <div>
          <Label htmlFor="firstName" className="after:content-['_*'] after:font-bold after:text-red-600">First Name</Label>
          <Input
            id="firstName"
            type="text"
            name="firstName"
            value={userInput.firstName}
            placeholder="First Name"
            onChange={handleChange}
            className="mt-2"
            autoFocus
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="after:content-['_*'] after:font-bold after:text-red-600">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            name="lastName"
            value={userInput.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            className="mt-2"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 place-items-stretch gap-4 px-6">
        <div>
          <Label htmlFor="displayName" className="after:content-['_*'] after:font-bold after:text-red-600">Display Name</Label>
          <Input
            id="displayName"
            type="text"
            name="displayName"
            value={userInput.displayName}
            placeholder="Display Name"
            onChange={handleChange}
            className="mt-2"
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="email" className="after:content-['_*'] after:font-bold after:text-red-600">E-Mail</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={userInput.email}
            placeholder="E-Mail"
            onChange={handleChange}
            className="mt-2"
            autoComplete="off"
          />
        </div>
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
          className="mt-2"
          autoComplete="off"
        />
      </div>
      <div className="px-6">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={userInput.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          className="mt-2"
          autoComplete="off"
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
            <span className="gsi-material-button-contents">Sign up with Google</span>
            <span className="hidden">Sign in with Google</span>
          </div>
        </button>
      </div>
      <div className="flex flex-col justify-center px-6">
        <button type="submit" className="self-stretch px-6 py-3 bg-orange-500 hover:bg-orange-700 transition text-white font-bold rounded-md my-2">
          Sign Up
        </button>
      </div>
      <div className="text-center">
        Already have an account? | <Link to="/auth/login" className="text-orange-500 hover:text-orange-700">Log In</Link>
      </div>
    </form>
  )
}