import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserOrders = ({ email }) => {
  const [order, setOrder] = useState([]);
  const getOrders = async () => {
    try {
      const response = await fetch(`/api/order/search?email=${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const orders = await response.json();
      console.log(orders.orders, "orders");
      setOrder(orders.orders);
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (order.length === 0) return <p>No orders to show </p>;
  return (
    <div className="">
      {order.length > 0 &&
        order.map((res, index) => {
          return (
            <div
              key={res._id}
              className="border-2 border-gray-300 p-2 rounded-2xl bg-gray-100 shadow-xl my-4"
            >
              <p>Order{index + 1}</p>
              <p>Status: {res.status}</p>
              <p>Total amount:{res.totalAmount}</p>
              <p>Paid:{res.paid ? "Yes" : "No"}</p>
              {res.products.map((res) => {
                return (
                  <div
                    key={res._id}
                    className="border-2 border-gray-300 p-2 rounded-2xl bg-green-200 shadow-xl"
                  >
                    <Link
                      href={`/product/${res.product}`}
                      className="text-blue-400 underline"
                    >
                      Product 1
                    </Link>
                    <p>Price:{res.price}</p>
                    <p>Quantity:{res.quantity}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default UserOrders;
