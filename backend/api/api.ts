import express, { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()
const apiRouter = express.Router()
apiRouter.get("/meals/search", searchMeals)

// TODO: Add spoonacular search
async function searchMeals(req:Request, res:Response) {
	const query = new URLSearchParams(req.query as {[key: string]: any})
	query.append("apiKey", process.env.apiKey as string)
	query.append("addRecipeInstructions", "true")
	query.append("addRecipeInformation", "true")
	query.append("addRecipeNutrition", "true")
	
	try {
		const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${query.toString()}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await response.json()
		const parsedData = await formatResults(data)
		res.json(parsedData)
	} catch (err:any) {
		res.sendStatus(500)
		console.error(err.message)
	}
}

function formatResults(data: {[key:string]: any}) {
	return new Promise(resolve => {
		const results:{[key:string]: any} = data.results
		
		const parsedResults = results.length > 0 ? results.map((result:{[key:string]: any}) => ({
      title: result.title,
      image: result.image,
			description: result.summary?.replace(/<[^>]*>/g, ""),
      source: {
        name: result.sourceName,
        url: result.sourceUrl
      },
      diets: result.diets,
      dishTypes: result.dishTypes,
      isHealthy: result.veryHealthy,
			times: {
				prepTime: result.preparationMinutes || 0,
				cookTime: result.cookingMinutes || 0,
				readyTime: result.readyInMinutes,
			},
      servingSize: result.nutrition?.weightPerServing,
      nutrition: result.nutrition?.nutrients?.map((n:{[key:string]: any}) => ({
        name: n.name,
        amount: n.amount,
        unit: n.unit
      })),
      ingredients: result.nutrition?.ingredients?.map((i:{[key:string]: any}) => ({
        name: i.name,
        amount: i.amount,
        unit: i.unit
      })),
      instructions: result.analyzedInstructions[0]?.steps?.map((step:{[key:string]: any}) => ({
				number: step.number,
				step: step.step,
				ingredients: step.ingredients?.map((i:{[key:string]: any}) => ({ name: i.name, image: i.image }))
			}))
    })) : [{
			resultIndex: 0,
			title: "",
			image: "",
			description: "",
			source: {
				name: "",
				url: ""
			},
			diets: [],
			dishTypes: [],
			isHealthy: false,
			times: {
				prepTime: 0,
				cookTime: 0,
				readyTime: 0
			},
			servingSize: {
				amount: 0,
				unit: ""
			},
			nutrition: [],
			ingredients: [],
			instructions: []
		}]

		resolve(parsedResults)
	})
}

export default apiRouter