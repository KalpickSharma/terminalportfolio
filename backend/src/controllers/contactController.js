const ContactMessage = require('../models/ContactMessage');
const Joi = require('joi');

// Validation schema for contact form
const contactSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).trim(),
  email: Joi.string().email().required().max(255).trim(),
  message: Joi.string().required().min(10).max(1000).trim()
});

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Create contact message
    const contactMessage = new ContactMessage({
      name: value.name,
      email: value.email,
      message: value.message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    await contactMessage.save();

    res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully!',
      data: {
        id: contactMessage._id,
        name: contactMessage.name,
        email: contactMessage.email,
        submittedAt: contactMessage.createdAt
      }
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting contact form'
    });
  }
};

// @desc    Get all contact messages (for admin)
// @route   GET /api/contact
// @access  Private (future admin access)
const getContactMessages = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await ContactMessage.countDocuments(query);

    res.json({
      success: true,
      data: {
        messages,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contact messages'
    });
  }
};

// @desc    Update message status
// @route   PATCH /api/contact/:id
// @access  Private (future admin access)
const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be unread, read, or replied'
      });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message status updated successfully',
      data: message
    });

  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating message status'
    });
  }
};

module.exports = {
  submitContact,
  getContactMessages,
  updateMessageStatus
};
