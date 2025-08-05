"use client";

import { useAuth } from "@/context/AuthContext";
import Lottie from "lottie-react";
import Image from "next/image";
import React from "react";
import notification from "@/lottiesfiles/notification-bell.json";

const DashboardNav = () => {
  const { user } = useAuth();
  return (
    <nav
      className="fixed bg-white h-auto w-full flex justify-between items-center
      border-b-[0.5px] border-[black] py-[5px]
              pl-[40px] pr-[60px] z-[60]"
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

      {/* Data */}
      <div className="flex gap-[30px] justify-center items-center">
        <div className="h-[35px] w-[35px] p-[2px] bg-[#0000002f] rounded-lg">
          <Lottie autoPlay animationData={notification} />
        </div>

        <Image
          className="rounded-full "
          src={user?.photoURL || "/images/logo.png"}
          height={30}
          width={30}
          alt="user picture"
        />
      </div>
    </nav>
  );
};

export default DashboardNav;
