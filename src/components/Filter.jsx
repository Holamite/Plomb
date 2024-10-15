import React from "react";
import { MdOutlineStorage } from "react-icons/md";

function Filter() {
  return (
    <div className="mt-16">
      <div className="flex gap-3 px-6 py-2 rounded-md bg-[#313131] w-fit items-center cursor-pointer">
        <h1>Filter</h1>
        <MdOutlineStorage />
      </div>
      <h1 className="mt-12">Poll Status</h1>
      <div className="flex gap-8">
        <button className=" bg-[#ACACAC] py-2 px-6 rounded-md font-semibold mt-4 cursor-pointer">
          Ongoing
        </button>
        <button className=" bg-[#313131] py-2 px-6 rounded-md font-semibold mt-4 cursor-pointer">
          Upcoming
        </button>
      </div>
      <button className=" bg-[#313131] py-2 px-6 rounded-md font-semibold mt-4 cursor-pointer ">
        Closed
      </button>
    </div>
  );
}

export default Filter;
