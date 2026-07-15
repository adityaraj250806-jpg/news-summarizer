const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const MODEL = 'gemini-3.5-flash'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`

export async function summarizeArticle(articleText) {
  const prompt = `Summarize the following article in exactly 3 concise bullet points:\n\n${articleText}`

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  }

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  })

  const data = await response.json()

  if (!response.ok) {
    const errorMsg = data?.error?.message || `Gemini API error: ${response.status}`
    throw new Error(errorMsg)
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    throw new Error('No summary returned from Gemini. The response may have been blocked.')
  }

  return text
}
