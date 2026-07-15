const cheerio = require('cheerio')

async function scrapeArticle(req, res) {
  try {
    const { url } = req.query

    if (!url) {
      return res.status(400).json({ message: 'URL is required.' })
    }

    const { default: fetch } = await import('node-fetch')

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch article. Status: ${response.status}`)
    }

    const html = await response.text()

    const $ = cheerio.load(html)

    $('script, style, nav, footer, header, aside, .ad, .advertisement, iframe').remove()

    let paragraphs = []
    $('p').each((i, el) => {
      const text = $(el).text().trim()
      if (text.length > 40) {
        paragraphs.push(text)
      }
    })

    const fullText = paragraphs.join('\n\n')

    if (!fullText) {
      return res.status(404).json({ message: 'Could not extract text from this article.' })
    }

    res.json({ content: fullText })
  } catch (error) {
    res.status(500).json({ message: 'Scraping failed.', error: error.message })
  }
}

module.exports = { scrapeArticle }
