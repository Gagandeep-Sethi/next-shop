import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TestCorousal from "./TestCorousal";
import { addToCart } from "@/provider/redux/cartSlice";
import PopUpMessage from "./PopUpMessage";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import Link from "next/link";
import Review from "./Review";
import RevewList from "./RevewList";

const ProductById = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.user);

  const { id } = params;
  console.log(id);
  const handleCart = () => {
    dispatch(addToCart(product));
    setPopupMessage("Item added to cart");
    setShowPopup(true);
  };

  useEffect(() => {
    getData();
    async function getData() {
      try {
        const data = await fetch(`/api/product/${id}`);

        if (!data.ok) {
          throw new Error("Failed to fetch product");
        }

        const json = await data.json();
        console.log(json?.product);
        setProduct(json?.product);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);
  if (!product) return <Skeleton />;
  return (
    <div>
      <div className="w-screen items-center md:flex whitespace-normal break-words">
        <div className="md:w-5/12 md:ml-14 ">
          <TestCorousal className="" images={product?.images} />
        </div>
        <div className="md:w-6/12 px-3  md:ml-14 ">
          <h1 className="text-5xl font-bold py-3 text-center md:text-left ">
            {product?.name}
          </h1>
          <p className="pt-3 md:pt-6 py-3 text-center md:text-left">
            {product?.description}
          </p>
          {product?.displayPrice ? (
            <div className="flex py-3 md:py-6 justify-center md:justify-start ">
              <del className=" text-gray-400 ">₹{product?.originalPrice}</del>
              <p className="text-green-600 ml-2">₹{product?.displayPrice}</p>
            </div>
          ) : (
            <p className="py-3 md:py-6">₹{product?.originalPrice}</p>
          )}
          {product?.isOutOfStock === "true" ? (
            <p className="text-red-500">Currently Out of Stock !!</p>
          ) : null}
          <div className="flex  justify-center md:justify-start">
            <button
              disabled={product?.isOutOfStock === "true"}
              onClick={handleCart}
              className="btn    bg-black hover:bg-primary text-white "
            >
              Add to Cart
            </button>
          </div>

          {showPopup && (
            <PopUpMessage
              className="w-96"
              message={popupMessage}
              setShowPopup={setShowPopup}
            />
          )}

          {user?.isAdmin ? (
            <div className="mt-10 flex justify-center md:justify-start">
              <Link href={`/product/updateproduct/${id}`}>
                <button className="btn bg-red-700 hover:bg-primary text-white ">
                  Update Product
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <RevewList id={id} />
      </div>
      <div className="flex justify-center py-6">
        <Review email={user?.email} id={id} />
      </div>
    </div>
  );
};

export default ProductById;
