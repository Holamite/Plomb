import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { VoteCardUtils } from "./VoteCardUtils";
import Image from "next/image";
import Link from "next/link";

const VoteCard = () => {
  return (
    <div className="mt-32 grid md:grid-cols-2 grid-cols-1 md:mx-28 mx-4 gap-20">
      {VoteCardUtils.map((item, i) => {
        let targetPage = "/";
        if (item.button === "Create Poll") targetPage = "/admin";
        if (item.button === "Vote Now") targetPage = "/vote";
        if (item.button === "View Results") targetPage = "/results";
        if (item.button === "View Polls") targetPage = "/polls";

        return (
          <div
            className="bg-[#313131] p-4 rounded-md shadow-gray-900 shadow-md border-t border-[#00ACE3] border-x"
            key={i}
          >
            <div>
              <Image
                className="rounded-lg object-cover"
                src={item.pic}
                alt="cards"
                width={200}
                height={200}
              />
              <h1 className="text-3xl mt-8">{item.header}</h1>
              <div className="flex items-start gap-2 mt-4">
                <p className="card-text">{item.paragraph}</p>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Link href={targetPage}>
                <div className="border-[#00ACE3] border-2 flex w-fit rounded-md px-4 py-2 gap-2 items-center cursor-pointer">
                  <button className="font-semibold">{item.button}</button>
                  <FaArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VoteCard;
