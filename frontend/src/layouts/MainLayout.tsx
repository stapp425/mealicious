import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
// import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { useContext } from "react"
import { AppContext } from "@/App"
import Spinner from "@/components/ui/Spinner"

export default function MainLayout() {
  const { isMealsFetching, isRecipesFetching, isPlansFetching } = useContext(AppContext)
  
  return (
    <div className="relative max-w-screen min-h-screen flex flex-col">
      <Header/>
      { 
        !isMealsFetching && !isRecipesFetching && !isPlansFetching
          ? <Outlet/>
          : <div className="h-[calc(100vh-150px)] w-full flex flex-col justify-center items-center gap-4">
              <Spinner size={84}/>
              <h1 className="font-bold text-4xl">Loading...</h1>
            </div>
      }
      <div className="absolute bottom-0 right-0">
        <Toaster/>
      </div>
    </div>
  )
}