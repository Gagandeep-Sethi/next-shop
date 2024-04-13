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
//this is how each element inside array will look like
// {
//   _id: ObjectId,           // Unique identifier for the product
//   name: String,            // Name of the product
//   category: String,        // Category of the product
//   description: String,     // Description of the product
//   size: String,            // Size of the product
//   warranty: Number,        // Warranty period of the product in months
//   images: [String],        // Array of image URLs for the product
//   originalPrice: Number,   // Original price of the product
//   displayPrice: Number,    // Display price of the product
//   createdAt: Date,         // Date when the product was created
//   updatedAt: Date          // Date when the product was last updated
// }

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
