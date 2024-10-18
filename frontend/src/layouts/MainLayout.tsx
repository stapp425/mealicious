import { Outlet } from "react-router-dom"
import Header from "@/components/theme/Header"
import { Toaster } from "@/components/ui/toaster"
import { useContext } from "react"
import { AppContext } from "@/App"
import Spinner from "@/components/theme/Spinner"
import { NavBar } from "@/components/theme/NavBar"
import Container from "@/components/theme/Container"
import { useScroll } from "@/util/hooks"
import { ArrowUp } from "lucide-react"
import { scrollToTop } from "@/util/types/app"

const MainLayout: React.FC = () => {
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
      <ScrollButton/>
    </div>
  )
}

const ScrollButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (({ className, children, ...props }) => {
  const { y } = useScroll()
  
  return (
    <button
      {...props}
      id="scroll-button"
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 ${y ? "opacity-100" : "opacity-0 pointer-events-none"} flex justify-center items-center text-white bg-orange-500 hover:bg-orange-700 hover:scale-110 transition-all rounded-full size-14 p-0`}
    >
      <ArrowUp size={28}/>
    </button>
  )
})

export default MainLayout