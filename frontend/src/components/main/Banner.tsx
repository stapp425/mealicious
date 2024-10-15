import { useContext } from "react"
import { AppContext } from "@/App"
import defaultProfilePicture from "@/img/default-pfp.svg"
import { Calendar } from "lucide-react"
import { format } from "date-fns"

const Banner: React.FC = () => {
  const { date, user } = useContext(AppContext)
  const profilePicture = user?.photoURL || defaultProfilePicture

  return (
    <div className="bg-orange-100 relative flex items-center p-6">
      <img 
        src={profilePicture}
        alt="Profile Picture"
        className="rounded-full size-20 float-start mr-4"
      />
      <div className="space-y-2">
        <h1 className="font-bold text-3xl">
          Welcome, {user?.displayName}!
        </h1>
        <div className="flex items-center gap-1.5">
          <Calendar size={16} strokeWidth={2}/>
          <h2 className="text-sm font-bold">
              {format(date, "MM/dd/yy")}
          </h2>
        </div>
        <h3 className="text-sm text-muted-foreground italic">Mealicious User</h3>
      </div>
    </div>
  )
}

export default Banner