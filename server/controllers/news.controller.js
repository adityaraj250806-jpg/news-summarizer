const cache = new Map()

async function getTopHeadlines(req, res) {
  try {
    const { category = 'general' } = req.query
    const cacheKey = `top-${category}`
    
    if (cache.has(cacheKey) && Date.now() - cache.get(cacheKey).time < 300000) {
      return res.json(cache.get(cacheKey).data)
    }



    const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`
    
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch from NewsAPI')
    }

    cache.set(cacheKey, { data, time: Date.now() })
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top headlines', error: error.message })
  }
}

async function searchNews(req, res) {
  try {
    const { q } = req.query
    if (!q) return res.status(400).json({ message: 'Query is required' })

    const cacheKey = `search-${q}`
    
    if (cache.has(cacheKey) && Date.now() - cache.get(cacheKey).time < 300000) {
      return res.json(cache.get(cacheKey).data)
    }



    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`
    
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch from NewsAPI')
    }

    cache.set(cacheKey, { data, time: Date.now() })
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error searching news', error: error.message })
  }
}

module.exports = { getTopHeadlines, searchNews }
