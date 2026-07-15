import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSummaries } from '../context/SummariesContext'
import { formatDate } from '../utils/formatDate'
import './MySummaries.css'

function MySummaries() {
  const { summaries, removeSummary } = useSummaries()
  const navigate = useNavigate()

  return (
    <div>
      <div className="my-summaries__header">
        <h1 className="my-summaries__title">My Summaries</h1>
        <p className="my-summaries__subtitle">
          Articles you've summarized this session ({summaries.length} saved)
        </p>
      </div>

      {summaries.length === 0 ? (
        <div className="my-summaries__empty">
          <div className="my-summaries__empty-icon">News</div>
          <h2 className="my-summaries__empty-title">No summaries yet</h2>
          <p className="my-summaries__empty-message">
            Open any article and click "Summarise" to generate an AI summary. It
            will appear here automatically.
          </p>
          <button
            id="go-home-from-summaries-btn"
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Browse News
          </button>
        </div>
      ) : (
        <div className="summaries-list">
          {summaries.map((item) => (
            <div key={item.id} className="summary-item">
              <div className="summary-item__header">
                <div className="summary-item__info">
                  <p className="summary-item__source">
                    {item.article.source?.name || 'Unknown Source'}
                  </p>
                  <h2 className="summary-item__title">{item.article.title}</h2>
                </div>
                <span className="summary-item__saved-at">
                  {formatDate(item.savedAt)}
                </span>
              </div>

              <div className="summary-item__summary">{item.summaryText}</div>

              <div className="summary-item__actions">
                <a
                  href={item.article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Read Article
                </a>
                <button
                  id={`view-article-btn-${item.id}`}
                  className="btn btn-secondary"
                  onClick={() =>
                    navigate('/article', { state: { article: item.article } })
                  }
                >
                  View Detail
                </button>
                <button
                  id={`remove-summary-btn-${item.id}`}
                  className="btn btn-secondary"
                  onClick={() => removeSummary(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MySummaries
