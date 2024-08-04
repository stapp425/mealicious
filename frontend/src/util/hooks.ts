import { useState, useEffect } from "react"
import { type DocumentSnapshot, getDoc, getDocs, updateDoc, type QuerySnapshot, type Query, doc, addDoc, collection } from "firebase/firestore"
import { firestoreTest } from "./fetch"
import { defaultRecipe, Recipe } from "@/types/recipe"
import { firestore, storage } from "../../../firebaseConfig"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { useToast } from "@/components/ui/use-toast"
import * as dateFns from "date-fns"
import { Obj } from "@/types/app"

interface HasDate extends Obj {
  date: number
}

export const currentDay = new Date()

export function useCalendar<T extends HasDate>(data: T[]) {
  const [currentMonth, setCurrentMonth] = useState<Date>(currentDay)
  const [events, setEvents] = useState<T[]>([])
  
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
    if(data.length > 0)
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

export function useFirestoreFetch<T>(query: Query | undefined, initialData: T[]) {
  const { toast } = useToast()
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
        toast({
          title: "Error!",
          description: err.message,
          variant: "destructive"
        })
      } finally {
        setIsFetching(false)
      }
    }
  }, [query])

  return { isFetching, data, setData }
}

export function useFirestoreGet<T>(name: string, id: string) {
  const { toast } = useToast()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T>()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const result: DocumentSnapshot = await getDoc(doc(firestore, name, id))
      const filteredData = { ...result.data(), id: result.id } as T
      setData(filteredData)
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

  return { isFetching, data, fetchData }
}

export function useFirestoreUpdate() {
  const { toast } = useToast()
  const [isWorking, setIsWorking] = useState<boolean>(false)
  
  async function updateFirestoreDoc(path: string, id: string, data: {[key: string]: any}) {
    try {
      setIsWorking(true)
      await updateDoc(doc(firestore, path, id), data)
      toast({
        title: "Success!",
        description: "Document successfully updated.",
        variant: "success"
      })
    } catch (err: any) {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive"
      })
    } finally {
      setIsWorking(false)
    }
  }

  return { isWorking, updateFirestoreDoc }
}

export function useFirestorePost() {
  const [isWorking, setIsWorking] = useState<boolean>(false)
  const { toast } = useToast()
  async function addFirestoreDoc(path: string, data: Obj) {
    try {
      setIsWorking(true)
      await addDoc(collection(firestore, path), data)
      toast({
        title: "Success!",
        description: "Successfully added document.",
        variant: "success"
      })
    } catch (err: any) {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive"
      })
    } finally {
      setIsWorking(false)
    }
  }

  return { isWorking, addFirestoreDoc }
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
  const { toast } = useToast()

  async function uploadFile(file: File, fileName: string) {
    try {
      const image = await uploadBytes(ref(storage, fileName), file)
      const imageRef = await getDownloadURL(image.ref)

      return imageRef
    } catch (err: any) {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive"
      })
    }
  }

  return uploadFile
}

export function useStorageDelete() {
  async function deleteFile(fileName: string) {
    try {
      const imageRef = ref(storage, fileName)
      await deleteObject(imageRef)
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return deleteFile
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

export function useInputChange<T extends {[key: string]: unknown}>(initialInput: T) {
  const [input, setInput] = useState<T>(initialInput)
  const [isEditActive, setIsEditActive] = useState<boolean>(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setInput(i => ({ ...i, [name]: value }))
  }

  return { input, isEditActive, setIsEditActive, setInput, handleChange }
}