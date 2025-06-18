import { Link } from 'react-router-dom'
import { ChefHat, Heart, Github, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat size={32} className="text-primary-400" />
              <span className="text-2xl font-bold">PlannEat</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base">
              Discover delicious recipes, plan your meals, and create your favorite collection. 
              Made with love for food enthusiasts everywhere.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/favorites" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link 
                  to="/meal-planner" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                >
                  Meal Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="text-gray-400">Recipe Search</li>
              <li className="text-gray-400">Meal Planning</li>
              <li className="text-gray-400">Voice Search</li>
              <li className="text-gray-400">Dark Mode</li>
              <li className="text-gray-400">Favorites</li>
              <li className="text-gray-400">Diet Filters</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-2 text-sm sm:text-base">
            <span>Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>by PlannEat Team</span>
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            © 2024 PlannEat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer