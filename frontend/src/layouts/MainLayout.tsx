import { Outlet } from "react-router-dom"
import Header from "@/components/theme/Header"
import { Toaster } from "@/components/ui/toaster"
import { useContext } from "react"
import { AppContext } from "@/App"
import Spinner from "@/components/theme/Spinner"
import { NavBar } from "@/components/theme/NavBar"
import Container from "@/components/theme/Container"
import Button from "@/components/theme/Button"

export default function MainLayout() {
  const { user, screenSizes: { lg } } = useContext(AppContext)
  
  return (
    <div className="w-full min-h-screen">
      { lg ? <NavBar/> : <Header/> }
      { 
        user
        ? <Outlet/>
        : <Container className="w-full flex flex-col justify-center items-center gap-4">
            <Spinner size={84}/>
            <h1 className="font-bold text-4xl">Loading...</h1>
          </Container>
      }
      <div className="absolute bottom-0 right-0">
        <Toaster/>
      </div>
      <Button.Scroll/>
    </div>
  )
}