"use client";

import { signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className="h-20 w-full flex-col justify-center px-10 shadow-lg bg-primary">
      <div className="flex space-x-4 justify-between items-center h-full">
        <div className="text-black text-4xl underline underline-offset-8 font-semibold">
          ATR
        </div>
        <div className="flex space-x-4 justify-end items-center h-full">
          <div className="flex space-x-4">
            <div className="w-[1px] h-5 bg-gray-500"></div>
            <div className="font-semibold text-default">
              <span className="text-gray-700 opacity-50">Hello,</span> Daniel
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
            }}
            className="text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
