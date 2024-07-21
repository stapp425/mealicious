import { toast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { type DocumentSnapshot, getDoc, getDocs, updateDoc, type QuerySnapshot, type Query, doc } from "firebase/firestore"
import { firestoreTest } from "./fetch"
import { defaultRecipe, Recipe } from "@/types/recipe"
import { firestore } from "../../../firebaseConfig"

export function useFirestoreFetch<T>(query: Query, initialData: T[]) {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T[]>(initialData)
  
  useEffect(() => {
    fetchRecipes()
    async function fetchRecipes() {
      try {
        const data: QuerySnapshot = await getDocs(query as Query)
        const filteredData: T[] = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as T))
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
  }, [])

  return { isFetching, data, setData }
}

export function useFirestoreGet<T>(name: string, id: string) {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T>()

  useEffect(() => {
    fetchData()
    async function fetchData() {
      try {
        const result: DocumentSnapshot = await getDoc(doc(firestore, name, id))
        const filteredData: T = result.data() as T
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
  }, [])

  return { isFetching, data }
}

export function useFirestoreUpdate(id: string, data: {[key: string]: any}) {
  const [isWorking, setIsWorking] = useState<boolean>(false)
  
  async function updateFirestoreDoc() {
    try {
      setIsWorking(true)
      await updateDoc(doc(firestore, "recipes", id), data)
      toast({
        title: "Success!",
        description: "Successfully favorited recipe.",
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

export function useFirestoreTest() {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<Recipe[]>(defaultRecipe)

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