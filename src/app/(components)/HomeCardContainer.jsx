import React from "react";
import HomeCard from "./HomeCard";

const HomeCardContainer = ({ data }) => {
  return (
    <div className=" w-full ">
      <div className=" grid md:grid-cols-4 grid-cols-2 gap-8 mx-4 md:mx-24 bg-white py-6 px-4 rounded-md">
        {data
          ? data.map((res) => (
              <div className="  " key={res._id}>
                <HomeCard data={res} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default HomeCardContainer;
