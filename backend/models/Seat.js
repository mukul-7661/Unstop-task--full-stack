const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema(
  {
    seat_no: {
      type: String,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seat", SeatSchema);
