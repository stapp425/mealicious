import { Outlet } from "react-router-dom"
import authBackground from "@/img/background/auth-background.jpg"
import { Toaster } from "@/components/ui/toaster"

export default function AuthLayout() {
  return (
    <div className="overflow-auto lg:overflow-hidden">
      <img 
        src={authBackground}
        alt="Credit: Lukas (https://www.pexels.com/photo/sliced-bread-on-brown-wooden-board-349610/)"
        className="absolute size-full top-0 left-0"
      />
      <Toaster/>
      <div className="bg-white fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden w-[clamp(350px,75vw,_600px)] lg:w-[800px] h-[clamp(550px,_fit-content,_700px)] lg:h-[700px] py-5 px-0 sm:px-3 lg:px-5 shadow-lg rounded-lg">
        <Outlet/>
      </div>
    </div>
  )
}
