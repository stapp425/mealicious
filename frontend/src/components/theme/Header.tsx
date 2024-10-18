import { createContext, useContext, useState } from "react"
import { AppContext } from "@/App"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import defaultProfilePicture from "@/img/default-pfp.svg"
import { NavBarSheet } from "./NavBar"
import { ReactState } from "@/util/types/app"

const HeaderContext = createContext<ReactState<boolean>>([false, () => {}])

export function useHeaderContext() {
  const context = useContext(HeaderContext)

  if(!context)
    throw new Error("Header context was not found.")

  return context
}

const Header: React.FC = () => {
  const { user } = useContext(AppContext)
  const profilePicture = user?.photoURL || defaultProfilePicture
  const sheetOpenState = useState<boolean>(false)
  
  return (
    <HeaderContext.Provider value={sheetOpenState}>
      <div className="z-50 h-[100px] sticky top-0 left-0 flex lg:hidden justify-between items-center bg-orange-100 px-6 shadow-b-md">
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
    </HeaderContext.Provider>
  )
}

export default Header