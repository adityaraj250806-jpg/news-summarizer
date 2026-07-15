const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth.middleware')
const { getSummaries, saveSummary, deleteSummary } = require('../controllers/summary.controller')

router.get('/', protect, getSummaries)
router.post('/', protect, saveSummary)
router.delete('/:id', protect, deleteSummary)

module.exports = router
