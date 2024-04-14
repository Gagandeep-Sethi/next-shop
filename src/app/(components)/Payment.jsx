"use client";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useSelector } from "react-redux";

const PaymentButton = () => {
  //const { userData } = useSession();
  const user = useSelector((store) => store.user.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const makePayment = async () => {
    setIsLoading(true);

    // make an endpoint to get this key
    const key = process.env.RAZORPAY_KEY_ID;
    const data = await fetch("/api/order/newOrder");
    const { order } = await data?.json();
    const options = {
      key: key,
      name: user ? user?.email : "gagan123@gmail.com",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },
      handler: async function (response) {
        const data = await fetch("/api/order/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email: userData.user?.email,
          }),
        });

        const res = await data.json();
        if (res?.error === false) {
          // redirect to success page
          router.push("/");
        }
      },
      prefill: {
        email: userData.user?.email,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (res) {
      alert("Payment failed. Please try again.");
      setIsLoading(false);
    });
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="">
          <button onClick={makePayment()} disabled={isLoading}>
            Pay Now
          </button>
        </div>
      </Suspense>
    </>
  );
};

export default PaymentButton;
