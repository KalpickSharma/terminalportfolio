const mongoose = require('mongoose');

const portfolioDataSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['about', 'skills', 'projects', 'experience', 'education', 'certifications', 'volunteering', 'contact', 'links']
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Index for faster queries
portfolioDataSchema.index({ type: 1 });

module.exports = mongoose.model('PortfolioData', portfolioDataSchema);
