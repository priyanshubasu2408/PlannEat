import { useState, useEffect } from 'react'
import { Search, Mic, X } from 'lucide-react'
import { useVoiceSearch } from '../../hooks/useVoiceSearch'

const SearchBar = ({ onSearch, onClear, placeholder = "Search recipes..." }) => {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState('name')
  const { 
    isListening, 
    transcript, 
    isSupported, 
    startListening, 
    clearTranscript 
  } = useVoiceSearch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), searchType)
    }
  }

  const handleClear = () => {
    setQuery('')
    clearTranscript()
    onClear()
  }

  const handleVoiceSearch = () => {
    startListening()
  }

  // Use voice transcript when available
  useEffect(() => {
    if (transcript) {
      setQuery(transcript)
      onSearch(transcript, searchType)
    }
  }, [transcript, searchType, onSearch])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          {/* Search Type Selector */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="input-field sm:w-auto min-w-[140px] text-sm sm:text-base order-2 sm:order-1"
          >
            <option value="name">By Name</option>
            <option value="ingredient">By Ingredient</option>
          </select>

          {/* Search Input */}
          <div className="relative flex-1 order-1 sm:order-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="input-field pl-10 sm:pl-12 pr-16 sm:pr-20 text-sm sm:text-base"
            />
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1">
              {/* Voice Search Button */}
              {isSupported && (
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  disabled={isListening}
                  className={`p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                    isListening
                      ? 'text-red-500 animate-pulse'
                      : 'text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  title="Voice search"
                >
                  <Mic size={14} className="sm:w-4 sm:h-4" />
                </button>
              )}
              
              {/* Clear Button */}
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                  title="Clear search"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim()}
            className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 order-3 hover:scale-105 transition-transform duration-200"
          >
            <span className="hidden sm:inline">Search</span>
            <Search size={16} className="sm:hidden" />
          </button>
        </div>
      </form>

      {/* Voice Search Status */}
      {isListening && (
        <div className="mt-3 text-center animate-fade-in">
          <p className="text-sm text-primary-600 dark:text-primary-400 animate-pulse">
            🎤 Listening... Speak now
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchBar