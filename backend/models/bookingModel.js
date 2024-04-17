import mongoose from "mongoose";

const bookingModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
  },
  groupSize: { type: Number },
  status: { type: String, default: "pending" },
  plannerId:{type: mongoose.Schema.Types.ObjectId,
    ref: "user",}
});

const Booking =  mongoose.model("Bookings", bookingModel);
export default Booking;
