import { toast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { type DocumentReference, type DocumentSnapshot, getDoc, getDocs, QuerySnapshot, type Query, CollectionReference, doc } from "firebase/firestore"
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