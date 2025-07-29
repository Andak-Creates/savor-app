import Image from "next/image";
import React from "react";

const DashboardNav = () => {
  return (
    <nav
      className=" h-auto w-full flex justify-start items-center border-b-[0.5px] border-[black]
              px-[40px]"
    >
      {/* Navigation content */}
      <div
        className="flex  w-fit
                justify-center items-center gap-3"
      >
        {/* Img */}
        <div>
          <Image src={"/images/logo.png"} height={30} width={30} alt="logo" />
        </div>
        <h1 className="font-bold text-[25px]">Savor</h1>
      </div>
    </nav>
  );
};

export default DashboardNav;
