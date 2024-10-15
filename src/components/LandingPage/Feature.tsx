import React from "react";
import { FaSquareFull } from "react-icons/fa";
import { FeatureUtils } from "./FeatureUtils";
import Image from "next/image";
import votepoll from "../../../public/assets/voting.png";

function Feature() {
  return (
    <div className="md:mx-28 mx-8">
      <div>
        {FeatureUtils.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-[#313131] flex p-4 mb-4 rounded-md shadow-gray-900 shadow-md gap-4"
            >
              <div>
                <h1 className="text-3xl mt-8">{item.title}</h1>
                <div className="flex items-start gap-2 mt-4">
                  <FaSquareFull className="text-[#00ACE3] mt-1 w-4" />
                  <p className="card-text">{item.text1}</p>
                </div>
                <div className="flex items-start gap-2 mt-4">
                  <FaSquareFull className="text-[#00ACE3] mt-1 w-4" />
                  <p className="card-text">{item.text2}</p>
                </div>
              </div>

              <Image
                src={votepoll}
                alt="card image"
                className="rounded-lg object-cover "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feature;
