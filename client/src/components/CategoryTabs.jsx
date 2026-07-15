import React from 'react'
import './CategoryTabs.css'

const CATEGORIES = [
  { id: 'general', label: 'Top Stories' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'health', label: 'Health' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'science', label: 'Science' },
]

function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-tabs" role="tablist" aria-label="News categories">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          id={`tab-${cat.id}`}
          role="tab"
          aria-selected={activeCategory === cat.id}
          className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
