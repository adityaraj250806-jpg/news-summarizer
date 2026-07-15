import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { summarizeArticle } from '../services/geminiApi'
import { useSummaries } from '../context/SummariesContext'
import { formatDate } from '../utils/formatDate'
import Spinner from '../components/Spinner'
import { API_URL } from '../config'
import './ArticleDetail.css'

function ArticleDetail() {
  const location = useLocation()
  const navigate = useNavigate()

  const article = location.state?.article

  const [summary, setSummary] = useState(null)
  const [summarizing, setSummarizing] = useState(false)
  const [summaryError, setSummaryError] = useState(null)
  
  const [fullText, setFullText] = useState(null)
  const [loadingText, setLoadingText] = useState(false)
  const [textError, setTextError] = useState(null)

  const { addSummary, isSaved } = useSummaries()

  if (!article) {
    return (
      <div className="article-detail">
        <p>No article selected. <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button></p>
      </div>
    )
  }

  useEffect(() => {
    if (!article?.url) return

    const fetchFullText = async () => {
      setLoadingText(true)
      try {
        const res = await fetch(`${API_URL}/api/scrape?url=${encodeURIComponent(article.url)}`)
        if (!res.ok) throw new Error('Scraping failed')
        const data = await res.json()
        setFullText(data.content)
      } catch (err) {
        console.error(err)
        setTextError('Could not load full article text. Falling back to snippet.')
      } finally {
        setLoadingText(false)
      }
    }

    fetchFullText()
  }, [article?.url])

  const articleTextForSummary = fullText || [
    article.title,
    article.description,
    article.content,
  ]
    .filter(Boolean)
    .join('\n\n')

  const handleSummarize = async () => {
    if (!articleTextForSummary) {
      setSummaryError('Not enough article content to summarize.')
      return
    }

    setSummarizing(true)
    setSummaryError(null)
    setSummary(null)

    try {
      const result = await summarizeArticle(articleTextForSummary)
      setSummary(result)
      addSummary(article, result)
    } catch (err) {
      console.error(err)
      setSummaryError(`Summarization failed: ${err.message}`)
    } finally {
      setSummarizing(false)
    }
  }

  const alreadySaved = isSaved(article.url)

  return (
    <article className="article-detail">
      <button
        id="back-btn"
        className="article-detail__back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back to article list"
      >
        Back
      </button>

      {article.urlToImage && (
        <img
          className="article-detail__image"
          src={article.urlToImage}
          alt={article.title}
        />
      )}

      <div className="article-detail__meta">
        <span className="article-detail__source">
          {article.source?.name || 'Unknown Source'}
        </span>
        {article.author && (
          <span className="article-detail__author">by {article.author}</span>
        )}
        <time className="article-detail__date" dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </div>

      <h1 className="article-detail__title">{article.title}</h1>

      <div className="article-detail__actions" style={{ marginBottom: '1.5rem' }}>
        <button
          id="summarize-btn"
          className="btn btn-primary"
          onClick={handleSummarize}
          disabled={summarizing}
        >
          {summarizing ? 'Summarizing...' : '✨ Summarise'}
        </button>

        <a
          id="read-full-article-btn"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          Read Source
        </a>
      </div>

      <div className="summarizer" style={{ marginBottom: '2rem' }}>
        <h2 className="summarizer__title">AI Summary</h2>

        {summarizing && <Spinner />}

        {summaryError && (
          <div className="summarizer__error" role="alert">
            Error: {summaryError}
          </div>
        )}

        {summary && (
          <div className="summary-card">
            <p className="summary-card__heading">Gemini Summary</p>
            <div className="summary-card__content">{summary}</div>
          </div>
        )}

        {!summarizing && !summary && !summaryError && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            Click "Summarise" above to generate a 3-bullet AI summary of this article.
          </p>
        )}
      </div>

      {article.description && (
        <p className="article-detail__description">{article.description}</p>
      )}

      <div className="article-detail__content">
        {loadingText && (
          <div style={{ padding: '20px 0', textAlign: 'center' }}>
            <Spinner />
            <p style={{ marginTop: '10px', color: 'var(--color-text-secondary)' }}>Extracting full article text...</p>
          </div>
        )}
        
        {textError && !fullText && article.content && (
          article.content.replace(/\[\+\d+ chars\]$/, '').split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        )}

        {fullText && (
          fullText.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        )}
      </div>



      {alreadySaved && !summary && (
        <p className="saved-badge">Summary already saved in My Summaries</p>
      )}

    </article>
  )
}

export default ArticleDetail
