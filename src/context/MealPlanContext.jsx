import { createContext, useContext, useState, useEffect } from 'react'
import { format, startOfWeek, addDays } from 'date-fns'

const MealPlanContext = createContext()

export const useMealPlan = () => {
  const context = useContext(MealPlanContext)
  if (!context) {
    throw new Error('useMealPlan must be used within a MealPlanProvider')
  }
  return context
}

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem('mealPlan')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan))
  }, [mealPlan])

  const addMealToPlan = (date, mealType, recipe) => {
    const dateKey = format(new Date(date), 'yyyy-MM-dd')
    setMealPlan(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: recipe
      }
    }))
  }

  const removeMealFromPlan = (date, mealType) => {
    const dateKey = format(new Date(date), 'yyyy-MM-dd')
    setMealPlan(prev => {
      const dayPlan = { ...prev[dateKey] }
      delete dayPlan[mealType]
      
      if (Object.keys(dayPlan).length === 0) {
        const newPlan = { ...prev }
        delete newPlan[dateKey]
        return newPlan
      }
      
      return {
        ...prev,
        [dateKey]: dayPlan
      }
    })
  }

  const getMealForDay = (date, mealType) => {
    const dateKey = format(new Date(date), 'yyyy-MM-dd')
    return mealPlan[dateKey]?.[mealType]
  }

  const getWeekMealPlan = (weekStart) => {
    const weekPlan = []
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i)
      const dateKey = format(date, 'yyyy-MM-dd')
      weekPlan.push({
        date,
        dateKey,
        meals: mealPlan[dateKey] || {}
      })
    }
    return weekPlan
  }

  return (
    <MealPlanContext.Provider value={{
      mealPlan,
      addMealToPlan,
      removeMealFromPlan,
      getMealForDay,
      getWeekMealPlan
    }}>
      {children}
    </MealPlanContext.Provider>
  )
}