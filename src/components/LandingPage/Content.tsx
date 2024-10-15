import React from "react";
import Feature from "./Feature";
import Benefit from "./Benefit";
import VoteCard from "./VoteCard";

function LandingPage() {
  //   const navigate = useNavigate();

  //   const handleClick = (path) => {
  //     navigate(path);
  //   };

  return (
    <>
      <div className="grid md:grid-cols-3 grid-rows-1 pt-32 ">
        <div className="col-span-2 space-y-4">
          <h1 className="md:mx-28 mx-16 mb-8 text-3xl font-semibold">
            Features
          </h1>
          <Feature />
        </div>
        <div>
          <h1 className="md:mx-28 mx-4 mt-12 md:mt-0  ml-16 md:ml-0 mb-8 text-3xl font-semibold">
            Benefits
          </h1>
          <Benefit />
        </div>
      </div>
      <VoteCard />
    </>
  );
}

export default LandingPage;
