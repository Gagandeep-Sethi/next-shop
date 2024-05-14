import mongoose from "mongoose";
import Product from "./productModel"; // Assuming you have a product model

const productsBoughtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productBought: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        default: null,
      },
      image: {
        type: [String],
      },
    },
  ],
});

productsBoughtSchema.pre("save", async function (next) {
  const productPromises = this.productBought.map(async (product) => {
    if (!product.name || !product.image) {
      const { name, images } = await Product.findById(product._id);
      product.name = name;
      product.image = images;
    }
    return product;
  });

  this.productBought = await Promise.all(productPromises);
  next();
});

const ProductsBought =
  mongoose.models.ProductsBought ||
  mongoose.model("ProductsBought", productsBoughtSchema);

export default ProductsBought;
