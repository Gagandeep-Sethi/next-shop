"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalf, FaUserAlt } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

const RevewList = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getData();
    async function getData() {
      try {
        const data = await fetch(`/api/product/reviewList/${id}`);

        if (!data.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const json = await data.json();
        setReviews(json?.reviews);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);

  if (reviews.length === 0)
    return <p className="text-2xl mt-6  text-center">No reviews yet !!</p>;

  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(2);
  const filledStars = Math.floor(averageRating);
  const remaining = averageRating - filledStars;
  const partialStar = remaining >= 0.25 ? 0.5 : 0;

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" ">
      <p className="text-3xl font-semibold text-center my-8 underline">
        Rating and Reviews
      </p>
      <p className="text-center">
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="text-orange-400 inline-block" />
        ))}
        {partialStar > 0 && (
          <FaStarHalf className="text-orange-400 inline-block" />
        )}
        <span className="ml-1">({averageRating} out of 5)</span>
      </p>

      <div className="mx-auto max-w-screen-lg bg-gray-100 rounded-xl py-4    ">
        {reviews.map((review) => (
          <div key={review._id} className="py-2 ">
            <p className="flex items-center gap-1">
              <FaUserAlt className="w-6 h-4" />
              {review?.username}
              <span className="flex items-center font-extralight text-sm bg-green-300 rounded-xl px-1">
                <MdOutlineVerified /> verified buyer{" "}
              </span>
            </p>
            <div className="flex">
              {Array.from({ length: review.rating }, (_, index) => (
                <FaStar key={index} className="text-orange-400" />
              ))}
            </div>
            <p>{review?.comments}</p>
            <div>
              {review.images.length > 0 && (
                <div className="flex flex-wrap">
                  {review.images.map((image, index) => (
                    <div key={index} className="max-w-full">
                      <div
                        className="relative mr-4 mb-4 cursor-pointer"
                        onClick={() => openModal(image)}
                      >
                        <Image
                          src={`http://res.cloudinary.com/dyja4tbmu/image/upload/${image}.png`}
                          alt=""
                          className="h-20 w-20 object-cover"
                          width="100"
                          height="100"
                        />
                      </div>
                      {isModalOpen && selectedImage === image && (
                        <dialog className="modal" open>
                          <div className="modal-box ">
                            <Image
                              src={`http://res.cloudinary.com/dyja4tbmu/image/upload/${image}.png`}
                              alt=""
                              className="h-[300px] md:h-[400px] w-[500px] md:w-[600px] "
                              width="800"
                              height="800"
                            />
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button onClick={closeModal}>close</button>
                          </form>
                        </dialog>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevewList;
