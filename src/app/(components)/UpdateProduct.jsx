"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useUpdateProduct } from "../(hooks)/useUpdateProduct";

const UpdateProduct = ({ productId }) => {
  console.log(productId, "update");

  const [formValue, setFormValue] = useState({
    name: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    size: "",
    warranty: "",
    images: [],
    newImageUploads: [],
    deletedImages: [],
    stock: "",
  });
  const { updateProduct, isLoading, error } = useUpdateProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("before sending to hook");
    await updateProduct(formValue, productId);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "newImageUploads") {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        [name]: [...prevFormValue.newImageUploads, ...files],
      }));
    } else if (name === "size" || "category" || "stock") {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        [name]: value,
      }));
    } else {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        [name]: value,
      }));
    }
  };

  const handleRemoveNewImage = (index) => {
    setFormValue((prevFormValue) => {
      const newImages = [...prevFormValue.newImageUploads];
      newImages.splice(index, 1);
      return {
        ...prevFormValue,
        images: newImages,
      };
    });
  };
  const handleRemoveOldImage = (image, index) => {
    setFormValue((prevFormValue) => {
      const newImages = [...prevFormValue.images];
      newImages.splice(index, 1);
      const dlt = [...prevFormValue.deletedImages, image];
      return {
        ...prevFormValue,
        images: newImages,
        deletedImages: dlt,
      };
    });
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/product/${productId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const product = await response.json();
        //console.log(product);
        //console.log(product.product.name, "name");
        // Update the form value state with the fetched product data
        setFormValue((prevFormValue) => ({
          ...prevFormValue,
          name: product?.product?.name,
          category: product?.product?.category,
          description: product?.product?.description,
          originalPrice: product?.product?.originalPrice,
          discountedPrice: product?.product?.displayPrice,
          warranty: product?.product?.warranty,
          size: product?.product?.size,
          images: product?.product?.images,
          stock: product?.product?.isOutOfStock,
          newImageUploads: [], // No new images initially
          deletedImages: [], // No deleted images initially
        }));
        console.log("form data:", formValue);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="max-w-md w-full px-6 py-8 bg-gray-200 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Update Product</h2>
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
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              name="category"
              className="input"
              value={formValue.category}
              onChange={handleChange}
            >
              <option value="pillow">pillow</option>
              <option value="mattress">mattress</option>
              <option value="bolster">bolster</option>
              <option value="cushion">cushion</option>
            </select>
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
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="originalPrice" className="text-sm font-medium">
              Original Price
            </label>
            <input
              type="number"
              name="originalPrice"
              className="input"
              placeholder="Price in Rupees"
              value={formValue.originalPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discountPrice" className="text-sm font-medium">
              Discounted Price
            </label>
            <input
              type="number"
              name="discountedPrice"
              className="input"
              placeholder="Write same as ori. price if case of no discount"
              value={formValue.discountedPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="stock" className="text-sm font-medium">
              Out of Stock ?
            </label>
            <select
              name="stock"
              className="input"
              value={formValue.stock}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="waranty" className="text-sm font-medium">
              Warranty (in months)
            </label>
            <input
              type="number"
              name="warranty"
              className="input"
              placeholder="Warranty"
              value={formValue.warranty}
              onChange={handleChange}
              required
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
          <p className="text-sm font-medium">Previous Images</p>
          {/* Display uploaded images with option to remove */}
          {formValue.images && formValue.images.length > 0 && (
            <div className="flex flex-wrap">
              {formValue.images.map((image, index) => (
                <div key={index} className="relative mr-4 mb-4">
                  <Image
                    src={`http://res.cloudinary.com/dyja4tbmu/image/upload/${image}.png`}
                    alt=""
                    className="h-20 w-20 object-cover"
                    width="100"
                    height="100"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleRemoveOldImage(image, index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="newImageUploads" className="text-sm font-medium">
              Add New Images
            </label>
            <input
              type="file"
              name="newImageUploads"
              className="input"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
          </div>
          {/* Display uploaded images with option to remove */}
          {formValue.newImageUploads.length > 0 && (
            <div className="flex flex-wrap">
              {formValue.newImageUploads.map((image, index) => (
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
                    onClick={() => handleRemoveNewImage(index)}
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

export default UpdateProduct;
