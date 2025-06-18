import { useState } from 'react'
import { format, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns'
import { ChevronLeft, ChevronRight, Plus, X, Calendar, Download } from 'lucide-react'
import { useMealPlan } from '../context/MealPlanContext'
import { useFavorites } from '../context/FavoritesContext'
import { MEAL_TYPES, DAYS_OF_WEEK } from '../utils/constants'
import { formatDayDate } from '../utils/helpers'

const MealPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [showAddMealModal, setShowAddMealModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState({ date: null, mealType: null })
  
  const { getWeekMealPlan, addMealToPlan, removeMealFromPlan } = useMealPlan()
  const { favorites } = useFavorites()
  
  const weekPlan = getWeekMealPlan(currentWeek)
  
  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1))
  }
  
  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1))
  }
  
  const goToCurrentWeek = () => {
    setCurrentWeek(startOfWeek(new Date(), { weekStartsOn: 1 }))
  }

  const handleAddMeal = (date, mealType) => {
    setSelectedSlot({ date, mealType })
    setShowAddMealModal(true)
  }

  const handleSelectRecipe = (recipe) => {
    if (selectedSlot.date && selectedSlot.mealType) {
      addMealToPlan(selectedSlot.date, selectedSlot.mealType, recipe)
      setShowAddMealModal(false)
      setSelectedSlot({ date: null, mealType: null })
    }
  }

  const handleRemoveMeal = (date, mealType) => {
    if (window.confirm('Are you sure you want to remove this meal?')) {
      removeMealFromPlan(date, mealType)
    }
  }

  const exportMealPlan = () => {
    // Simple text export - in a real app, you'd use a PDF library
    let exportText = `PlannEat Meal Plan for Week of ${format(currentWeek, 'MMM dd, yyyy')}\n\n`
    
    weekPlan.forEach(day => {
      exportText += `${format(day.date, 'EEEE, MMM dd')}\n`
      exportText += '─'.repeat(30) + '\n'
      
      Object.entries(MEAL_TYPES).forEach(([key, mealType]) => {
        const meal = day.meals[mealType]
        exportText += `${key}: ${meal ? meal.strMeal : 'Not planned'}\n`
      })
      exportText += '\n'
    })
    
    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `planneat-meal-plan-${format(currentWeek, 'yyyy-MM-dd')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Meal Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Plan your meals for the week ahead
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button
            onClick={exportMealPlan}
            className="flex items-center justify-center space-x-2 btn-secondary text-sm sm:text-base px-4 py-2 hover:scale-105 transition-transform duration-200"
          >
            <Download size={16} />
            <span>Export Plan</span>
          </button>
          
          <button
            onClick={goToCurrentWeek}
            className="btn-primary text-sm sm:text-base px-4 py-2 hover:scale-105 transition-transform duration-200"
          >
            This Week
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <button
          onClick={goToPreviousWeek}
          className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white text-center">
          <span className="hidden sm:inline">Week of </span>
          {format(currentWeek, 'MMM dd, yyyy')}
        </h2>
        
        <button
          onClick={goToNextWeek}
          className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Meal Plan Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4">
        {weekPlan.map((day, dayIndex) => (
          <div key={day.dateKey} className="space-y-3 sm:space-y-4">
            {/* Day Header */}
            <div className="text-center bg-primary-50 dark:bg-primary-900/20 rounded-lg p-2 sm:p-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {DAYS_OF_WEEK[dayIndex]}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {format(day.date, 'MMM dd')}
              </p>
            </div>

            {/* Meal Slots */}
            <div className="space-y-2 sm:space-y-3">
              {Object.entries(MEAL_TYPES).map(([key, mealType]) => {
                const meal = day.meals[mealType]
                
                return (
                  <div
                    key={mealType}
                    className="card p-2 sm:p-3 min-h-[80px] sm:min-h-[100px] flex flex-col hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {key.toLowerCase()}
                      </h4>
                      
                      {meal && (
                        <button
                          onClick={() => handleRemoveMeal(day.date, mealType)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 hover:scale-110"
                        >
                          <X size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>
                    
                    {meal ? (
                      <div className="flex-1">
                        <img
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          className="w-full h-12 sm:h-16 object-cover rounded mb-2"
                        />
                        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                          {meal.strMeal}
                        </p>
                        {meal.estimatedCalories && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {meal.estimatedCalories} cal
                          </p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddMeal(day.date, mealType)}
                        className="flex-1 flex items-center justify-center text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:scale-105"
                      >
                        <div className="text-center">
                          <Plus size={16} className="sm:w-5 sm:h-5 mx-auto mb-1" />
                          <span className="text-xs">Add Meal</span>
                        </div>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add Meal Modal */}
      {showAddMealModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                Add Meal for {selectedSlot.date && formatDayDate(selectedSlot.date)} - {selectedSlot.mealType}
              </h3>
              <button
                onClick={() => setShowAddMealModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:scale-110 transition-all duration-200"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {favorites.length > 0 ? (
              <div className="overflow-y-auto max-h-[60vh]">
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                  Choose from your favorite recipes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {favorites.map((recipe) => (
                    <button
                      key={recipe.idMeal}
                      onClick={() => handleSelectRecipe(recipe)}
                      className="text-left p-3 sm:p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-24 sm:h-32 object-cover rounded mb-2"
                      />
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2 text-sm sm:text-base">
                        {recipe.strMeal}
                      </h4>
                      <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <span>{recipe.estimatedPrepTime || 30} min</span>
                        <span>{recipe.estimatedCalories || 400} cal</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <Calendar className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                  You don't have any favorite recipes yet.
                </p>
                <a
                  href="/"
                  className="btn-primary hover:scale-105 transition-transform duration-200"
                  onClick={() => setShowAddMealModal(false)}
                >
                  Discover Recipes
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MealPlanner