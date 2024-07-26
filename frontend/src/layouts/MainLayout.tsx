import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"

export default function MainLayout() {
  return (
    <div className="relative max-w-screen min-h-screen flex flex-col">
      <Header/>
      <Outlet/>
      <div className="absolute bottom-0 right-0">
        <Toaster/>
      </div>
    </div>
  )
}