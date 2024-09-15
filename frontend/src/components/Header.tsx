import { useContext } from "react"
import { AppContext } from "@/App"
import { signOut } from "@/util/auth"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import defaultProfilePicture from "@/img/default-pfp.svg"

export default function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  const profilePicture = user?.photoURL || defaultProfilePicture
  
  function styleResults() {
    if(user) {
      return (
        <div>
          <Popover modal={true}>
            <PopoverTrigger>
              <img 
                src={profilePicture}
                alt="Profile Picture"
                className="w-14 rounded-full hover:scale-110 transition"
              />
            </PopoverTrigger>
            <PopoverContent align="end" className="overflow-hidden mt-3 p-0">
              <div className="relative w-full h-1/4 shadow-lg">
                <div className="bg-blue-700 h-28 shadow-inner"></div>
                <img 
                  src={profilePicture}
                  alt="Profile Picture"
                  className="absolute bg-white bottom-0 left-5 translate-y-1/2 w-20 rounded-full"
                />
              </div>
              <div className="flex flex-col mt-6 p-5 gap-2">
                <div>
                  <h1 className="font-bold text-2xl">{user?.displayName}</h1>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger>
                  <Button variant="destructive" className="w-full">
                    Sign Out
                  </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Warning!
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure? Any unsaved changes will be lost.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={signOut}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    } else {
      return (
        <Button onClick={() => navigate("/auth/login")}>
          Login
        </Button>
      )
    }
  }
  
  return (
    <div className="sticky top-0 left-0 z-50 bg-white shadow-md h-[150px]">
      <div className="relative flex justify-between items-center py-8 px-8">
        <div className="relative left-1/2 -translate-x-1/2 flex justify-center items-center gap-16">
          <img src={siteLogo} alt="Mealicious Logo" className="w-[150px]"/>
        </div>
        {styleResults()}
      </div>
    </div>
  )
}