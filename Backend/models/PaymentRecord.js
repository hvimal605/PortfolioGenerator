const mongoose = require("mongoose");

const PaymentRecordSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true, // Crucial for anti-replay
    index: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  templateIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
  }],
  amount: {
    type: Number,
    required: true,
  },
  processedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PaymentRecord", PaymentRecordSchema);
