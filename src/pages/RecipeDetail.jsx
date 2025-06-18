import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  ArrowLeft, 
  Heart, 
  Clock, 
  Users, 
  ChefHat,
  Plus,
  CheckCircle,
  Calendar,
  Utensils,
  Leaf
} from 'lucide-react'
import { useRecipeDetail } from '../hooks/useRecipes'
import { useFavorites } from '../context/FavoritesContext'
import { useMealPlan } from '../context/MealPlanContext'
import { parseInstructions, getIngredientsList, estimateCalories } from '../services/api'
import { formatCookingTime, estimatePrepTime, isVegetarianRecipe } from '../utils/helpers'
import { MEAL_TYPES } from '../utils/constants'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

const RecipeDetail = () => {
  const { id } = useParams()
  const { recipe, loading, error } = useRecipeDetail(id)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { addMealToPlan } = useMealPlan()
  const [checkedIngredients, setCheckedIngredients] = useState(new Set())
  const [showMealPlanModal, setShowMealPlanModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedMealType, setSelectedMealType] = useState('')

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner size="xl" text="Loading recipe details..." />
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="page-container">
        <ErrorMessage 
          message={error || "Recipe not found"} 
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  const isRecipeFavorite = isFavorite(recipe.idMeal)
  const ingredients = getIngredientsList(recipe)
  const instructions = parseInstructions(recipe.strInstructions)
  const estimatedCalories = estimateCalories(recipe)
  const estimatedPrepTime = estimatePrepTime(ingredients.length)
  const isVegetarian = isVegetarianRecipe(recipe)

  const handleFavoriteToggle = () => {
    if (isRecipeFavorite) {
      removeFavorite(recipe.idMeal)
    } else {
      addFavorite({
        ...recipe,
        ingredients,
        estimatedCalories,
        estimatedPrepTime
      })
    }
  }

  const handleIngredientToggle = (index) => {
    const newChecked = new Set(checkedIngredients)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedIngredients(newChecked)
  }

  const handleAddToMealPlan = () => {
    if (selectedDate && selectedMealType) {
      addMealToPlan(selectedDate, selectedMealType, {
        ...recipe,
        ingredients,
        estimatedCalories,
        estimatedPrepTime
      })
      setShowMealPlanModal(false)
      setSelectedDate('')
      setSelectedMealType('')
    }
  }

  // Get today's date for the date input minimum
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="page-container">
      {/* Back Button */}
      <div className="mb-4 sm:mb-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Back to recipes</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        {/* Recipe Image */}
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
          />
          
          {/* Category Badge */}
          {recipe.strCategory && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <span className="bg-primary-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {recipe.strCategory}
              </span>
            </div>
          )}

          {/* Dietary Preference Badge */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <span className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
              isVegetarian 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
            }`}>
              {isVegetarian ? <Leaf size={12} className="sm:w-4 sm:h-4" /> : <Utensils size={12} className="sm:w-4 sm:h-4" />}
              <span>{isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</span>
            </span>
          </div>
        </div>

        {/* Recipe Info */}
        <div>
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white pr-4">
              {recipe.strMeal}
            </h1>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 ${
                  isRecipeFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                <Heart size={18} className={`sm:w-5 sm:h-5 ${isRecipeFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={() => setShowMealPlanModal(true)}
                className="p-2 sm:p-3 rounded-full bg-secondary-500 text-white hover:bg-secondary-600 transition-all duration-200 hover:scale-110"
                title="Add to meal plan"
              >
                <Calendar size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Recipe Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200">
              <Clock className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Prep Time</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {formatCookingTime(estimatedPrepTime)}
              </p>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200">
              <Users className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Servings</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">4</p>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200">
              <Utensils className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Calories</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {estimatedCalories}
              </p>
            </div>
            
            <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200">
              <ChefHat className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Cuisine</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {recipe.strArea || 'International'}
              </p>
            </div>
          </div>

          {/* Video Link */}
          {recipe.strYoutube && (
            <div className="mb-4 sm:mb-6">
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm3.5 10l-5 3V7l5 3z"/>
                </svg>
                <span>Watch Video</span>
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Ingredients */}
        <div className="card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <ChefHat className="mr-2" size={20} className="sm:w-6 sm:h-6" />
            Ingredients
          </h2>
          <ul className="space-y-2 sm:space-y-3">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center space-x-3">
                <button
                  onClick={() => handleIngredientToggle(index)}
                  className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    checkedIngredients.has(index)
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                  }`}
                >
                  {checkedIngredients.has(index) && (
                    <CheckCircle size={12} className="sm:w-4 sm:h-4 fill-current" />
                  )}
                </button>
                <span className={`text-sm sm:text-base ${
                  checkedIngredients.has(index) 
                    ? 'line-through text-gray-500 dark:text-gray-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  <span className="font-medium">{ingredient.measure}</span>{' '}
                  <span>{ingredient.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Instructions
          </h2>
          <ol className="space-y-3 sm:space-y-4">
            {instructions.map((instruction, index) => (
              <li key={index} className="flex space-x-3 sm:space-x-4">
                <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                  {index + 1}
                </span>
                <p className="text-gray-900 dark:text-white pt-1 text-sm sm:text-base">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Meal Plan Modal */}
      {showMealPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
              Add to Meal Plan
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  className="input-field text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meal Type
                </label>
                <select
                  value={selectedMealType}
                  onChange={(e) => setSelectedMealType(e.target.value)}
                  className="input-field text-sm sm:text-base"
                >
                  <option value="">Select meal type</option>
                  <option value={MEAL_TYPES.BREAKFAST}>Breakfast</option>
                  <option value={MEAL_TYPES.LUNCH}>Lunch</option>
                  <option value={MEAL_TYPES.DINNER}>Dinner</option>
                  <option value={MEAL_TYPES.SNACK}>Snack</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                onClick={() => setShowMealPlanModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToMealPlan}
                disabled={!selectedDate || !selectedMealType}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base hover:scale-105 transition-transform duration-200"
              >
                Add to Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeDetail