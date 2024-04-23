import mongoose from "mongoose";
import User from "./userModel";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comments: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual field to populate username from userId
reviewSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
  options: { select: "username" },
});

reviewSchema.set("toObject", { virtuals: true });
reviewSchema.set("toJSON", { virtuals: true });

// Middleware to populate the username field before saving
reviewSchema.pre("save", async function (next) {
  if (!this.isModified("userId")) {
    return next();
  }
  try {
    const user = await User.findById(this.userId);
    this.username = user.username;
    next();
  } catch (error) {
    next(error);
  }
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
