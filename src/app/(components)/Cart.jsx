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
  const order = useSelector((store) => store?.order);
  console.log(order, "order");
  const dispatch = useDispatch();
  if (cart.length === 0) return <EmptyCart value={"Cart"} />;
  const handleBuy = () => {
    dispatch(addOrder(cart));
  };

  return (
    <div className="w-screen min-h-svh">
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
                Proceed to Buy
              </p>
            </Link>
          </div>
          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
