"use client";

import { useAuth } from "@/context/AuthContext";
import Lottie from "lottie-react";
import Storage from "@/lottiesfiles/storage-animation.json";
import Image from "next/image";

export default function DashboardHome() {
  const uploads = [
    { img: "/images/box.png", title: "Empty Boxes", type: "jpeg" },
    { img: "/images/OIP.webp", title: "Oil Painting", type: "jpg" },
    { img: "/images/sample-pdf.png", title: "Resume", type: "pdf" },
  ];
  const { user } = useAuth();
  const lastName = user?.displayName
    ?.split(" ")
    .slice(-1)[0]
    ?.toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="px-[30px] md:px-[40px] lg:px-[60px] pb-[40px] w-full">
      <h1 className="text-[28px] md:text-[35px]">
        Welcome <span className="font-semibold">{lastName}</span> 👋
      </h1>

      {/* storage Used */}
      <div className=" flex flex-col gap-[30px] md:flex-row justify-between">
        <div className="mt-[20px]">
          <p>0.5 GB of storage available</p>

          {/* Upgrade Plan */}
          <div className="mt-[5px] text-[14px]">
            <small>Upgrade your plan to get more Storage</small>
            <button
              className="py-[5px] px-[15px] 
          mt-[5px] bg-[#0000002f] rounded-md block"
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Storage Animation */}
        <div className=" w-full md:w-[300px] rounded-md overflow-hidden">
          <Lottie autoPlay animationData={Storage} />
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="mt-[30px]">
        <h2 className="text-16px font-semibold">Recent Uploads</h2>

        {/* Uploaded Files || mock files */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[20px]">
          {uploads.map(({ img, title, type }) => {
            return (
              <div key={title} className="shadow-md rounded-md overflow-hidden">
                {/* image */}
                <div className="relative h-[100px] w-full">
                  <Image
                    src={img}
                    fill
                    alt="image"
                    className="absolute w-full h-full"
                    objectFit="cover"
                  />
                </div>

                {/* content */}
                <div className="px-[10px] py-[5px] flex flex-col">
                  <p className="text-[12px] ">{title}</p>
                  <small className="text-[10px]">{type}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
