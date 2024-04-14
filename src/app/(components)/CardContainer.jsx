import React from "react";
import Card from "./Card";

const CardContainer = ({ data }) => {
  return (
    <div className="">
      <div className="grid lg:grid-flow-col lg:col-span-3 justify-evenly">
        {data
          ? data.map((res) => (
              <div className="mt-7 md:mt-0  " key={res._id}>
                <Card data={res} />
              </div>
            ))
          : null}
      </div>
      <div className="flex justify-center my-6">
        <button
          onClick=""
          className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white "
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default CardContainer;
