const express = require('express')
const router = express.Router()
const { summarize } = require('../controllers/summarizer.controller')

router.post('/', summarize)

module.exports = router
