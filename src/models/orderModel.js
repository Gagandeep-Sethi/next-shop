import mongoose from "mongoose";
import User from "./userModel";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      deliveryDate: { type: Date }, // New field to store delivery date of each product
      replaceEligible: { type: Boolean, default: true }, // New field to track replacement eligibility
    },
  ],
  paid: {
    type: Boolean,
    default: false,
  },
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date },
  replaced: { type: Boolean, default: false },
  replacementItems: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        reason: { type: String, required: true },
      },
    ],
    default: [],
  },
});

// Define pre-save hook to calculate totalAmount it will be triggered when you hit save() or create()

// Define pre-save hook to calculate totalAmount and set delivery date
orderSchema.pre("save", async function (next) {
  //save is middleware function mongo db and pre means before and combined with save

  let totalAmount = 0;
  this.products.forEach((product) => {
    totalAmount += product.quantity * product.price;
    if (this.status === "Delivered" && !product.deliveryDate) {
      product.deliveryDate = new Date();
    }
    // Set replaceEligible based on delivery date
    if (product.deliveryDate) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      product.replaceEligible = product.deliveryDate > sevenDaysAgo;
    }
  });
  this.totalAmount = totalAmount;
  next();
});

//for provideing all the order placed by same  user
orderSchema.statics.findByUserEmail = async function (email) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  return this.find({ user: user._id }).populate("products.product");
};

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
