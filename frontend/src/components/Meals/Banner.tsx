import { useContext } from "react"
import { AppContext } from "@/App"
import { signOut } from "@/util/auth"
import defaultProfilePicture from "@/img/default-pfp.svg"

export default function Banner(): React.ReactElement {
  const { user } = useContext(AppContext)
  const profilePicture = user?.photoURL || defaultProfilePicture

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
            Welcome, {user?.displayName}
          </h1>
          <div className="flex items-center gap-2">
            <button className="text-sm text-white font-[600] py-1 px-3 bg-red-500 rounded-sm" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}