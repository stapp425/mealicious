import { useContext } from "react"
import { type CurrentUser } from "@/types/app"
import { UserContext } from "@/App"
import { signOut } from "@/util/auth"
import defaultProfilePicture from "@/img/default-pfp.svg"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

export default function Banner(): React.ReactElement {
  const currentUser = useContext<CurrentUser>(UserContext)
  const profilePicture = currentUser?.photoURL || defaultProfilePicture

  return (
    <div className="col-span-3 xl:col-span-2 relative flex items-center border-b border-slate-300 p-4">
      <div className="flex items-stretch gap-6">
        <img 
          src={profilePicture}
          alt="Profile Picture"
          className="rounded-full size-20"
        />
        <div className="flex flex-col justify-around">
          <h1 className="font-bold text-3xl">
            Welcome, {currentUser?.displayName}
          </h1>
          <div className="flex items-center gap-2">
            <Link to="/settings" className="text-sm">Settings</Link>
            <Separator orientation="vertical" className="h-6"/>
            <button className="text-sm text-white font-[600] py-1 px-3 bg-red-500 rounded-sm" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <button className="text-white font-[600] absolute bottom-4 right-4 px-8 py-2 bg-orange-500 rounded-md hover:bg-orange-700 transition">
        View Profile
      </button>
    </div>
  )
}