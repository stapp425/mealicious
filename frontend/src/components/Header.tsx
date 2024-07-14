import { useContext } from "react"
import { UserContext } from "@/App"
import { signOut } from "@/util/auth"
import { Button } from "@/components/ui/button"
import { House, Info, Menu, Phone, Navigation, CircleUser } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
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
import { Separator } from "@/components/ui/separator"
import siteLogo from "@/img/logo/mealicious-logo.svg"
import defaultProfilePicture from "@/img/default-pfp.svg"

export default function Header() {
  const currentUser = useContext(UserContext)
  const profilePicture = currentUser?.photoURL || defaultProfilePicture
  
  function styleResults() {
    if(currentUser) {
      return (
        <div>
          <Popover modal={true}>
            <PopoverTrigger>
              <img 
                src={ profilePicture }
                alt="Profile Picture"
                className="w-14 rounded-full hover:scale-110 transition"
              />
            </PopoverTrigger>
            <PopoverContent align="end" className="overflow-hidden mt-3 p-0">
              <div className="relative w-full h-1/4 shadow-lg">
                <div className="bg-blue-700 h-28 shadow-inner"></div>
                <img 
                  src={ profilePicture }
                  alt="Profile Picture"
                  className="absolute bg-white bottom-0 left-5 translate-y-1/2 w-20 rounded-full"
                />
              </div>
              <div className="flex flex-col mt-6 p-5 gap-2">
                <div>
                  <h1 className="font-bold text-2xl">{currentUser?.displayName}</h1>
                  <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                </div>
                <Button className="rounded-md w-1/2 h-9 px-4 bg-orange-500">
                  <Link to="/profile" className="flex justify-between items-center gap-2">
                    <CircleUser />
                    My Profile
                  </Link>
                </Button>
                <Link to="/meals" className="transition hover:translate-x-1 hover:font-bold">My Meals</Link>
                <Link to="/calendar" className="transition hover:translate-x-1 hover:font-bold">Calendar</Link>
                <Link to="/settings" className="transition hover:translate-x-1 hover:font-bold">Settings</Link>
                <Separator className="my-2 bg-slate-400"/>
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
        <Button>
          <Link to="/auth/login">
            Login
          </Link>
        </Button>
      )
    }
  }
  
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="relative flex justify-between items-center py-8 px-8">
        <Drawer>
          <DrawerTrigger className="w-14 block md:invisible md:disabled">
            <Menu size={32}/>
          </DrawerTrigger>
          <DrawerContent className="h-1/3">
            <div className="w-full h-[85%] absolute flex flex-col bottom-0">
              <Link to="/about" className="group rounded-md flex-1 flex items-center hover:bg-slate-300 w-full">
                <div className="group-hover:translate-x-4 transition flex items-center gap-6 px-6">
                  <Info size={36}/>
                  <span className="text-2xl">About</span>
                </div>
              </Link>
              <Link to="/" className="group rounded-md flex-1 flex items-center hover:bg-slate-300 w-full">
                <div className="group-hover:translate-x-4 transition flex items-center gap-6 px-6">
                  <House size={36}/>
                  <span className="text-2xl">Home</span>
                </div>
              </Link>
              <Link to="/explore" className="group rounded-md flex-1 flex items-center hover:bg-slate-300 w-full">
                <div className="group-hover:translate-x-4 transition flex items-center gap-6 px-6">
                  <Navigation size={36}/>
                  <span className="text-2xl">Explore</span>
                </div>
              </Link>
              <Link to="/contact" className="group rounded-md flex-1 flex items-center hover:bg-slate-300 w-full">
                <div className="group-hover:translate-x-4 transition flex items-center gap-6 px-6">
                  <Phone size={36}/>
                  <span className="text-2xl">Contact</span>
                </div>
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
        <div className="flex justify-between items-center gap-16">
          <Link to="/about" className="group hidden md:flex flex-col justify-between items-center gap-1">
            <Info size={24} className="transition group-hover:-translate-y-1 group-hover:scale-[115%]"/>
            <span className="transition group-hover:-translate-y-[2px] font-bold text-sm text-slate-700">About</span>
          </Link>
          <Link to="/" className="group hidden md:flex flex-col justify-between items-center gap-1">
            <House size={24} className="transition group-hover:-translate-y-1 group-hover:scale-[115%]"/>
            <span className="transition group-hover:-translate-y-[2px] font-bold text-sm text-slate-700">Home</span>
          </Link>
          <img src={siteLogo} alt="Mealicious Logo" className="w-[150px]"/>
          <Link to="/explore" className="group hidden md:flex flex-col justify-between items-center gap-1">
            <Navigation size={24} className="transition group-hover:-translate-y-1 group-hover:scale-[115%]"/>
            <span className="transition group-hover:-translate-y-[2px] font-bold text-sm text-slate-700">Explore</span>
          </Link>
          <Link to="/contact" className="group hidden md:flex flex-col justify-between items-center gap-1">
            <Phone size={24} className="transition group-hover:-translate-y-1 group-hover:scale-[115%]"/>
            <span className="transition group-hover:-translate-y-[2px] font-bold text-sm text-slate-700">Contact</span>
          </Link>
        </div>
        {styleResults()}
      </div>
    </div>
  )
}