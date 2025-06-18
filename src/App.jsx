import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { MealPlanProvider } from './context/MealPlanContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import Favorites from './pages/Favorites'
import MealPlanner from './pages/MealPlanner'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <MealPlanProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark-mode-transition">
              <Header />
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/meal-planner" element={<MealPlanner />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </MealPlanProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App