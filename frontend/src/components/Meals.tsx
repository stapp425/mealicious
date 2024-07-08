import { useState, useEffect, useRef, useContext } from "react"
import { type User } from "firebase/auth"
import { firestore } from "../../../firebaseConfig"
import { query, where, getDocs, collection } from "firebase/firestore"
import { useMediaQuery } from "usehooks-ts"
import { Link, useNavigate } from "react-router-dom" 
import { useToast } from "@/components/ui/use-toast"
import { UserContext } from "@/App"
import defaultProfilePicture from "@/img/default-pfp.svg"
import spoonacularLogo from "@/img/logo/spoonacular-logo.svg"
import { Separator } from "@/components/ui/separator"
import { signOut } from "@/util/auth"

export default function Meals() {
  const matchesLg = useMediaQuery("(min-width: 1024px)")
  const matchesXl = useMediaQuery("(min-width: 1280px)")
  const currentUser = useContext<User | null>(UserContext)
  const { toast } = useToast()
  const navigate = useNavigate()
  const mealsCollectionRef = useRef(collection(firestore, "meals"))
  const [userMeals, setUserMeals] = useState<any>("Loading...")
  const profilePicture = currentUser?.photoURL || defaultProfilePicture

  // useEffect(() => {
  //   user && fetchMeals()
  //   async function fetchMeals() {
  //     // const q = query(mealsCollectionRef, where("userId", "==", user.uid))
  //     // try {
  //     //   const meals = await getDocs(q)
  //     //   const fetchedMeals = meals.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //     //   console.log("Success!")
  //     //   setUserMeals(fetchedMeals)
  //     // } catch (err:any) {
  //     //   toast({
  //     //     title: "Error!",
  //     //     description: err.message,
  //     //     variant: "destructive"
  //     //   })
  //     // }

  //     // TODO: Format search results
  //     // const response = await fetchFromAPI("GET", "/api/meals/search", { 
  //     //   query: "alfredo", addRecipeInformation: true, addRecipeInstructions: true })
  //     // setUserMeals(response)
  //   }
  // }, [])
  
  return (
    <div className="flex-1 grid grid-rows-[150px_50%_auto] grid-cols-[225px_auto] xl:grid-rows-[150px_auto] xl:grid-cols-[300px_auto_250px] gap-4 p-4 *:border *:border-black">
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
      <div className="row-start-3 xl:row-start-1 xl:col-start-3 flex flex-col justify-between items-stretch gap-2 bg-orange-500 p-3 rounded-md">
        <div className="flex flex-col-reverse xl:flex-row justify-between items-center gap-1">
          <h1 className="text-md xl:text-2xl text-center xl:text-left font-[600] text-white">
            Search with Spoonacular
          </h1>
          <img
            src={spoonacularLogo}
            alt="Spoonacular Logo"
            className="w-[72px]" 
          />
        </div>
        <Separator className=""/>
        <button className="text-black bg-white px-5 py-1 rounded-sm font-[600]" onClick={() => navigate("/meals/search")}>
          Search
        </button>
        
      </div>
      <div className="row-start-2 xl:row-span-1">
        Details
      </div>      
      <div className="row-start-2 col-start-2 col-span-2 xl:row-span-1 xl:col-span-1">
        Your Meals
      </div>
      <div className="row-start-3 col-span-2 xl:row-start-2 xl:col-start-3 xl:col-span-1">
        Saved Recipes
      </div>
    </div>
  )
}