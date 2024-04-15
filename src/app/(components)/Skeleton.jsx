import React from "react";

const Skeleton = () => {
  const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <div>
      <div className="flex flex-wrap justify-evenly min-h-svh">
        {data.map((res) => {
          return (
            <div className="mt-7  " key={res}>
              <div className="flex flex-col gap-4 w-80 h-96">
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
