require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const authRoutes = require('./routes/auth.routes')
const summaryRoutes = require('./routes/summary.routes')
const summarizerRoutes = require('./routes/summarizer.routes')
const newsRoutes = require('./routes/news.routes')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.vercel\.app$/
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    )
    if (allowed) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/summaries', summaryRoutes)
app.use('/api/summarize', summarizerRoutes)
app.use('/api/news', newsRoutes)

const { scrapeArticle } = require('./controllers/scraper.controller')
app.get('/api/scrape', scrapeArticle)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'News Dashboard API is running' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`)
})
