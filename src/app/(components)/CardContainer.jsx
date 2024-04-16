import React from "react";
import Card from "./Card";

const CardContainer = ({ data }) => {
  return (
    <div className="">
      <div className=" flex flex-wrap justify-evenly gap-14">
        {data
          ? data.map((res) => (
              <div className="mt-7 md:mt-0  " key={res._id}>
                <Card data={res} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default CardContainer;
