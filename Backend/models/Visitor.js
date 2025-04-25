const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true,
  },
  visitorId: {
    type: String,
    required: true,
  },
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

visitorSchema.index({ portfolioId: 1, visitorId: 1 }, { unique: true });

module.exports = mongoose.model('Visitor', visitorSchema);
