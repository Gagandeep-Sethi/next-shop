"use client";
import { useState } from "react";
import { useAddress } from "../(hooks)/useAddress";

const Address = () => {
  const [formValue, setFormValue] = useState({
    houseNo: "",
    streetNo: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
  });
  const { addAddress, isLoading, error } = useAddress();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue.images);
    await addAddress(formValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="max-w-md w-full px-6 py-8 bg-gray-200 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Address</h2>
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="houseNo" className="text-sm font-medium">
              House Number
            </label>
            <input
              type="text"
              name="houseNo"
              className="input"
              placeholder="House Number"
              value={formValue.houseNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="streetNo" className="text-sm font-medium">
              Street N
            </label>
            <input
              type="text"
              name="streetNo"
              className="input"
              placeholder="Street Number"
              value={formValue.streetNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="locality" className="text-sm font-medium">
              Locality
            </label>
            <input
              name="locality"
              className="input"
              placeholder="Locality"
              value={formValue.locality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="landmark" className="text-sm font-medium">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              className="input"
              placeholder="Landmark"
              value={formValue.landmark}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium">
              City
            </label>
            <input
              type="text"
              name="city"
              className="input"
              placeholder="City"
              value={formValue.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="text-sm font-medium">
              State
            </label>
            <input
              type="text"
              name="state"
              className="input"
              placeholder="State"
              value={formValue.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className="btn bg-blue-500 text-white hover:bg-blue-600"
            >
              Add Address
            </button>
          </div>
        </form>
        {error && <div className="text-red-600 text-lg">{error} !!</div>}
      </div>
    </div>
  );
};

export default Address;
