import { URLSearchParams } from "url";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Order from "@/models/orderModel";

connect();

export async function GET(req) {
  const email = new URLSearchParams(req.url).get("email");
  //const { searchParams } = new URL(request.url)
  // const name = searchParams.get(‘name’)
  try {
    const orders = await Order.findByUserEmail(email);
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      { error: "An error occurred while searching users." },
      { status: 400 }
    );
  }
}
// fetch(`/api/order/search?email=user@example.com`);

// like this data will comment[
//     {
//       _id: ObjectId("order_id1"),
//       user: ObjectId("user_id"),
//       products: [
//         {
//           _id: ObjectId("product_id1"),
//           product: { _id: ObjectId("product_id1"), name: "Product 1", ... },
//           quantity: 2,
//           price: 10,
//           deliveryDate: ...,
//           replaceEligible: ...
//         },
//         ...
//       ],
//       totalAmount: 50,
//       status: "Delivered",
//       createdAt: ...,
//       ...
//     },
//     {
//       _id: ObjectId("order_id2"),
//       user: ObjectId("user_id"),
//       products: [
//         {
//           _id: ObjectId("product_id2"),
//           product: { _id: ObjectId("product_id2"), name: "Product 2", ... },
//           quantity: 1,
//           price: 20,
//           deliveryDate: ...,
//           replaceEligible: ...
//         },
//         ...
//       ],
//       totalAmount: 30,
//       status: "Pending",
//       createdAt: ...,
//       ...
//     },
//     ...
//   ]
