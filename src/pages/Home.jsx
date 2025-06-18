import { useState, useEffect } from 'react'
import { Shuffle, TrendingUp, Sparkles, Leaf, Utensils } from 'lucide-react'
import { useRecipes } from '../hooks/useRecipes'
import SearchBar from '../components/recipe/SearchBar'
import RecipeFilters from '../components/recipe/RecipeFilters'
import RecipeList from '../components/recipe/RecipeList'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { debounce } from '../utils/helpers'

const Home = () => {
  const { recipes, loading, error, searchRecipes, getRandomRecipe, filterRecipes, clearRecipes } = useRecipes()
  const [hasSearched, setHasSearched] = useState(false)
  const [activeFilters, setActiveFilters] = useState({})

  // Debounced search function
  const debouncedSearch = debounce((query, searchType) => {
    searchRecipes(query, searchType)
    setHasSearched(true)
  }, 300)

  const handleSearch = (query, searchType) => {
    debouncedSearch(query, searchType)
  }

  const handleClearSearch = () => {
    clearRecipes()
    setHasSearched(false)
  }

  const handleFilterChange = (filters) => {
    setActiveFilters(filters)
    
    // Apply filters if any are active
    const hasActiveFilters = Object.values(filters).some(value => value !== '')
    if (hasActiveFilters) {
      filterRecipes(filters)
      setHasSearched(true)
    } else if (hasSearched) {
      clearRecipes()
      setHasSearched(false)
    }
  }

  const handleClearFilters = () => {
    setActiveFilters({})
    if (hasSearched) {
      clearRecipes()
      setHasSearched(false)
    }
  }

  const handleSurpriseMe = () => {
    getRandomRecipe()
    setHasSearched(true)
  }

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="text-center mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Discover Amazing{' '}
            <span className="text-primary-600 dark:text-primary-400 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Recipes
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Find the perfect recipe for any occasion. Search by ingredients, cuisine, or dietary preferences.
          </p>
          
          {/* Search Section */}
          <div className="mb-6 sm:mb-8">
            <SearchBar 
              onSearch={handleSearch}
              onClear={handleClearSearch}
              placeholder="Search for recipes or ingredients..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
            <button
              onClick={handleSurpriseMe}
              className="flex items-center space-x-2 btn-primary hover:scale-105 transition-transform duration-200 w-full sm:w-auto justify-center"
            >
              <Shuffle size={16} />
              <span>Surprise Me!</span>
            </button>
            
            <RecipeFilters 
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      {!hasSearched && (
        <section className="mb-8 sm:mb-12">
          <h2 className="section-title text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: 'Breakfast', image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', color: 'bg-yellow-500' },
              { name: 'Chicken', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6', color: 'bg-orange-500' },
              { name: 'Dessert', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e', color: 'bg-pink-500' },
              { name: 'Vegetarian', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', color: 'bg-green-500' }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => handleFilterChange({ category: category.name, area: '', diet: '', calorieRange: '', dietaryPreference: '' })}
                className="group relative overflow-hidden rounded-lg aspect-square hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base lg:text-lg text-center px-2">
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Dietary Preference Quick Filters */}
      {!hasSearched && (
        <section className="mb-8 sm:mb-12">
          <h2 className="section-title text-center">Dietary Preferences</h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <button
              onClick={() => handleFilterChange({ category: '', area: '', diet: '', calorieRange: '', dietaryPreference: 'vegetarian' })}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <Leaf size={20} />
              <span className="font-medium">Vegetarian Recipes</span>
            </button>
            
            <button
              onClick={() => handleFilterChange({ category: '', area: '', diet: '', calorieRange: '', dietaryPreference: 'non-vegetarian' })}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <Utensils size={20} />
              <span className="font-medium">Non-Vegetarian</span>
            </button>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section>
        {loading && <LoadingSpinner size="lg" text="Finding delicious recipes..." />}
        
        {hasSearched && !loading && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {recipes.length > 0 ? `Found ${recipes.length} recipes` : 'No recipes found'}
              </h2>
              {recipes.length > 0 && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUp size={16} className="mr-1" />
                  <span>Sorted by relevance</span>
                </div>
              )}
            </div>
          </div>
        )}

        <RecipeList recipes={recipes} loading={loading} error={error} />
      </section>

      {/* Welcome Message for New Users */}
      {!hasSearched && !loading && (
        <section className="text-center py-12 sm:py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <Sparkles className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary-600 dark:text-primary-400 mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Ready to Cook Something Amazing?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Start by searching for recipes, exploring categories, or get inspired with our "Surprise Me" feature!
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Pasta', 'Chicken', 'Vegetarian', 'Dessert', 'Quick Meals'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion, 'name')}
                  className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900 dark:hover:text-primary-300 transition-all duration-200 text-sm hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home