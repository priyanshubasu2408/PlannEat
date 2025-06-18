import { useState, useEffect } from 'react'
import { recipeAPI } from '../services/api'
import { matchesDietaryRestrictions } from '../utils/helpers'

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchRecipes = async (query, searchType = 'name') => {
    if (!query.trim()) {
      setRecipes([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      let results = []
      
      if (searchType === 'name') {
        results = await recipeAPI.searchByName(query)
      } else if (searchType === 'ingredient') {
        results = await recipeAPI.searchByIngredient(query)
      }

      setRecipes(results)
    } catch (err) {
      setError('Failed to search recipes. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getRandomRecipe = async () => {
    setLoading(true)
    setError(null)

    try {
      const randomRecipe = await recipeAPI.getRandomRecipe()
      if (randomRecipe) {
        setRecipes([randomRecipe])
      }
    } catch (err) {
      setError('Failed to fetch random recipe. Please try again.')
      console.error('Random recipe error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterRecipes = async (filters) => {
    setLoading(true)
    setError(null)

    try {
      let results = []

      if (filters.category) {
        results = await recipeAPI.getRecipesByCategory(filters.category)
      } else if (filters.area) {
        results = await recipeAPI.getRecipesByArea(filters.area)
      } else if (filters.dietaryPreference) {
        // For dietary preference, we'll get a broader set and filter client-side
        if (filters.dietaryPreference === 'vegetarian') {
          // Try to get vegetarian category first
          results = await recipeAPI.getRecipesByCategory('Vegetarian')
          // If no results, get a broader set and filter
          if (results.length === 0) {
            results = await recipeAPI.searchByName('vegetable')
          }
        } else if (filters.dietaryPreference === 'non-vegetarian') {
          // Get meat-based categories
          const meatCategories = ['Chicken', 'Beef', 'Pork', 'Seafood', 'Lamb']
          const randomCategory = meatCategories[Math.floor(Math.random() * meatCategories.length)]
          results = await recipeAPI.getRecipesByCategory(randomCategory)
        }
      } else {
        // If no specific filter, get random recipes
        const randomRecipe = await recipeAPI.getRandomRecipe()
        if (randomRecipe) {
          results = [randomRecipe]
        }
      }

      // Apply client-side filtering for dietary preferences
      if (filters.dietaryPreference && results.length > 0) {
        results = results.filter(recipe => 
          matchesDietaryRestrictions(recipe, [filters.dietaryPreference])
        )
      }

      setRecipes(results)
    } catch (err) {
      setError('Failed to filter recipes. Please try again.')
      console.error('Filter error:', err)
    } finally {
      setLoading(false)
    }
  }

  const clearRecipes = () => {
    setRecipes([])
    setError(null)
  }

  return {
    recipes,
    loading,
    error,
    searchRecipes,
    getRandomRecipe,
    filterRecipes,
    clearRecipes
  }
}

export const useRecipeDetail = (recipeId) => {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) return

      setLoading(true)
      setError(null)

      try {
        const recipeData = await recipeAPI.getRecipeById(recipeId)
        if (recipeData) {
          setRecipe(recipeData)
        } else {
          setError('Recipe not found')
        }
      } catch (err) {
        setError('Failed to fetch recipe details')
        console.error('Recipe detail error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [recipeId])

  return { recipe, loading, error }
}