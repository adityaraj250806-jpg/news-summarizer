import React from 'react'
import ArticleCard from './ArticleCard'
import NoArticles from './NoArticles'
import './ArticleGrid.css'

// ArticleGrid renders all article cards in a responsive grid
// or shows the NoArticles fallback if the list is empty
function ArticleGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return <NoArticles />
  }

  return (
    <div className="article-grid">
      {articles.map((article, index) => (
        // Using URL as key since NewsAPI doesn't guarantee unique IDs
        <ArticleCard key={article.url || index} article={article} />
      ))}
    </div>
  )
}

export default ArticleGrid
