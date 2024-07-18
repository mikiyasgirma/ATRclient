import { MdOutlineDashboard } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { CiDollar } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="sidebar px-4 py-2 w-[279px] h-screen">
      <div className="mt-7 text-[14px]  ">
        <div className="uppercase  text-white opacity-50 font-semibold">
          Overview
        </div>
        <Link href="/">
          <div className="pl-5 pt-3 flex items-center space-x-1">
            <MdOutlineDashboard color="#ffffff" />
            <div className="  text-white">Dashboard</div>
          </div>
        </Link>
        <Link href="/hotels">
          <div className="pl-5 pt-3 flex items-center space-x-1">
            <FaHotel color="#ffffff" />
            <div className=" text-white">Hotels</div>
          </div>
        </Link>
        <Link href="/hotel-performance/create-performance">
          <div className="pl-5 pt-3 flex items-center space-x-1">
            <IoAnalytics color="#ffffff" />
            <div className=" text-white">Hotels performances</div>
          </div>
        </Link>
        <div className="pt-4  uppercase text-white  opacity-50 font-semibold">
          Actions
        </div>
        <div className="pl-5 pt-3 flex items-center space-x-1">
          <MdOutlineDashboard color="#ffffff" />
          <div className="  text-white">Register Hotel</div>
        </div>
        <div className="pl-5 pt-3 flex items-center space-x-1">
          <MdOutlineDashboard color="#ffffff" />
          <div className="  text-white">Record performance</div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
