import { useState, useEffect, useRef, useContext } from "react"
import { type User } from "firebase/auth"
import { firestore } from "../../../firebaseConfig"
import { query, where, getDocs, collection } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { signOut } from "@/util/auth"
import fetchFromAPI from "@/util/fetch"
import { Link, useNavigate } from "react-router-dom" 
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import SavedMealsSearchBar from "./SavedMealsSearchBar"
import { UserContext } from "@/App"
import NewMealSearchBar from "./NewMealSearchBar"
import Header from "./Header"

export default function Meals() {
  const currentUser = useContext<User | null>(UserContext)
  const { toast } = useToast()
  const navigate = useNavigate()
  const mealsCollectionRef = useRef(collection(firestore, "meals"))
  const [userMeals, setUserMeals] = useState<any>("Loading...")

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
    <>
      <Button onClick={() => navigate("search")}>
        Search a New Meal
      </Button>
      <Button onClick={() => navigate("/test")}>
        Go to Test
      </Button>
      {/* <SavedMealsSearchBar/> */}
      <Toaster/>
      <div>
        {userMeals ? JSON.stringify(userMeals) : "Failure"}
      </div>
    </>
  )
}