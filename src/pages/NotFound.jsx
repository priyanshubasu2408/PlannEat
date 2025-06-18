import { Link } from 'react-router-dom'
import { Home, Search, ChefHat } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="page-container">
      <div className="text-center py-12 sm:py-16 px-4">
        <div className="max-w-md mx-auto">
          {/* Animated Chef Hat */}
          <div className="relative mb-6 sm:mb-8">
            <ChefHat 
              size={100} 
              className="sm:w-32 sm:h-32 mx-auto text-gray-300 dark:text-gray-600 animate-pulse" 
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
            Recipe Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
            Looks like this recipe has gone missing from our kitchen! 
            Don't worry, we have plenty more delicious recipes waiting for you.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200"
            >
              <Home size={18} className="sm:w-5 sm:h-5" />
              <span>Back to Home</span>
            </Link>
            
            <Link
              to="/"
              className="btn-secondary inline-flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200"
            >
              <Search size={18} className="sm:w-5 sm:h-5" />
              <span>Search Recipes</span>
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              While you're here, why not try:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Link
                to="/favorites"
                className="p-3 sm:p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                  Your Favorites
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Check out your saved recipes
                </p>
              </Link>
              
              <Link
                to="/meal-planner"
                className="p-3 sm:p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                  Meal Planner
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Plan your weekly meals
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound