import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}