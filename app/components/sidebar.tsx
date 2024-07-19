"use client";

import { MdOutlineDashboard } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const linkClasses = (path: string) => {
    return pathname === path
      ? "pl-5 pt-3 flex items-center space-x-1 text-green-400"
      : "pl-5 pt-3 flex items-center space-x-1 text-white";
  };

  return (
    <div className="sidebar px-4 py-2 min-w-[279px] h-screen ">
      <div className="mt-7 text-[14px]">
        <div className="uppercase text-white opacity-50 font-semibold">
          Overview
        </div>
        <Link href="/">
          <div className={linkClasses("/")}>
            <MdOutlineDashboard color="#ffffff" />
            <div>Dashboard</div>
          </div>
        </Link>
        <Link href="/hotels">
          <div className={linkClasses("/hotels")}>
            <FaHotel color="#ffffff" />
            <div>Hotels</div>
          </div>
        </Link>
        <Link href="/hotel-performance">
          <div className={linkClasses("/hotel-performance")}>
            <IoAnalytics color="#ffffff" />
            <div>Hotels performances</div>
          </div>
        </Link>
        <div className="pt-4 uppercase text-white opacity-50 font-semibold">
          Actions
        </div>
        <div className="pl-5 pt-3 flex items-center space-x-1">
          <MdOutlineDashboard color="#ffffff" />
          <div className="text-white">Register Hotel</div>
        </div>
        <div className="pl-5 pt-3 flex items-center space-x-1">
          <MdOutlineDashboard color="#ffffff" />
          <div className="text-white">Record performance</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
