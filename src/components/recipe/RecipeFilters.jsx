import { useState } from 'react'
import { ChevronDown, Filter, X, Leaf, Utensils } from 'lucide-react'
import { RECIPE_CATEGORIES, CUISINE_AREAS, DIET_TYPES, CALORIE_RANGES } from '../../utils/constants'

const RecipeFilters = ({ onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    area: '',
    diet: '',
    calorieRange: '',
    dietaryPreference: '' // New filter for vegetarian/non-vegetarian
  })

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      area: '',
      diet: '',
      calorieRange: '',
      dietaryPreference: ''
    }
    setFilters(clearedFilters)
    onClearFilters()
    setIsOpen(false)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 text-sm sm:text-base hover:scale-105 ${
          hasActiveFilters
            ? 'bg-primary-50 border-primary-300 text-primary-700 dark:bg-primary-900/20 dark:border-primary-700 dark:text-primary-300 shadow-md'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        <Filter size={16} />
        <span className="hidden xs:inline">Filters</span>
        {hasActiveFilters && (
          <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-0.5 animate-pulse">
            {Object.values(filters).filter(value => value !== '').length}
          </span>
        )}
        <ChevronDown 
          size={16} 
          className={`transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 p-4 sm:p-6 min-w-[280px] sm:min-w-[320px] animate-slide-down">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Dietary Preference Filter - New */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Leaf size={16} />
                  <span>Dietary Preference</span>
                </div>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleFilterChange('dietaryPreference', filters.dietaryPreference === 'vegetarian' ? '' : 'vegetarian')}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                    filters.dietaryPreference === 'vegetarian'
                      ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-400 dark:text-green-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'
                  }`}
                >
                  <Leaf size={14} />
                  <span>Vegetarian</span>
                </button>
                <button
                  onClick={() => handleFilterChange('dietaryPreference', filters.dietaryPreference === 'non-vegetarian' ? '' : 'non-vegetarian')}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                    filters.dietaryPreference === 'non-vegetarian'
                      ? 'bg-orange-100 border-orange-500 text-orange-700 dark:bg-orange-900/20 dark:border-orange-400 dark:text-orange-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500'
                  }`}
                >
                  <Utensils size={14} />
                  <span>Non-Veg</span>
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full input-field text-sm"
              >
                <option value="">All Categories</option>
                {RECIPE_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cuisine
              </label>
              <select
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
                className="w-full input-field text-sm"
              >
                <option value="">All Cuisines</option>
                {CUISINE_AREAS.map(area => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Diet Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Diet Type
              </label>
              <select
                value={filters.diet}
                onChange={(e) => handleFilterChange('diet', e.target.value)}
                className="w-full input-field text-sm"
              >
                <option value="">All Diets</option>
                {DIET_TYPES.map(diet => (
                  <option key={diet} value={diet}>
                    {diet}
                  </option>
                ))}
              </select>
            </div>

            {/* Calorie Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Calories
              </label>
              <select
                value={filters.calorieRange}
                onChange={(e) => handleFilterChange('calorieRange', e.target.value)}
                className="w-full input-field text-sm"
              >
                <option value="">Any Range</option>
                {CALORIE_RANGES.map(range => (
                  <option key={range.label} value={`${range.min}-${range.max}`}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
            <button
              onClick={handleClearFilters}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 text-sm"
            >
              <X size={16} />
              <span>Clear All</span>
            </button>
            
            <button
              onClick={() => setIsOpen(false)}
              className="btn-primary text-sm px-4 py-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeFilters