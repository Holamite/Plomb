import Provider from "@/components/provider";
import React from "react";

function page() {
  return (
    <Provider>
      <div className="bg-[#252525] text-white">
        <div className="mx-52 pt-20">
          <h3 className="text-center text-4xl text-[#00ACE3] font-lg">
            Poll Results
          </h3>
          <div className="flex text-center mt-5 justify-between">
            <p>Community health Initiatives Vote</p>
            <p>August 15, 2024</p>
            <p>Number of voters: 320</p>
          </div>
          <div className="mt-20 row">
            <p>Free community Health Screenings</p>
            <p className="mt-2 text-xl">Votes: 180</p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="bg-[#00ACE3] py-2 text-end w-[80%]">
              <p className="mr-4 text-black">56.8%</p>
            </div>
            <p className="text-[#00ACE3]">Winner</p>
          </div>
          <div className="mt-20 row">
            <p>Mental Health Awareness Workshop</p>
            <p className="mt-2 text-xl">Votes: 90</p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="bg-[#00ACE3] py-2 text-end w-[50%]">
              <p className="mr-4 text-black">28.1%</p>
            </div>
          </div>
          <div className="mt-20 row">
            <p>Nutrition Education Programs</p>
            <p className="mt-2 text-xl">Votes: 50</p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="bg-[#00ACE3] py-2 text-end w-[30%]">
              <p className="mr-4 text-black">15.6%</p>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default page;
