"use client";

import { signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className="h-12 w-full flex-col justify-center px-10 shadow-lg bg-white">
      <div className="flex space-x-4 justify-between items-center h-full">
        <div className="text-primary text-xl underline underline-offset-4 font-semibold">
          ATR
        </div>
        <div className="flex space-x-4 justify-end items-center h-full">
          <div className="flex space-x-4">
            <div className="w-[1px] h-5 bg-gray-500"></div>
            <div className="font-semibold text-sm">
              <span className="text-gray-700 opacity-50">Hello,</span> Daniel
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
            }}
            className="text-xs text-primary underline underline-offset-4"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
