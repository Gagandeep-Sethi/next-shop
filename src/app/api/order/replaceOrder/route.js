import Order from "@/models/orderModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const body = req.json();
    const idCookies = req.cookies.get("token")?.value;
    //in req we will be getting order Id and the array of obj each have productId and quantity
    const { orderId, products } = body;
    //decoding userid from token
    const decoded = jwt.verify(idCookies, process.env.JWT_SECRET);
    const userId = decoded.token;

    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error(
        "order not found or something went wrong please try again"
      );
    }
    // Check if the order belongs to the user making the replacement request
    if (order.user.toString() !== userId) {
      throw new Error(
        "Order does not belong to the user making the replacement request"
      );
    }
    //check if the product is eligible for replacement
    if (!order.replaceEligible) {
      throw new Error("order replacement date have passed");
    }
    //checking if he ordered such product he is requesting and if he did then he is not requesting more quantity then he ordered
    for (const { productId, quantity } of products) {
      const existingProduct = order.products.find(
        (prod) => prod.product.toString() === productId
      );
      if (!existingProduct) {
        throw new Error(`Product with ID ${productId} not found in the order`);
      }
      if (quantity > existingProduct.quantity) {
        throw new Error(
          `Replacement quantity exceeds original quantity for product with ID ${productId}`
        );
      }
      // Add replacement details to the order
      order.replacementItems.push({
        product: productId,
        quantity: quantity,
        reason: "Reason for replacement", // Add the actual reason here
      });
    }
    await order.save();

    return NextResponse.json(
      { message: "Replacement of order approved" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}

//need to update data recieving and need to sent token also with the req
