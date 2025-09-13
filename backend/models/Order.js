const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, unique: true, index: true },
  username: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

// Auto-increment orderId using counters collection
orderSchema.pre("save", async function(next) {
  if (this.orderId) return next();
  try {
    const Counter = require("./Counter");
    const counter = await Counter.findByIdAndUpdate(
      "orderId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.orderId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Order", orderSchema);
