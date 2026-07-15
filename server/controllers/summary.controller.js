const SavedArticle = require('../models/savedArticle.model')

async function getSummaries(req, res) {
  try {
    const summaries = await SavedArticle.find({ user: req.userId }).sort({
      createdAt: -1,
    })
    res.json(summaries)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch summaries.', error: error.message })
  }
}

async function saveSummary(req, res) {
  try {
    const { title, url, urlToImage, source, author, publishedAt, description, summaryText } = req.body

    if (!title || !url || !summaryText) {
      return res.status(400).json({ message: 'title, url, and summaryText are required.' })
    }

    const sourceName = typeof source === 'object' ? source?.name : source

    const saved = await SavedArticle.findOneAndUpdate(
      { user: req.userId, url },
      { title, url, urlToImage, source: sourceName, author, publishedAt, description, summaryText },
      { upsert: true, new: true }
    )

    res.status(201).json({ message: 'Summary saved.', saved })
  } catch (error) {
    console.error('saveSummary error:', error.message)
    res.status(500).json({ message: 'Failed to save summary.', error: error.message })
  }
}

async function deleteSummary(req, res) {
  try {
    const summary = await SavedArticle.findOne({
      _id: req.params.id,
      user: req.userId,
    })

    if (!summary) {
      return res.status(404).json({ message: 'Summary not found.' })
    }

    await summary.deleteOne()
    res.json({ message: 'Summary removed.' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete summary.', error: error.message })
  }
}

module.exports = { getSummaries, saveSummary, deleteSummary }
