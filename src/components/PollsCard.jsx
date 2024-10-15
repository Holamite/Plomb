import Image from "next/image";
import React from "react";

function PollsCard({ pic, paragraph, title, date }) {
  return (
    <div className="mt-16">
      <div className="bg-[#313131] flex p-4 rounded-md shadow-gray-900 shadow-md gap-4 items-center">
        <div>
          <h1 className="text-xl mt-">{title}</h1>

          <p className="card-text mt-2 text-sm">{paragraph}</p>
          <p className="text-sm text-[#00ACE3] mt-2">{date}</p>
        </div>
        <Image
          src={pic}
          alt="card image"
          className="rounded-lg object-contain"
        />
      </div>

      <button className="bg-[#00ACE3] py-2 rounded-md w-[20%] font-semibold mt-4">
        View Details
      </button>
    </div>
  );
}

export default PollsCard;
