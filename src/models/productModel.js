import mongoose from "mongoose";

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

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
