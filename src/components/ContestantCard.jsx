import React from "react";
import contestant from "../../public/assets/contestant.png";
import labour from "../../public/assets/Labour_logo.png";
import Image from "next/image";

function ContestantCard() {
  return (
    <div className="bg-[#313131] hover:border-2 hover:border-[#00ACE3] rounded-md p-4 ">
      <div className="">
        <Image src={contestant} alt="" className="relative object-cover " />
        <Image
          src={labour}
          alt="contest-logo"
          className="absolute -mt-20 object-cover "
        />
      </div>
      <h1 className="text-md text-center mt-4">Olumide Akpata</h1>
    </div>
  );
}

export default ContestantCard;
