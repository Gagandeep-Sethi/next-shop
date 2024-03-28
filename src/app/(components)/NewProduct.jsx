"use client";
import { useState } from "react";
import { useNewProduct } from "../(hooks)/useNewProduct";
import Image from "next/image";

const NewProduct = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    size: "not_required",
    images: [],
  });
  const { addProduct, isLoading, error } = useNewProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(formValue);
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="max-w-md w-full px-6 py-8 bg-gray-200 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Add New Product</h2>
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Name of the product"
              value={formValue.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <input
              type="text"
              name="category"
              className="input"
              placeholder="Category"
              value={formValue.category}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              className="input"
              placeholder="Description of the product"
              value={formValue.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="originalPrice" className="text-sm font-medium">
              Original Price
            </label>
            <input
              type="text"
              name="originalPrice"
              className="input"
              placeholder="Price in Rupees"
              value={formValue.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discountPrice" className="text-sm font-medium">
              Discounted Price
            </label>
            <input
              type="text"
              name="discountPrice"
              className="input"
              placeholder="Write same as ori. price if case of no discount  "
              value={formValue.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="size" className="text-sm font-medium">
              Size
            </label>
            <select
              name="size"
              className="input"
              value={formValue.size}
              onChange={handleChange}
            >
              <option value="not_required">Not required</option>
              <option value="M">M</option>
              <option value="S">S</option>
              <option value="Full">Full</option>
              <option value="Half">Half</option>
              {/* Add more size options as needed */}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="images" className="text-sm font-medium">
              Images
            </label>
            <input
              type="file"
              name="images"
              className="input"
              accept="image/jpeg, image/png"
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
              type="submit"
              className="btn bg-blue-500 text-white hover:bg-blue-600"
            >
              Update Product
            </button>
          </div>
        </form>
        {error && <div className="text-red-600 text-lg">{error} !!</div>}
      </div>
    </div>
  );
};

export default NewProduct;
