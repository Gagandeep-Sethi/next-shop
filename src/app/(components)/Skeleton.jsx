import React from "react";

const Skeleton = ({ count }) => {
  const data = Array.from({ length: count }, (_, index) => index + 1);
  return (
    <div>
      <div className="flex flex-wrap justify-evenly ">
        {data.map((res) => {
          return (
            <div className="mt-7" key={res}>
              <div className="flex flex-col gap-8 w-80 h-96">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skeleton;
