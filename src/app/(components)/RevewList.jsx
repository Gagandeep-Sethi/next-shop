"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalf, FaUserAlt } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

const RevewList = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getData();
    async function getData() {
      try {
        const data = await fetch(`/api/product/reviewList/${id}`);

        if (!data.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const json = await data.json();
        console.log(json?.reviews);
        setReviews(json?.reviews);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);
  if (reviews.length === 0) return <p>Not reviews yet</p>;
  console.log(reviews, "reviews");
  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(2);
  const filledStars = Math.floor(averageRating);

  // Calculate the remaining fraction as a percentage of a star
  const remaining = averageRating - filledStars;
  const partialStar = remaining >= 0.25 ? 0.5 : 0;

  return (
    <div>
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
      <div className="bg-gray-200 rounded-xl mx-4 p-4">
        {reviews.map((review) => {
          return (
            <div key={review._id} className="space-y-1 py-2">
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
                      <div key={index} className="relative mr-4 mb-4">
                        <Image
                          src={`http://res.cloudinary.com/dyja4tbmu/image/upload/${image}.png`}
                          alt=""
                          className="h-20 w-20 object-cover"
                          width="100"
                          height="100"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevewList;
