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
import Image from "next/image";

const ProductById = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.user);

  const { id } = params;
  const handleCart = () => {
    dispatch(addToCart(product));
    setPopupMessage("Item added to cart");
    setShowPopup(true);
    setStatus("success");
  };

  async function handleDelete() {
    const response = await fetch(`/api/product/deleteProduct/${id}`);
    if (response.ok) {
      setProduct("product not found");
    } else {
      setPopupMessage("failed to delete product please try again");
      setShowPopup(true);
      setStatus("fail");
    }
  }

  useEffect(() => {
    getData();
    async function getData() {
      try {
        const data = await fetch(`/api/product/${id}`);
        const json = await data.json();
        if (!data.ok) {
          setProduct(json.message);
        } else {
          setProduct(json?.product);
        }
      } catch (error) {}
    }
  }, [id]);

  if (product === "product not found") {
    return (
      <div className="flex flex-col justify-center min-h-svh  ">
        <p className="text-center  text-4xl text-blue-600 ">
          Oops.. product details not found !!
        </p>
        <div className="flex justify-center">
          <Image src="/search.png" alt="" width={320} height={500} />
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/">
            <button className="  btn btn-sm md:btn-md lg:btn-lg bg-black text-white hover:bg-gray-700">
              HomePage
            </button>
          </Link>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div>
        <Skeleton count={6} />
      </div>
    );
  }
  return (
    <div className="w-screen font-">
      <div className="w-full items-center md:flex whitespace-normal break-words ">
        <div className="md:w-5/12 md:ml-14 w-80 mx-auto   md:h-[740px] h-[400px]  flex justify-center">
          <TestCorousal className=" block" images={product?.images} />
        </div>
        <div className="md:w-6/12 px-3  md:ml-14 ">
          <h1 className="text-4xl font-medium py-1 md:py-3 text-center md:text-left ">
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
            <p className="text-red-500 text-center md:text-start my-2">
              Currently Out of Stock !!
            </p>
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
              status={status}
            />
          )}

          {user?.isAdmin ? (
            <div className="mt-4 flex justify-center md:justify-start">
              <div className="flex justify-center">
                <button
                  className="btn bg-red-500 hover:bg-red-700 text-white  "
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Delete Product
                </button>

                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <p className="py-4">
                      Are you sure you want to delete product !!
                    </p>
                    <div className="flex justify-center items-center">
                      <div>
                        <button
                          onClick={handleDelete}
                          className="btn bg-green-500 hover:bg-green-600 text-white  btn-sm md:btn-md "
                        >
                          Yes
                        </button>
                      </div>
                      <div className="modal-action justify-center mt-0">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="bg-red-500 hover:bg-red-600 btn text-white  btn-sm md:btn-md ">
                            No
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
              <div>
                <Link href={`/product/updateproduct/${id}`}>
                  <button className="btn ml-4 bg-red-500 hover:bg-red-700 text-white ">
                    Update Product
                  </button>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="my-6  ">
        <RevewList id={id} />
      </div>
    </div>
  );
};

export default ProductById;
