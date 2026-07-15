import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const SummariesContext = createContext(null)
const STORAGE_KEY = 'saved_summaries'

export function SummariesProvider({ children }) {
  const [summaries, setSummaries] = useState([])
  const { token } = useAuth() || {}

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/summaries', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (!Array.isArray(data)) return
          const formatted = data.map(dbItem => ({
            _id: dbItem._id,
            id: dbItem.url,
            article: {
              title: dbItem.title,
              url: dbItem.url,
              urlToImage: dbItem.urlToImage,
              source: dbItem.source,
              author: dbItem.author,
              publishedAt: dbItem.publishedAt,
              description: dbItem.description
            },
            summaryText: dbItem.summaryText,
            savedAt: dbItem.createdAt
          }))
          setSummaries(formatted)
        })
        .catch(console.error)
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        setSummaries(stored ? JSON.parse(stored) : [])
      } catch {
        setSummaries([])
      }
    }
  }, [token])

  useEffect(() => {
    if (!token) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(summaries))
      } catch {
        console.warn('Could not save summaries to localStorage')
      }
    }
  }, [summaries, token])

  const addSummary = async (article, summaryText) => {
    if (token) {
      try {
        const sourceName = typeof article.source === 'object' ? article.source?.name : article.source
        const payload = {
          title: article.title,
          url: article.url,
          urlToImage: article.urlToImage,
          source: sourceName,
          author: article.author,
          publishedAt: article.publishedAt,
          description: article.description,
          summaryText
        }
        const res = await fetch('http://localhost:5000/api/summaries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        const newItem = {
          _id: data.saved._id,
          id: article.url,
          article,
          summaryText,
          savedAt: data.saved.createdAt
        }
        setSummaries(prev => [newItem, ...prev.filter(s => s.id !== newItem.id)])
      } catch (err) {
        console.error('Failed to save to backend', err)
      }
    } else {
      const newItem = {
        id: article.url,
        article,
        summaryText,
        savedAt: new Date().toISOString(),
      }
      setSummaries(prev => [newItem, ...prev.filter(s => s.id !== newItem.id)])
    }
  }

  const removeSummary = async (articleUrl) => {
    if (token) {
      const summaryToDelete = summaries.find(s => s.id === articleUrl)
      if (summaryToDelete && summaryToDelete._id) {
        try {
          await fetch(`http://localhost:5000/api/summaries/${summaryToDelete._id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          })
          setSummaries(prev => prev.filter(s => s.id !== articleUrl))
        } catch (err) {
          console.error('Failed to delete from backend', err)
        }
      }
    } else {
      setSummaries(prev => prev.filter(s => s.id !== articleUrl))
    }
  }

  const isSaved = (articleUrl) => {
    return summaries.some(s => s.id === articleUrl)
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
