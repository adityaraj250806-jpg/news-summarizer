import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import './ArticleCard.css'

function ArticleCard({ article }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/article', { state: { article } })
  }

  return (
    <article
      className="article-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${article.title}`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {article.urlToImage ? (
        <img
          className="article-card__image"
          src={article.urlToImage}
          alt={article.title}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
      ) : null}
      <div
        className="article-card__image-placeholder"
        style={{ display: article.urlToImage ? 'none' : 'flex' }}
      >
        <div className="article-card__placeholder">
          <span className="article-card__placeholder-icon">News</span>
        </div>
      </div>

      <div className="article-card__body">
        <span className="article-card__source">
          {article.source?.name || 'Unknown Source'}
        </span>

        <h2 className="article-card__title">{article.title}</h2>

        <time className="article-card__date" dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </div>
    </article>
  )
}

export default ArticleCard
