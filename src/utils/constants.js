// Meal types for meal planning
export const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack'
}

// Days of the week
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

// Recipe categories (from TheMealDB)
export const RECIPE_CATEGORIES = [
  'Beef',
  'Chicken',
  'Dessert',
  'Lamb',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
  'Vegan',
  'Vegetarian',
  'Breakfast',
  'Goat'
]

// Cuisine areas (from TheMealDB)
export const CUISINE_AREAS = [
  'American',
  'British',
  'Canadian',
  'Chinese',
  'Croatian',
  'Dutch',
  'Egyptian',
  'French',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Jamaican',
  'Japanese',
  'Kenyan',
  'Malaysian',
  'Mexican',
  'Moroccan',
  'Polish',
  'Portuguese',
  'Russian',
  'Spanish',
  'Thai',
  'Tunisian',
  'Turkish',
  'Ukrainian',
  'Vietnamese'
]

// Diet types (for filtering)
export const DIET_TYPES = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'Dairy Free',
  'Keto',
  'Low Carb',
  'High Protein'
]

// Calorie ranges for filtering
export const CALORIE_RANGES = [
  { label: 'Under 300', min: 0, max: 300 },
  { label: '300-500', min: 300, max: 500 },
  { label: '500-700', min: 500, max: 700 },
  { label: '700-1000', min: 700, max: 1000 },
  { label: 'Over 1000', min: 1000, max: 9999 }
]

// Default recipe image fallback
export const DEFAULT_RECIPE_IMAGE = 'https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'

// Nutritional information labels
export const NUTRITION_LABELS = {
  calories: 'Calories',
  protein: 'Protein (g)',
  carbs: 'Carbs (g)',
  fat: 'Fat (g)',
  fiber: 'Fiber (g)',
  sugar: 'Sugar (g)'
}