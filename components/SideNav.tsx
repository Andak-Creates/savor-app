"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { FaHome } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";
import { LiaFileSolid } from "react-icons/lia";
import { MdOutlineSettings } from "react-icons/md";
import { FiSidebar } from "react-icons/fi";

const navLinks = [
  { href: "/dashboard", label: "Home", icon: <FaHome size={20} /> },
  {
    href: "/dashboard/uploads",
    label: "Uploads",
    icon: <PiUploadSimpleBold size={20} />,
  },
  {
    href: "/dashboard/files",
    label: "Files",
    icon: <LiaFileSolid size={20} />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <MdOutlineSettings size={20} />,
  },
];

const SideNav = () => {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  // On first mount, check screen width and set default sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavOpen(true); // md and up = open
      } else {
        setIsNavOpen(false); // mobile = closed
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => {
    if (window.innerWidth >= 768) {
      return;
    } else {
      setIsNavOpen(false);
    }
  };

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 flex flex-col items-start pt-[60px] md:pt-[65px] px-3 z-50",
        isNavOpen ? "w-[180px]" : "w-[60px]"
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleNav}
        className="mb-6 px-[5px]  md:hidden hover:bg-gray-100 rounded-md self-start"
      >
        <FiSidebar size={22} />
      </button>

      {/* Nav Links */}
      <nav className="flex flex-col gap-4 w-full ">
        {navLinks.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={closeNav}
              className={clsx(
                "flex items-center gap-3 p-2 rounded-md transition-colors duration-200",
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100",
                isNavOpen ? "justify-start pl-3" : "justify-center"
              )}
            >
              {icon}
              {isNavOpen && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideNav;
