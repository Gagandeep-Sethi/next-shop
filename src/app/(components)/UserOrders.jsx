import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserOrders = ({ email }) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetch(`/api/order/search?email=${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const orders = await response.json();

        setOrder(orders.orders);
      } catch (error) {}
    }
    getOrders();
  }, [email]);

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
