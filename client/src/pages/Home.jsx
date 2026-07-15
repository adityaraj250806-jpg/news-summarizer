import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CategoryTabs from '../components/CategoryTabs'
import ArticleGrid from '../components/ArticleGrid'
import Spinner from '../components/Spinner'
import { getTopHeadlines, searchNews } from '../services/newsApi'
import { getCache, setCache } from '../utils/cache'
import { cacheKey } from '../utils/formatDate'
import './Home.css'

function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('general')
  const [searchQuery, setSearchQuery] = useState(null)

  const location = useLocation()

  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  useEffect(() => {
    if (searchQuery) {
      fetchSearch(searchQuery)
    } else {
      fetchByCategory(activeCategory)
    }
  }, [activeCategory, searchQuery])

  const fetchByCategory = async (category) => {
    const key = cacheKey('category', category)
    const cached = getCache(key)

    if (cached) {
      setArticles(cached)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await getTopHeadlines(category)
      const filtered = data.filter((a) => a.title !== '[Removed]')
      setArticles(filtered)
      setCache(key, filtered)
    } catch (err) {
      setError('Failed to load articles. Please check your API key or try again.')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const fetchSearch = async (query) => {
    setLoading(true)
    setError(null)

    try {
      const data = await searchNews(query)
      const filtered = data.filter((a) => a.title !== '[Removed]')
      setArticles(filtered)
    } catch (err) {
      setError('Search failed. Please try again.')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setSearchQuery(null)
  }

  const handleClearSearch = () => {
    setSearchQuery(null)
  }

  return (
    <div>
      <div className="home-header">
        <h1 className="home-header__title">Today's News</h1>
        <p className="home-header__subtitle">
          Stay informed with the latest headlines from around the world.
        </p>
      </div>

      {!searchQuery && (
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {searchQuery && (
        <div className="search-banner">
          <span>
            Showing results for: <strong>"{searchQuery}"</strong>
          </span>
          <button
            className="search-banner__clear"
            onClick={handleClearSearch}
            id="clear-search-btn"
          >
            Clear
          </button>
        </div>
      )}

      {error && (
        <div className="error-box" role="alert">
          Error: {error}
        </div>
      )}

      {loading ? <Spinner /> : <ArticleGrid articles={articles} />}
    </div>
  )
}

export default Home
