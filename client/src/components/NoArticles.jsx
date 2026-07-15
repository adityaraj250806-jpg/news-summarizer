import React from 'react'
import './NoArticles.css'

function NoArticles({ message }) {
  return (
    <div className="no-articles" role="status" aria-live="polite">
      <div className="no-articles__icon">?</div>
      <h3 className="no-articles__title">No articles found</h3>
      <p className="no-articles__message">
        {message || 'Try a different search term or category.'}
      </p>
    </div>
  )
}

export default NoArticles
