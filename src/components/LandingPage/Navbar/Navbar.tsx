import React from "react";
import Link from "next/link";
import plomb from "../../../../public/assets/plomb.png";
import { NavUtils } from "./NavUtils";
import { Wallet } from "@/components/Wallet";
import Image from "next/image";

// import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b-2 border-b-[#00ACE3] bg-[#313131] text-white">
      <div className="ml-12">
        <Image className="hover:w-40 hover:h-10" src={plomb} alt="plomb-logo" />
      </div>
      <div className="text-md space-x-4 font-bold">
        {NavUtils.map((item, index) => {
          return (
            <Link href={item.url} key={index} className="hover:underline ">
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* <button>
        connect button
      </button> */}
      {/* <ConnectButton /> */}
      <Wallet>Connect Wallet</Wallet>
    </nav>
  );
}

export default Navbar;
