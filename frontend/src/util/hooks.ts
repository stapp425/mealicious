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

<<<<<<< HEAD
type Time = "day" | "week" | "month" | "year"
type Adjacent = { previous: string, next: string }

export function useEventCalendar<T extends HasDate>(data: T[]) {
  const [currentDay, setCurrentDay] = useState<Date>(now)
=======
export function useCalendar<T extends HasDate>(data: T[]) {
  const [currentMonth, setCurrentMonth] = useState<Date>(now)
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
  const [events, setEvents] = useState<T[]>(data)
  
  const adjacentDates: {[K in Time]: Adjacent} = {
    day: {
      previous: dateFns.format(dateFns.add(now, { days: -1 }), "MMM yyyy"),
      next: dateFns.format(dateFns.add(now, { days: 1 }), "MMM yyyy")
    },
    week: {
      previous: dateFns.format(dateFns.add(currentDay, { weeks: -1 }), "MMM yyyy"),
      next: dateFns.format(dateFns.add(currentDay, { weeks: 1 }), "MMM yyyy")
    },
    month: {
      previous: dateFns.format(dateFns.add(currentDay, { months: -1 }), "MMM yyyy"),
      next: dateFns.format(dateFns.add(currentDay, { months: 1 }), "MMM yyyy")
    },
    year: {
      previous: dateFns.format(dateFns.add(currentDay, { years: -1 }), "yyyy"),
      next: dateFns.format(dateFns.add(currentDay, { years: 1 }), "yyyy")
    }
  }

  const calendar = {
    day: currentDay,
    week: getFullWeek(currentDay),
    month: getFullMonth(currentDay),
    year: getFullYear(currentDay) 
  }

  const currentEvents = {
    day: getEventsOfInterval(dateFns.startOfDay(currentDay), dateFns.endOfDay(currentDay)),
    week: getEventsOfInterval(dateFns.startOfWeek(currentDay), dateFns.endOfWeek(currentDay)),
    month: getEventsOfInterval(dateFns.startOfMonth(currentDay), dateFns.endOfMonth(currentDay)),
    year: getEventsOfInterval(dateFns.startOfYear(currentDay), dateFns.endOfYear(currentDay))
  }

  function setDay(input: number) {
    return setCurrentDay(d => dateFns.addDays(d, input))
  }

  function setWeek(input: number) {
    return setCurrentDay(d => dateFns.addWeeks(d, input))
  }
  
  function setMonth(input: number) {
    return setCurrentDay(d => dateFns.addMonths(d, input))
  }

  function setYear(input: number) {
    return setCurrentDay(d => dateFns.addYears(d, input))
  }

  function getEventsOfInterval(start: Date, end: Date): T[] {
    const interval = { start, end }

    return events.filter(event => dateFns.isWithinInterval(event.date, interval))
  }

  function getFullWeek(day: Date): Date[] {
    return dateFns.eachDayOfInterval({
      start: dateFns.startOfWeek(day),
      end: dateFns.endOfWeek(day)
    })
  }
  
  function getFullMonth(day: Date): Date[] {
    return dateFns.eachDayOfInterval({
      start: dateFns.startOfWeek(dateFns.startOfMonth(day)),
      end: dateFns.endOfWeek(dateFns.endOfMonth(day))
    })
  }

  function getFullYear(day: Date): Date[][] {
    return dateFns.eachMonthOfInterval({
      start: dateFns.startOfWeek(dateFns.startOfYear(day)),
      end: dateFns.endOfWeek(dateFns.endOfYear(day))
    }).map(month => getFullMonth(month))
  }
  
  useEffect(() => {
    if(data.length > 0 && data[0].title)
      setEvents(data)
  }, [data])
  
  return {
    currentDay,
    setDay, setWeek,
    setMonth, setYear,
    getEventsOfInterval,
    adjacentDates,
    calendar,
    currentEvents
  }
}

<<<<<<< HEAD
export function useFirestoreFetch<T>(initialData: T[], query: Query) {
=======
export function useFirestoreFetch<T>(initialData: T[], query?: Query) {
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T[]>(initialData)
  
  useEffect(() => {
    fetchData()

    async function fetchData() {
      try {
        const data: QuerySnapshot = await getDocs(query)
        const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as T))
        setData(filteredData)
      } catch (err: any) {
        throw err
      } finally {
        setIsFetching(false)
      }
    }
  }, [])

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