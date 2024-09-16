import { type Recipe } from "@/types/recipe"

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