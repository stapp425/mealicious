import { Outlet } from "react-router-dom"
import authBackground from "@/img/background/auth-background.jpg"

const AuthLayout: React.FC = () => (
  <div className="overflow-auto lg:overflow-hidden">
    <img 
      src={authBackground}
      alt="Credit: Lukas (https://www.pexels.com/photo/sliced-bread-on-brown-wooden-board-349610/)"
      className="absolute size-full top-0 left-0 object-cover"
    />
    <div className="bg-white fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden w-[min(800px,90vw)] h-[min(700px,90vh)] lg:h-[700px] py-5 px-0 sm:px-3 lg:px-5 shadow-lg rounded-lg">
      <Outlet/>
    </div>
  </div>
)

export default AuthLayout
