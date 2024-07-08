export type Query = {
  query: string
}

export type Nutrition = {
  name: string
  amount: number
  unit: string
}

export type Ingredient = {
  name: string
  amount: number
  unit: string
}

export type InstructionIngredient = {
  name: string
  image: string
}

export type Instruction = {
  number: number,
  step: string
  ingredients: InstructionIngredient[]
}

export type Recipe = {
  resultIndex: number
  title: string
  image: string
  description: string
  source: {
    name: string
    url: string
  }
  diets: string[]
  dishTypes: string[]
  isHealthy: boolean
  times: {
    prepTime: number
    cookTime: number
    readyTime: number
  }
  servingSize: {
    amount: number,
    unit: string
  }
  nutrition: Nutrition[]
  ingredients: Ingredient[]
  instructions: Instruction[]
}

export const defaultRecipe: Recipe[] = [{
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