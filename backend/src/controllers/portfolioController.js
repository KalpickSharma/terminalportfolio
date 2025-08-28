const PortfolioData = require('../models/PortfolioData');

// @desc    Get all portfolio data
// @route   GET /api/portfolio
// @access  Public
const getAllPortfolioData = async (req, res) => {
  try {
    const portfolioData = await PortfolioData.find({}).sort({ type: 1 });
    
    // Transform data to match frontend structure
    const transformedData = {};
    portfolioData.forEach(item => {
      transformedData[item.type] = item.content;
    });

    res.json({
      success: true,
      data: transformedData
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching portfolio data'
    });
  }
};

// @desc    Get specific portfolio section
// @route   GET /api/portfolio/:section
// @access  Public
const getPortfolioSection = async (req, res) => {
  try {
    const { section } = req.params;
    
    const data = await PortfolioData.findOne({ type: section });
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: `Portfolio section '${section}' not found`
      });
    }

    res.json({
      success: true,
      data: data.content
    });
  } catch (error) {
    console.error('Error fetching portfolio section:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching portfolio section'
    });
  }
};

// @desc    Update portfolio section
// @route   PUT /api/portfolio/:section
// @access  Private (future admin access)
const updatePortfolioSection = async (req, res) => {
  try {
    const { section } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    const updatedData = await PortfolioData.findOneAndUpdate(
      { type: section },
      { 
        content,
        lastUpdated: new Date(),
        $inc: { version: 1 }
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true 
      }
    );

    res.json({
      success: true,
      data: updatedData,
      message: `Portfolio section '${section}' updated successfully`
    });
  } catch (error) {
    console.error('Error updating portfolio section:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating portfolio section'
    });
  }
};

module.exports = {
  getAllPortfolioData,
  getPortfolioSection,
  updatePortfolioSection
};
