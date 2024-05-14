import Image from "next/image";
import React from "react";
import Review from "./Review";
import Link from "next/link";

const ReviewCard = ({ data, email }) => {
  return (
    <div>
      <div className="w-full md:justify-start   border-2 rounded-2xl md:my-3  border-gray-300 items-center   bg-white  ">
        <div className="flex flex-col     md:flex-row p-2 w-full md:gap-8 space-y-4 md:space-y-0 justify-center items-center">
          <div className="md:w-3/12 h-[230px] justify-center flex">
            <Link href={`/product/${data._id}`}>
              <Image
                src={`https://res.cloudinary.com/dyja4tbmu/${data?.image[0]}.jpg`}
                className="w-64  h-full rounded-lg shadow-2xl"
                alt=""
                width={200}
                height={200}
              />
            </Link>
          </div>
          <div className="md:w-8/12 w-full " style={{ wordWrap: "break-word" }}>
            <p className="text-5xl   font-bold  text-center md:text-start">
              {data?.name}
            </p>
            <Review email={email} id={data?._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
