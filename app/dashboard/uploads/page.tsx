import FileUploader from "@/components/FileUploader";
import Image from "next/image";
import { MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";

export default function Uploads() {
  const uploads = [
    { img: "/images/box.png", title: "Empty Boxes", type: "jpeg" },
    { img: "/images/OIP.webp", title: "Oil Painting", type: "jpg" },
    { img: "/images/sample-pdf.png", title: "Resume", type: "pdf" },
    { img: "/images/box.png", title: "Empty Boxes 1", type: "jpeg" },
  ];

  return (
    <div className="relative w-full flex flex-col px-[30px] md:px-[60px] mt-[30px] mb-[50px]">
      <h1 className="text-[30px] font-bold mb-[10px]">Uploads</h1>
      <FileUploader />

      {/* Uploaded Files || mock files */}
      <div className=" gap-[20px] mt-[30px]">
        <h2 className="font-semibold">Recent Uploads</h2>

        {/* Recent Uploads */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[20px] mt-[10px]">
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

                {/* Options */}
                <div className="flex gap-[10px] px-[10px] py-[2px] justify-end">
                  <button className="text-[20px] text-blue-300 cursor-pointer">
                    <MdOutlineFileDownload />{" "}
                  </button>

                  {/* Delete */}
                  <button className="text-[20px] text-red-700 cursor-pointer">
                    <MdDeleteOutline />{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
