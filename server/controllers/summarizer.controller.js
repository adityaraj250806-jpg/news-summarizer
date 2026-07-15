async function summarize(req, res) {
  try {
    const { articleText } = req.body

    if (!articleText) {
      return res.status(400).json({ message: 'articleText is required.' })
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`

    const prompt = `Summarize the following article in exactly 3 concise bullet points:\n\n${articleText}`



    const geminiResponse = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    })

    if (!geminiResponse.ok) {
      const errBody = await geminiResponse.json().catch(() => ({}))
      console.error('Gemini error response:', JSON.stringify(errBody))
      throw new Error(errBody?.error?.message || `Gemini API responded with status ${geminiResponse.status}`)
    }

    const data = await geminiResponse.json()
    const summaryText = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!summaryText) {
      console.error('Gemini raw response:', JSON.stringify(data))
      throw new Error('Gemini returned an empty response.')
    }

    res.json({ summaryText })
  } catch (error) {
    console.error('Summarization error:', error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { summarize }
