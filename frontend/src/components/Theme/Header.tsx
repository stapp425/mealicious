import { useContext } from "react"
import { AppContext } from "@/App"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import defaultProfilePicture from "@/img/default-pfp.svg"
import { NavBarSheet } from "./NavBar"

export default function Header() {
  const { user } = useContext(AppContext)
  const profilePicture = user?.photoURL || defaultProfilePicture
  
  return (
    <div className="z-50 h-[100px] sticky left-[325px] flex lg:hidden justify-between items-center bg-orange-100 px-6 shadow-b-md">
      <NavBarSheet/>
      <img 
        src={siteLogo}
        alt="Mealicious Logo"
        width="100px"
        className="flex justify-center items-center gap-16"
      />
      <img 
        src={profilePicture}
        alt="Profile Picture"
        width="56px"
        className="rounded-full"
      />
    </div>
  )
}