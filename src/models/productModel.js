import mongoose from "mongoose";
import Review from "./reviewModal";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    warranty: {
      type: Number, //in months
      required: true,
    },
    images: {
      type: [String],
    },
    originalPrice: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "Original price must be a non-negative number",
      },
    },
    displayPrice: {
      type: Number,
      validate: {
        validator: (value) => value >= 0,
        message: "Display price must be a non-negative number",
      },
    },
    avgRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Add indexes
productSchema.index({ name: "text", category: "text" });

// Virtual for discounted price
productSchema.virtual("discountedPrice").get(function () {
  return this.displayPrice || this.originalPrice;
});

// Define a method for calculating the discount percentage
productSchema.methods.calculateDiscountPercentage = function () {
  if (!this.displayPrice || !this.originalPrice) {
    return null;
  }
  return ((this.originalPrice - this.displayPrice) / this.originalPrice) * 100;
};

// Static method for searching products
productSchema.statics.search = async function (query) {
  const products = await this.find(
    {
      $text: { $search: query },
    },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });

  return products;
};
//to update avgRating
productSchema.methods.updateAvgRating = async function () {
  //const Review = mongoose.model("Review");
  const reviews = await Review.find({ productId: this._id });
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  this.avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;
  this.avgRating = parseFloat(this.avgRating.toFixed(2));
  console.log("update function called");
  console.log(this.avgRating, "avgRating");
  await this.save(); // Save the updated avgRating
};

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
