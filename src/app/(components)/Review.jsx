"use client";
import { useState } from "react";
import { useReview } from "../(hooks)/useReview";
import Image from "next/image";
import PopUpMessage from "./PopUpMessage";

const RatingComponent = ({ formValue, setFormValue }) => {
  const handleRatingChange = (e) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      rating: e.target.value,
    }));
  };

  return (
    <div className="rating">
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value="1"
        onChange={handleRatingChange}
        checked={formValue.rating === "1"}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value="2"
        onChange={handleRatingChange}
        checked={formValue.rating === "2"}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value="3"
        onChange={handleRatingChange}
        checked={formValue.rating === "3"}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value="4"
        onChange={handleRatingChange}
        checked={formValue.rating === "4"}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        value="5"
        onChange={handleRatingChange}
        checked={formValue.rating === "5"}
      />
    </div>
  );
};

const Review = ({ id, email }) => {
  const [formValue, setFormValue] = useState({
    email: email,
    comment: "",
    rating: "5",
    productId: id,
    images: [],
  });
  const { addReview, isLoading, error, popupMessage, showPopup, setShowPopup } =
    useReview();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview(formValue);
    setFormValue({
      email: email,
      comment: "",
      rating: "5",
      productId: id,
      images: [],
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        [name]: [...prevFormValue.images, ...files],
      }));
    } else {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormValue((prevFormValue) => {
      const newImages = [...prevFormValue.images];
      newImages.splice(index, 1);
      return {
        ...prevFormValue,
        images: newImages,
      };
    });
  };

  return (
    <div className="max-w-sm  ">
      <form onSubmit={handleSubmit} className="p-8 space-y-3">
        <div className="flex justify-center">
          <RatingComponent formValue={formValue} setFormValue={setFormValue} />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="comment" className="text-sm font-medium">
            Review
          </label>
          <textarea
            name="comment"
            className="input p-2 bg-gray-100"
            placeholder="Write your review ..."
            value={formValue.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="images" className="text-sm font-medium ">
            Images
          </label>
          <input
            type="file"
            name="images"
            className="input p-2 bg-gray-100"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
        </div>
        {/* Display uploaded images with option to remove */}
        {formValue.images.length > 0 && (
          <div className="flex flex-wrap">
            {formValue.images.map((image, index) => (
              <div key={index} className="relative mr-4 mb-4">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="h-20 w-20 object-cover"
                  width="100"
                  height="100"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            className="btn bg-black hover:bg-primary text-white "
            type="submit"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : null}
            Submit Review
          </button>
        </div>
        {error && <div className="text-red-600 text-lg">{error} !!</div>}
      </form>
      {showPopup && (
        <PopUpMessage
          className="w-96"
          message={popupMessage}
          setShowPopup={setShowPopup}
          status={"success"}
        />
      )}
    </div>
  );
};

export default Review;
