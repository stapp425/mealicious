import { useState, useEffect } from "react"
import { type DocumentSnapshot, getDoc, getDocs, updateDoc, type QuerySnapshot, type Query, doc, addDoc, collection, deleteDoc, Timestamp } from "firebase/firestore"
import { type FirestoreCollection, type Obj } from "@/util/types/app"
import { firestore, storage } from "../../firebaseConfig"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { useToast } from "@/components/ui/use-toast"
import * as dateFns from "date-fns"
import { isTimestamp } from "@/util/types/plan"

interface HasDate extends Obj {
  date: Date | Timestamp
}

type Time = "day" | "week" | "month" | "year"

export const now = new Date()

type Adjacent = { previous: string, next: string }

export function useEventCalendar<T extends HasDate>(data: T[]) {
  const [currentDay, setCurrentDay] = useState<Date>(now)
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

    return events.filter(event => dateFns.isWithinInterval(event.date as Date, interval))
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
    if(data.length > 0)
      setEvents(formatEvents(data))

    function formatEvents(events: T[]) {
      return events.map(e => isTimestamp(e.date) ? ({ ...e, date: e.date.toDate() }) : e)
    }
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

export function useFirestoreFetch<T>(query: Query, formatFunction: (value: T[]) => Promise<T[]>, initialData: T[] = []) {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T[]>(initialData)
  
  useEffect(() => {
    fetchData()

    async function fetchData() {
      try {
        const data: QuerySnapshot = await getDocs(query)
        const snapshot = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as T))
        const filteredData = snapshot.length > 0 ? await formatFunction(snapshot) : []
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

export function useFirestoreGet<T>(path: FirestoreCollection, id: string, formatFunction: (value: T) => Promise<T>, initialData: T) {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T>(initialData)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const result: DocumentSnapshot = await getDoc(doc(firestore, path, id))
      const snapshot = { ...result.data(), id: result.id } as T
      const filteredData = await formatFunction(snapshot)
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
  
  async function updateFirestoreDoc(path: FirestoreCollection, id: string, data: T) {
    try {
      setIsWorking(true)
      await updateDoc(doc(firestore, path, id), data)
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

  async function addFirestoreDoc(path: FirestoreCollection, data: T) {
    try {
      setIsWorking(true)
      const docRef = await addDoc(collection(firestore, path), data)
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
  
  async function deleteFirestoreDoc(path: FirestoreCollection, id: string) {
    try {
      setIsWorking(true)
      await deleteDoc(doc(firestore, path, id))
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