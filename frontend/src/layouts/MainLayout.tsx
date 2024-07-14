import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function MainLayout() {
  return (
    <div className="overflow-hidden relative w-screen h-screen flex flex-col justify-between">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}