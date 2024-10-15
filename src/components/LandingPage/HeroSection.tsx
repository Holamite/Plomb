import React from "react";
import Link from "next/link";
import Image from "next/image";
import heroimg from "../../../public/assets/heroimg.png";

function HeroSection() {
  return (
    <div>
      <div className=" justify-between md:mx-28  flex flex-col-reverse gap-10 md:flex-row items-center md:text-start">
        <div>
          <h1 className="md:text-5xl text-2xl font-bold mt-8 md:mt-0 ">
            Welcome to PLOMB <br />
            The Future of
            <br />
            <span className="text-[#00ACE3]">Decentralized Voting</span>
          </h1>
          <h4 className="text-xl font-semibold mt-4">
            Eliminating Voting Rigging with <br /> Blockchain Technology
          </h4>
          <p className="text-md mt-2 mb-10">
            Detailed description of the project, emphasizing the <br /> The
            future of Decentralized Voting, how it eliminates <br /> rigging,
            and improves transparency.
          </p>
          <Link
            href="Poll"
            className="bg-[#00ACE3] rounded-md py-2 px-6 font-semibold "
          >
            Create Poll
          </Link>
        </div>

        <Image className="h-96 ml-28" src={heroimg} alt="heroImg" />
      </div>
    </div>
  );
}

export default HeroSection;
