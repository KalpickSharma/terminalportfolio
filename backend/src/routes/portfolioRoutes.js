const express = require('express');
const router = express.Router();
const {
  getAllPortfolioData,
  getPortfolioSection,
  updatePortfolioSection
} = require('../controllers/portfolioController');

// @route   GET /api/portfolio
// @desc    Get all portfolio data
// @access  Public
router.get('/', getAllPortfolioData);

// @route   GET /api/portfolio/:section
// @desc    Get specific portfolio section
// @access  Public
router.get('/:section', getPortfolioSection);

// @route   PUT /api/portfolio/:section
// @desc    Update portfolio section
// @access  Private (future admin access)
router.put('/:section', updatePortfolioSection);

module.exports = router;
