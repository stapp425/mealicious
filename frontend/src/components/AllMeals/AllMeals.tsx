import { AppContext } from "@/App"
import { collection, query, Query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { firestore } from "../../../../firebaseConfig"
import { useFirestoreFetch } from "@/util/hooks"
import { defaultMeal, Meal } from "@/types/meal"
import { Link } from "react-router-dom"

const AllMeals: React.FC = () => {
  const { user } = useContext(AppContext)
  const [q, setQ] = useState<Query>()
  const { data } = useFirestoreFetch<Meal>([defaultMeal], q)
  
  useEffect(() => {
    user && setQ(query(collection(firestore, "meals"), where("userId", "==", user.uid)))
  }, [user])

  return (
    <div className="flex flex-col gap-2">
      {
        data.map(data => (
          <div>
            {data.title}
            <Link to={`/meals/edit/${data.id}`}>
              Edit Recipe
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default AllMeals