"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "@/provider/redux/orderSlice";
import { useRouter } from "next/navigation";

const Address = () => {
  const [formValue, setFormValue] = useState({
    houseNo: "",
    streetNo: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    contactNo: "",
  });
  const address = useSelector((store) => store?.order?.address);
  const isFormFilled =
    formValue.houseNo &&
    formValue.streetNo &&
    formValue.locality &&
    formValue.landmark &&
    formValue.city &&
    formValue.state &&
    formValue.pincode &&
    formValue.contactNo;

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addAddress(formValue));
    router.push("/order/pay");
  };
  useEffect(() => {
    if (address) {
      setFormValue(address);
    }
  }, [address]);

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
              Street Number
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
          <div className="flex flex-col">
            <label htmlFor="pincode" className="text-sm font-medium">
              Pincode
            </label>
            <input
              type="number"
              name="pincode"
              className="input"
              placeholder="Pincode"
              value={formValue.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contactNo" className="text-sm font-medium">
              Contact number
            </label>
            <input
              type="number"
              name="contactNo"
              className="input"
              placeholder="Contact Number"
              value={formValue.contactNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn bg-blue-500 text-white hover:bg-blue-600"
              disabled={!isFormFilled}
            >
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
