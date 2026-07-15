import React, { createContext, useContext, useState, useEffect } from 'react'

const SummariesContext = createContext(null)

const STORAGE_KEY = 'saved_summaries'

export function SummariesProvider({ children }) {
  const [summaries, setSummaries] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(summaries))
    } catch {
      console.warn('Could not save summaries to sessionStorage')
    }
  }, [summaries])

  const addSummary = (article, summaryText) => {
    const newItem = {
      id: article.url,
      article,
      summaryText,
      savedAt: new Date().toISOString(),
    }
    setSummaries((prev) => {
      const filtered = prev.filter((s) => s.id !== newItem.id)
      return [newItem, ...filtered]
    })
  }

  const removeSummary = (articleUrl) => {
    setSummaries((prev) => prev.filter((s) => s.id !== articleUrl))
  }

  const isSaved = (articleUrl) => {
    return summaries.some((s) => s.id === articleUrl)
  }

  return (
    <SummariesContext.Provider value={{ summaries, addSummary, removeSummary, isSaved }}>
      {children}
    </SummariesContext.Provider>
  )
}

export function useSummaries() {
  const context = useContext(SummariesContext)
  if (!context) {
    throw new Error('useSummaries must be used inside a SummariesProvider')
  }
  return context
}
