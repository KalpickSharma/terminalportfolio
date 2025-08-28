const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContactMessages,
  updateMessageStatus
} = require('../controllers/contactController');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', submitContact);

// @route   GET /api/contact
// @desc    Get all contact messages (for admin)
// @access  Private (future admin access)
router.get('/', getContactMessages);

// @route   PATCH /api/contact/:id
// @desc    Update message status
// @access  Private (future admin access)
router.patch('/:id', updateMessageStatus);

module.exports = router;
