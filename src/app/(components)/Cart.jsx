"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";

import EmptyCart from "./EmptyCart";
import { addOrder } from "@/provider/redux/orderSlice";
import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";

const Cart = () => {
  const cart = useSelector((store) => store?.cart?.cart);
  const order = useSelector((store) => store?.order?.order);
  const dispatch = useDispatch();
  if (cart.length === 0) return <EmptyCart />;
  console.log(cart, "cart");

  const handleBuy = () => {
    dispatch(addOrder(cart));
    console.log(order, "order");
  };

  return (
    <div className="w-screen">
      <div className="flex justify-center w-full">
        <ul className="timeline">
          <li>
            <div
              className="timeline-start timeline-box text-green-500 border-green-500
"
            >
              Cart
            </div>
            <div className="timeline-middle">
              <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
            </div>
            <hr className="bg-green-500" />
          </li>
          <li>
            <hr />
            <div className="timeline-start timeline-box">Address</div>
            <div className="timeline-middle">
              <IoCheckmarkCircle className="w-5 h-5" />
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start timeline-box">Payment</div>
            <div className="timeline-middle">
              <IoCheckmarkCircle className="w-5 h-5" />
            </div>
          </li>
        </ul>
      </div>

      <div className="  md:flex w-screen">
        <div className=" w-full md:w-7/12">
          {cart.map((res) => (
            <CartCard key={res?._id} data={res} />
          ))}
        </div>
        <div className="w-full md:w-4/12 mx-auto   border-2 border-gray-300 rounded-xl h-fit mt-6">
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <p>Items total</p>
              <p>
                ₹
                {cart.reduce((acc, res) => {
                  console.log(res);
                  return (
                    acc +
                    (res.displayPrice
                      ? res.displayPrice * res.quantity
                      : res.originalPrice * res.quantity)
                  );
                }, 0)}
              </p>
            </div>
            <div className="flex justify-between ">
              <p>Delivery fee </p>
              <p className="text-green-600">Free</p>
            </div>
            <Link href="/order/address">
              <p
                onClick={handleBuy}
                className="text-center bg-primary text-white rounded-xl p-2 cursor-pointer"
              >
                Buy
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// "use client";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CartCard from "./CartCard";
// import { useRouter } from "next/navigation";
// import EmptyCart from "./EmptyCart";
// import { emptyCart } from "@/provider/redux/cartSlice";

// const Cart = () => {
//   const cart = useSelector((store) => store?.cart?.cart);
//   const dispatch = useDispatch();
//   const user = useSelector((store) => store.user.user);
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   if (cart.length === 0) return <EmptyCart />;
//   console.log(cart, "cart");

//   const makePayment = async () => {
//     setIsLoading(true);

//     // make an endpoint to get this key
//     const key = process.env.RAZORPAY_KEY_ID;
//     const data = await fetch("/api/order/newOrder", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: user?.email, products: cart }),
//     });
//     const { razorOrder } = await data?.json();
//     console.log(razorOrder, "orderssss");
//     const options = {
//       key: key,
//       name: user ? user?.email : "gagan123@gmail.com",
//       currency: razorOrder.currency,
//       amount: razorOrder.amount,
//       order_id: razorOrder.id,
//       modal: {
//         ondismiss: function () {
//           setIsLoading(false);
//         },
//       },
//       handler: async function (response) {
//         const data = await fetch("/api/order/verify", {
//           method: "POST",
//           body: JSON.stringify({
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//             _id: razorOrder.receipt,
//           }),
//         });

//         const res = await data.json();
//         if (res?.error === false) {
//           // redirect to success page
//           console.log("payment sucess");
//           dispatch(emptyCart());
//           router.push("/payment/success");
//         }
//       },
//       prefill: {
//         email: user ? user?.email : null,
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//     paymentObject.on("payment.failed", function (res) {
//       alert("Payment failed. Please try again.");
//       setIsLoading(false);
//     });
//   };

//   return (
//     <div className="  md:flex md:w-screen">
//       <div className="md:w-7/12">
//         {cart.map((res) => (
//           <CartCard key={res?._id} data={res} />
//         ))}
//       </div>
//       <div className="md:w-4/12 mx-auto   border-2 border-gray-300 rounded-xl h-fit mt-6">
//         <div className="p-6 space-y-4">
//           <div className="flex justify-between">
//             <p>Items total</p>
//             <p>
//               ₹
//               {cart.reduce((acc, res) => {
//                 console.log(res);
//                 return (
//                   acc +
//                   (res.displayPrice
//                     ? res.displayPrice * res.quantity
//                     : res.originalPrice * res.quantity)
//                 );
//               }, 0)}
//             </p>
//           </div>
//           <div className="flex justify-between ">
//             <p>Delivery fee </p>
//             <p className="text-green-600">Free</p>
//           </div>
//           <p
//             onClick={makePayment}
//             disabled={isLoading}
//             className="text-center bg-primary text-white rounded-xl p-2 cursor-pointer"
//           >
//             Place Order
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
