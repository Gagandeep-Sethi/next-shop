import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

const Rating = ({ email }) => {
  const [productBought, setProductBought] = useState(null);
  useEffect(() => {
    async function getData() {
      const response = await fetch(`/api/product/bought/${email}`);
      const json = await response.json();
      console.log(json, "json");

      setProductBought(json);
    }
    getData();
  }, [email]);
  if (productBought === null || productBought === "An error occurred")
    return <div>No products bought</div>;
  else console.log(productBought?.productBought[0]?.productBought, "product");
  return (
    <div>
      {productBought?.productBought[0]?.productBought.map((res, i) => {
        return (
          <div key={i}>
            <ReviewCard data={res} email={email} />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
