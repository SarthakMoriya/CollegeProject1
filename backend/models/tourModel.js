import mongoose from "mongoose";

const tourSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // Duration in days or hours
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "beginner"],
      required: true,
    },
    ratingAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    guides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    imageUrl: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/yamanproject-4e8ba.appspot.com/o/1713700911175Flexi%20(1).png?alt=media&token=3c679253-9f80-42d7-831d-61adaf6d7830",
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
