import { Link } from 'react-router-dom'
import { Heart, Clock, Users, Leaf, Utensils } from 'lucide-react'
import { useFavorites } from '../../context/FavoritesContext'
import { truncateText, estimatePrepTime } from '../../utils/helpers'
import { getIngredientsList, estimateCalories } from '../../services/api'
import { isVegetarianRecipe } from '../../utils/helpers'

const RecipeCard = ({ recipe }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const isRecipeFavorite = isFavorite(recipe.idMeal)
  const ingredients = getIngredientsList(recipe)
  const estimatedCalories = estimateCalories(recipe)
  const estimatedPrepTime = estimatePrepTime(ingredients.length)
  const isVegetarian = isVegetarianRecipe(recipe)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
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

  return (
    <div className="card recipe-card overflow-hidden group">
      <Link to={`/recipe/${recipe.idMeal}`} className="block">
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Favorite Button */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                isRecipeFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart 
                size={16} 
                className={`sm:w-5 sm:h-5 ${isRecipeFavorite ? 'fill-current' : ''}`} 
              />
            </button>
          </div>
          
          {/* Category Badge */}
          {recipe.strCategory && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
              <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {recipe.strCategory}
              </span>
            </div>
          )}

          {/* Dietary Preference Badge */}
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
            <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              isVegetarian 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
            }`}>
              {isVegetarian ? <Leaf size={12} /> : <Utensils size={12} />}
              <span>{isVegetarian ? 'Veg' : 'Non-Veg'}</span>
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {recipe.strMeal}
          </h3>
          
          {recipe.strInstructions && (
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
              {truncateText(recipe.strInstructions, 80)}
            </p>
          )}

          {/* Recipe Stats */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock size={14} className="sm:w-4 sm:h-4" />
              <span>{estimatedPrepTime} min</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Users size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">4 servings</span>
              <span className="xs:hidden">4</span>
            </div>
            
            <div className="text-primary-600 dark:text-primary-400 font-medium">
              {estimatedCalories} cal
            </div>
          </div>

          {/* Cuisine Area */}
          {recipe.strArea && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {recipe.strArea} Cuisine
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default RecipeCard