import axios from 'axios'

// Base URL for TheMealDB API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// Recipe API functions
export const recipeAPI = {
  // Search recipes by name
  searchByName: async (query) => {
    try {
      const response = await api.get(`/search.php?s=${query}`)
      return response.data.meals || []
    } catch (error) {
      console.error('Error searching recipes by name:', error)
      return []
    }
  },

  // Search recipes by ingredient
  searchByIngredient: async (ingredient) => {
    try {
      const response = await api.get(`/filter.php?i=${ingredient}`)
      return response.data.meals || []
    } catch (error) {
      console.error('Error searching recipes by ingredient:', error)
      return []
    }
  },

  // Get recipe details by ID
  getRecipeById: async (id) => {
    try {
      const response = await api.get(`/lookup.php?i=${id}`)
      return response.data.meals ? response.data.meals[0] : null
    } catch (error) {
      console.error('Error fetching recipe details:', error)
      return null
    }
  },

  // Get random recipe
  getRandomRecipe: async () => {
    try {
      const response = await api.get('/random.php')
      return response.data.meals ? response.data.meals[0] : null
    } catch (error) {
      console.error('Error fetching random recipe:', error)
      return null
    }
  },

  // Get recipes by category
  getRecipesByCategory: async (category) => {
    try {
      const response = await api.get(`/filter.php?c=${category}`)
      return response.data.meals || []
    } catch (error) {
      console.error('Error fetching recipes by category:', error)
      return []
    }
  },

  // Get recipes by area/cuisine
  getRecipesByArea: async (area) => {
    try {
      const response = await api.get(`/filter.php?a=${area}`)
      return response.data.meals || []
    } catch (error) {
      console.error('Error fetching recipes by area:', error)
      return []
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/categories.php')
      return response.data.categories || []
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  },

  // Get all areas/cuisines
  getAreas: async () => {
    try {
      const response = await api.get('/list.php?a=list')
      return response.data.meals || []
    } catch (error) {
      console.error('Error fetching areas:', error)
      return []
    }
  },

  // Get all ingredients
  getIngredients: async () => {
    try {
      const response = await api.get('/list.php?i=list')
      return response.data.meals || []
    } catch (error) {
      console.error('Error fetching ingredients:', error)
      return []
    }
  }
}

// Utility function to parse recipe instructions
export const parseInstructions = (instructions) => {
  if (!instructions) return []
  
  // Split by periods, newlines, or numbered steps
  const steps = instructions
    .split(/\.\s+|\n+|\d+\.?\s+/)
    .filter(step => step.trim().length > 10)
    .map(step => step.trim())
  
  return steps
}

// Utility function to get ingredients list
export const getIngredientsList = (recipe) => {
  if (!recipe) return []
  
  const ingredients = []
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      })
    }
  }
  
  return ingredients
}

// Utility function to estimate calories (rough estimation)
export const estimateCalories = (recipe) => {
  if (!recipe) return 0
  
  const ingredients = getIngredientsList(recipe)
  // Very rough estimation based on common ingredients
  const calorieEstimate = ingredients.length * 50 + Math.floor(Math.random() * 200) + 200
  return calorieEstimate
}

export default api