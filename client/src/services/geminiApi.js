import { API_URL } from '../config'

const GEMINI_URL = `${API_URL}/api/summarize`

export async function summarizeArticle(articleText) {
  const requestBody = { articleText }

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  })

  const data = await response.json()

  if (!response.ok) {
    const errorMsg = data?.message || `Summarize error: ${response.status}`
    throw new Error(errorMsg)
  }

  const text = data?.summaryText
  if (!text) {
    throw new Error('No summary returned from backend.')
  }

  return text
}
