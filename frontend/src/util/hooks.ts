import { useState, useEffect } from "react"
import { type DocumentSnapshot, getDoc, getDocs, updateDoc, type QuerySnapshot, type Query, doc, addDoc, collection } from "firebase/firestore"
import { firestoreTest } from "./fetch"
import { defaultRecipe, Recipe } from "@/types/recipe"
import { firestore, storage } from "../../../firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useToast } from "@/components/ui/use-toast"

export function useFirestoreFetch<T>(query: Query, initialData: T[]) {
  const { toast } = useToast()
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
  const { toast } = useToast()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<T>()

  useEffect(() => {
    fetchData()
    async function fetchData() {
      try {
        const result: DocumentSnapshot = await getDoc(doc(firestore, name, id))
        const filteredData: T = { ...result.data(), id: result.id } as T
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

export function useStorageUpload() {
  const { toast } = useToast()

  async function uploadFile(file: File, fileName: string) {
    try {
      const image = await uploadBytes(ref(storage, fileName), file)
      const imageRef = await getDownloadURL(image.ref)
      toast({
        title: "Success!",
        description: "File successfully added.",
        variant: "success"
      })
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

export function useFirestoreUpdate() {
  const { toast } = useToast()
  const [isWorking, setIsWorking] = useState<boolean>(false)
  
  async function updateFirestoreDoc(id: string, data: {[key: string]: any}) {
    try {
      setIsWorking(true)
      await updateDoc(doc(firestore, "recipes", id), data)
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
  async function addFirestoreDoc(path: string, data: {[key: string]: any}) {
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