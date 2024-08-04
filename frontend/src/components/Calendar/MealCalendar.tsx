import { CurrentUser } from "@/types/app"
import { UserContext } from "@/App"
import { useContext, useEffect, useState } from "react"
import { useFirestoreFetch } from "@/util/hooks"
import { collection, query, Query, where } from "firebase/firestore"
import { firestore } from "../../../../firebaseConfig"
import Calendar from "./Calendar"
import CreateEvent from "./CreateEvent"
import DragAndDrop from "./DragAndDrop"

const MealCalendar: React.FC = () => {
  const user = useContext<CurrentUser>(UserContext)
  const [q, setQ] = useState<Query>()

  // const { data } = useFirestoreFetch<{ date: number, title: string, description: string }>(q, [])

  // useEffect(() => {
  //   if(user) {
  //     setQ(query(collection(firestore, "test"), where("userId", "==", user.uid)))
  //   }
  // }, [user])
  
  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-start gap-2">
      {/* <Calendar data={data}/> */}
      <CreateEvent/>
      <DragAndDrop/>
    </div>
  )
}

export default MealCalendar