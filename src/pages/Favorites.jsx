import { Heart, Trash2, Calendar, Leaf, Utensils } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import RecipeCard from '../components/recipe/RecipeCard'
import { isVegetarianRecipe } from '../utils/helpers'

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites()

  const handleRemoveFromFavorites = (recipeId) => {
    if (window.confirm('Are you sure you want to remove this recipe from your favorites?')) {
      removeFavorite(recipeId)
    }
  }

  // Calculate stats
  const vegetarianCount = favorites.filter(recipe => isVegetarianRecipe(recipe)).length
  const nonVegetarianCount = favorites.length - vegetarianCount

  if (favorites.length === 0) {
    return (
      <div className="page-container">
        <div className="text-center py-12 sm:py-16 px-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 sm:p-8 w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 flex items-center justify-center">
            <Heart size={48} className="sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            No Favorite Recipes Yet
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto">
            Start exploring recipes and click the heart icon to save your favorites here!
          </p>
          <a
            href="/"
            className="btn-primary inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
          >
            <span>Discover Recipes</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Favorite Recipes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {favorites.length} recipe{favorites.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all favorites? This action cannot be undone.')) {
                favorites.forEach(recipe => removeFavorite(recipe.idMeal))
              }
            }}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 text-sm sm:text-base hover:scale-105"
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="card p-4 sm:p-6 text-center hover:shadow-lg transition-shadow duration-200">
          <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {favorites.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Total Favorites
          </div>
        </div>
        
        <div className="card p-4 sm:p-6 text-center hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="text-green-600 dark:text-green-400 mr-2" size={20} />
            <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
              {vegetarianCount}
            </div>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Vegetarian
          </div>
        </div>

        <div className="card p-4 sm:p-6 text-center hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-center mb-2">
            <Utensils className="text-orange-600 dark:text-orange-400 mr-2" size={20} />
            <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
              {nonVegetarianCount}
            </div>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Non-Vegetarian
          </div>
        </div>
        
        <div className="card p-4 sm:p-6 text-center hover:shadow-lg transition-shadow duration-200">
          <div className="text-xl sm:text-2xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
            {Math.round(favorites.reduce((acc, recipe) => acc + (recipe.estimatedCalories || 0), 0) / favorites.length) || 0}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Avg Calories
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="relative group">
            <RecipeCard recipe={recipe} />
            
            {/* Quick Actions Overlay */}
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRemoveFromFavorites(recipe.idMeal)
                  }}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-110 shadow-lg"
                  title="Remove from favorites"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    // Add to meal plan functionality could be added here
                  }}
                  className="p-2 bg-secondary-500 text-white rounded-full hover:bg-secondary-600 transition-all duration-200 hover:scale-110 shadow-lg"
                  title="Add to meal plan"
                >
                  <Calendar size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites