import { ChefHat } from 'lucide-react'

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <ChefHat 
          className={`${sizeClasses[size]} text-primary-600 animate-pulse`} 
        />
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin`}
        />
      </div>
      {text && (
        <p className={`mt-4 text-gray-600 dark:text-gray-400 ${textSizeClasses[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner