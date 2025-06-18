import { format, parse } from 'date-fns'

// Format cooking time
export const formatCookingTime = (minutes) => {
  if (!minutes) return 'N/A'
  
  if (minutes < 60) {
    return `${minutes} min`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }
}

// Truncate text to specified length
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Capitalize first letter
export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Format date for display
export const formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'MMM dd, yyyy')
}

// Format date for day display
export const formatDayDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'EEE, MMM dd')
}

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// Check if string is empty or whitespace
export const isEmpty = (str) => {
  return !str || str.trim().length === 0
}

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Calculate estimated prep time based on ingredients
export const estimatePrepTime = (ingredientsCount) => {
  if (ingredientsCount <= 5) return 15
  if (ingredientsCount <= 10) return 30
  if (ingredientsCount <= 15) return 45
  return 60
}

// Check if recipe is vegetarian based on ingredients and category
export const isVegetarianRecipe = (recipe) => {
  if (!recipe) return false
  
  const recipeTitle = recipe.strMeal?.toLowerCase() || ''
  const recipeCategory = recipe.strCategory?.toLowerCase() || ''
  const recipeInstructions = recipe.strInstructions?.toLowerCase() || ''
  
  // Check if explicitly vegetarian/vegan
  if (recipeCategory.includes('vegetarian') || recipeCategory.includes('vegan')) {
    return true
  }
  
  // Check for non-vegetarian keywords
  const nonVegKeywords = [
    'chicken', 'beef', 'pork', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp', 
    'prawn', 'crab', 'lobster', 'meat', 'bacon', 'ham', 'sausage', 'turkey',
    'duck', 'goose', 'venison', 'rabbit', 'seafood', 'anchovy', 'sardine'
  ]
  
  const hasNonVegIngredients = nonVegKeywords.some(keyword => 
    recipeTitle.includes(keyword) || 
    recipeInstructions.includes(keyword)
  )
  
  // Check ingredients list for non-vegetarian items
  let hasNonVegInIngredientsList = false
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]?.toLowerCase() || ''
    if (ingredient && nonVegKeywords.some(keyword => ingredient.includes(keyword))) {
      hasNonVegInIngredientsList = true
      break
    }
  }
  
  return !hasNonVegIngredients && !hasNonVegInIngredientsList
}

// Generate shopping list from meal plan
export const generateShoppingList = (weekMealPlan) => {
  const shoppingList = new Map()
  
  weekMealPlan.forEach(day => {
    Object.values(day.meals).forEach(meal => {
      if (meal && meal.ingredients) {
        meal.ingredients.forEach(ingredient => {
          if (shoppingList.has(ingredient.name)) {
            const existing = shoppingList.get(ingredient.name)
            shoppingList.set(ingredient.name, {
              ...existing,
              quantity: existing.quantity + 1
            })
          } else {
            shoppingList.set(ingredient.name, {
              name: ingredient.name,
              measure: ingredient.measure,
              quantity: 1
            })
          }
        })
      }
    })
  })
  
  return Array.from(shoppingList.values())
}

// Check if recipe matches dietary restrictions
export const matchesDietaryRestrictions = (recipe, restrictions) => {
  if (!restrictions || restrictions.length === 0) return true
  
  const recipeTitle = recipe.strMeal?.toLowerCase() || ''
  const recipeCategory = recipe.strCategory?.toLowerCase() || ''
  
  return restrictions.every(restriction => {
    switch (restriction.toLowerCase()) {
      case 'vegetarian':
        return isVegetarianRecipe(recipe)
      case 'non-vegetarian':
        return !isVegetarianRecipe(recipe)
      case 'vegan':
        return recipeCategory.includes('vegan')
      case 'gluten free':
        return !recipeTitle.includes('pasta') && 
               !recipeTitle.includes('bread') && 
               !recipeTitle.includes('flour')
      case 'dairy free':
        return !recipeTitle.includes('cheese') && 
               !recipeTitle.includes('milk') && 
               !recipeTitle.includes('butter')
      default:
        return true
    }
  })
}

// Local storage helpers
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue
  }
}

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}