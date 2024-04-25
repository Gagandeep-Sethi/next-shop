import mongoose from "mongoose";

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
      deliveryDate: { type: Date },
      replaceEligible: { type: Boolean, default: true },
    },
  ],
  address: {
    houseNo: { type: String, required: true },
    streetNo: { type: String, required: true },
    locality: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactNo: { type: String, required: true },
  },
  paid: { type: Boolean, default: false },
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

// Define pre-save hook to calculate totalAmount and set delivery date
orderSchema.pre("save", async function (next) {
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

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
