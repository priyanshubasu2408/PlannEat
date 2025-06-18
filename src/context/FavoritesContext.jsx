import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (recipe) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.idMeal === recipe.idMeal)
      if (!exists) {
        return [...prev, recipe]
      }
      return prev
    })
  }

  const removeFavorite = (recipeId) => {
    setFavorites(prev => prev.filter(fav => fav.idMeal !== recipeId))
  }

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.idMeal === recipeId)
  }

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite, 
      isFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}