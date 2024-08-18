import { useState, useEffect } from "react"
import { type DocumentSnapshot, getDoc, getDocs, updateDoc, type QuerySnapshot, type Query, doc, addDoc, collection, deleteDoc } from "firebase/firestore"
import { type FirestoreCollection, type Obj } from "@/types/app"
import { firestoreTest } from "./fetch"
import { defaultRecipe, Recipe } from "@/types/recipe"
import { firestore, storage } from "../../../firebaseConfig"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { useToast } from "@/components/ui/use-toast"
import * as dateFns from "date-fns"

interface HasDate extends Obj {
  date: Date
}

export const now = new Date()

export function useCalendar<T extends HasDate>(data: T[]) {
  const [currentMonth, setCurrentMonth] = useState<Date>(now)
  const [events, setEvents] = useState<T[]>(data)
  
  const fullCurrentMonth = getFullCurrentMonth(currentMonth)
  
  const adjacentMonths = {
    previous: dateFns.format(dateFns.add(currentMonth, { months: -1 }), "MMM yyyy"),
    next: dateFns.format(dateFns.add(currentMonth, { months: 1 }), "MMM yyyy")
  }

  const intervals = {
    monthStart: dateFns.startOfMonth(currentMonth),
    monthEnd: dateFns.endOfMonth(currentMonth)
  }

  const detailedMonth = {
    days: dateFns.eachDayOfInterval({ 
      start: intervals.monthStart, 
      end: intervals.monthEnd
    }),
  }

  const currentMonthEvents = events.filter(event => dateFns.getMonth(event.date) === dateFns.getMonth(currentMonth))

  function setPreviousMonth() {
    return setCurrentMonth(m => dateFns.addMonths(m, -1))
  }

  function setNextMonth() {
    return setCurrentMonth(m => dateFns.addMonths(m, 1))
  }

  function getFullCurrentMonth(day: Date) {
    const startDate = dateFns.startOfWeek(dateFns.startOfMonth(day))
    const endDate = dateFns.endOfWeek(dateFns.endOfMonth(day))
    const interval = { start: startDate, end: endDate }

    return dateFns.eachDayOfInterval(interval)
  }

  function getEventsOfDate(date: number) {
    const interval = dateFns.interval(dateFns.startOfDay(date), dateFns.endOfDay(date))
    const dateEvents = currentMonthEvents.filter(event => dateFns.isWithinInterval(event.date, interval))
    
    return dateEvents
  }
  
  useEffect(() => {
    if(data.length > 0 && data[0].title)
      setEvents(data)
  }, [data])
  
  return {
    currentMonth,
    fullCurrentMonth,
    events,
    currentMonthEvents,
    setPreviousMonth,
    setNextMonth,
    getEventsOfDate,
    dates: {
      adjacentMonths,
      detailedMonth
    }
  }
}

export function useFirestoreFetch<T>(initialData: T[], query?: Query) {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T[]>(initialData)
  
  useEffect(() => {
    query && fetchRecipes()
    async function fetchRecipes() {
      try {
        const data: QuerySnapshot = await getDocs(query as Query)
        const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as T))
        setData(filteredData)
      } catch (err: any) {
        throw err
      } finally {
        setIsFetching(false)
      }
    }
  }, [query])

  return { isFetching, data, setData }
}

export function useFirestoreGet<T>(initialData: T, location: { name: FirestoreCollection, id: string }) {
  const { name, id } = location
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T>(initialData)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const result: DocumentSnapshot = await getDoc(doc(firestore, name, id))
      const filteredData = { ...result.data(), id: result.id } as T
      setData(filteredData)
    } catch (err: any) {
      throw err
    } finally {
      setIsFetching(false)
    }
  }

  return { isFetching, data, fetchData }
}

export function useFirestoreUpdate<T extends Obj>() {
  const { toast } = useToast()
  const [isWorking, setIsWorking] = useState<boolean>(false)
  
  async function updateFirestoreDoc(data: T, location: { name: FirestoreCollection, id: string }) {
    try {
      const { name, id } = location
      setIsWorking(true)
      await updateDoc(doc(firestore, name, id), data)
      toast({
        title: "Success!",
        description: "Document successfully updated.",
        variant: "success"
      })
    } catch (err: any) {
      throw err
    } finally {
      setIsWorking(false)
    }
  }

  return { isWorking, updateFirestoreDoc }
}

export function useFirestorePost<T extends Obj>() {
  const [isWorking, setIsWorking] = useState<boolean>(false)
  const { toast } = useToast()

  async function addFirestoreDoc(data: T, location: { name: FirestoreCollection }) {
    try {
      setIsWorking(true)
      const docRef = await addDoc(collection(firestore, location.name), data)
      const docData = await getDoc(docRef)
      toast({
        title: "Success!",
        description: "Successfully added document.",
        variant: "success"
      })

      return docData
    } catch (err: any) {
      throw err
    } finally {
      setIsWorking(false)
    }
  }

  return { isWorking, addFirestoreDoc }
}

export function useFirestoreDelete() {
  const { toast } = useToast()
  const [isWorking, setIsWorking] = useState<boolean>(false)
  
  async function deleteFirestoreDoc(location: { name: FirestoreCollection, id: string }) {
    try {
      const { name, id } = location
      setIsWorking(true)
      await deleteDoc(doc(firestore, name, id))
      toast({
        title: "Alert!",
        description: "Document successfully deleted.",
        variant: "destructive"
      })
    } catch (err: any) {
      throw err
    } finally {
      setIsWorking(false)
    }
  }

  return { isWorking, deleteFirestoreDoc }
}

export function useFirestoreTest() {
  const { toast } = useToast()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<Recipe[]>([defaultRecipe])

  useEffect(() => {
    fetchTest()
    async function fetchTest() {
      try {
        const fetchedTestData: Recipe[] = await firestoreTest()
        setData(fetchedTestData)
      } catch (err: any) {
        toast({
          title: "Error!",
          description: err.message,
          variant: "destructive"
        })
      } finally {
        setIsFetching(false)
      }
    }
  }, [])

  return { isFetching, data, setData }
}


export function useStorageUpload() {
  const [isUploading, setIsUploading] = useState<boolean>(false)

  async function uploadFile(file: File, fileName: string) {
    try {
      setIsUploading(true)
      const image = await uploadBytes(ref(storage, fileName), file)
      const imageRef = await getDownloadURL(image.ref)
      setIsUploading(false)

      return imageRef
    } catch (err: any) {
      setIsUploading(false)
      throw err
    }
  }

  return { isUploading, uploadFile }
}

export function useStorageDelete() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  async function deleteFile(fileName: string) {
    try {
      const imageRef = ref(storage, fileName)

      setIsDeleting(true)
      await deleteObject(imageRef)
    } catch (err: any) {
      throw err
    } finally {
      setIsDeleting(false)
    }
  }

  return { isDeleting, deleteFile }
}

export function useScroll() {
  const [scrollPoints, setScrollPoints] = useState<{ x: number, y: number }>({
    x: scrollX,
    y: scrollY
  })

  useEffect(() => {
    function handleScroll() {
      setScrollPoints({ x: scrollX, y: scrollY })
    }
    
    addEventListener("scroll", handleScroll)

    return () => removeEventListener("scroll", handleScroll)
  }, [])

  return scrollPoints
}

export function useInputChange<T extends Obj>(initialInput: T) {
  const [input, setInput] = useState<T>(initialInput)
  const [isEditActive, setIsEditActive] = useState<boolean>(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setInput(i => ({ ...i, [name]: value }))
  }

  return { input, isEditActive, setIsEditActive, setInput, handleChange }
}