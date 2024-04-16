import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TestCorousal from "./TestCorousal";
import { addToCart } from "@/provider/redux/cartSlice";
import PopUpMessage from "./PopUpMessage";
import { useDispatch } from "react-redux";
import Skeleton from "./Skeleton";
import Link from "next/link";

const ProductById = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const dispatch = useDispatch();

  const { id } = params;
  console.log(id);
  const handleCart = () => {
    dispatch(addToCart(product));
    setPopupMessage("Item added to cart");
    setShowPopup(true);
  };
  const getData = async () => {
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
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!product) return <Skeleton />;
  return (
    <div>
      <div className="hero md:justify-start w-full md:pl-6  items-start    bg-white">
        <div className="hero-content flex-col lg:flex-row ">
          {/* <Corousal
            className="max-w-sm rounded-lg shadow-2xl"
            autoSlide={true}
            autoSlideInterval={4000}
          >
            {product?.images.map((s) => (
              <Image
                key={s}
                src={`https://res.cloudinary.com/dyja4tbmu/${s}.jpg`}
                className="w-full h-full object-cover object-center"
                sizes="100vw "
                fill
                alt=""
              />
            ))}
          </Corousal> */}
          <TestCorousal
            className="max-w-lg rounded-lg shadow-2xl "
            images={product?.images}
          />
          <div className="md:pl-20">
            <h1 className="text-5xl font-bold">{product?.name}</h1>
            <p className="pt-3 md:pt-6">{product?.description}</p>
            {product?.displayPrice ? (
              <div className="flex py-3 md:py-6 ">
                <del className=" text-gray-400 ">₹{product?.originalPrice}</del>
                <p className="text-green-600 ml-2">₹{product?.displayPrice}</p>
              </div>
            ) : (
              <p className="py-3 md:py-6">₹{product?.originalPrice}</p>
            )}
            <button
              onClick={handleCart}
              className="btn bg-black hover:bg-primary text-white "
            >
              Add to Cart
            </button>
            <div className="mt-10">
              <Link href={`/product/updateproduct/${id}`}>
                <button className="btn bg-red-700 hover:bg-primary text-white ">
                  Update Product
                </button>
              </Link>
            </div>
          </div>
          {showPopup && (
            <PopUpMessage message={popupMessage} setShowPopup={setShowPopup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductById;
