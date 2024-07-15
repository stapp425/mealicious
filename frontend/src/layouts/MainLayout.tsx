import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function MainLayout() {
  return (
    <div className="overflow-x-hidden relative max-w-screen min-h-screen flex flex-col justify-between">
      <Header/>
      <Outlet/>
    </div>
  )
}