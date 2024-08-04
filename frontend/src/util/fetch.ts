import searchSample, { firestoreData } from "@/test"
import { defaultRecipe, type Recipe } from "@/types/recipe"
import { doc, DocumentSnapshot } from "@firebase/firestore"
import { getDoc } from "firebase/firestore"
import { firestore } from "../../../firebaseConfig"

export default async function fetchFromAPI(httpMethod: string, path: string, queries: {[key: string]: any} | null = null, headers: any = null, body: any = null): Promise<Recipe[]> {
	const backendURL = `http://localhost:3000`
	const passedQueries = new URLSearchParams(queries as {[key: string]: any})

  if(httpMethod === "GET" && body)
    throw new Error("An HTTP GET request must not have a body.")

  try {
    const response = httpMethod === "GET"
      ? await fetch(`${backendURL}${path}${passedQueries && "?" + passedQueries}`, {
          headers: {
            "Content-Type": "application/json",
            ...headers
          },
        })
      : await fetch(`${backendURL}${path}${passedQueries && "?" + passedQueries}`, {
          method: httpMethod,
          headers: {
            "Content-Type": "application/json",
            ...headers
          },
          body: JSON.stringify(body)
        })

    return response.json()
  } catch (err: any) {
    throw err
  }
}

export function fetchTest(): Promise<Recipe[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(searchSample)
    }, 1500)
  })
}

export function firestoreTest(): Promise<Recipe[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(firestoreData)
    }, 1500)
  })
}