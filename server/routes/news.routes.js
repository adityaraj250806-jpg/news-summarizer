const express = require('express')
const router = express.Router()
const { getTopHeadlines, searchNews } = require('../controllers/news.controller')

router.get('/top-headlines', getTopHeadlines)
router.get('/everything', searchNews)

module.exports = router
