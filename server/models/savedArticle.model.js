const mongoose = require('mongoose')

const savedArticleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
    urlToImage: { type: String },
    source: { type: String },
    author: { type: String },
    publishedAt: { type: String },
    description: { type: String },
    summaryText: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

savedArticleSchema.index({ user: 1, url: 1 }, { unique: true })

module.exports = mongoose.model('SavedArticle', savedArticleSchema)
