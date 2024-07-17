// "use client";
import HotelCard from "@/app/components/hotelCard";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import getHotels from "./queries";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@/app/auth";
import { FaHotel } from "react-icons/fa";
import Link from "next/link";

async function getData() {
  const session = await auth();

  const res = await fetch("http://localhost:3000/hotels", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Hotels = async () => {
  const hotels = await getData();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/hotels/register-hotel">
          <Button className="p-2 text-xs bg-primary text-white rounded-md">
            Register New Hotel
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {hotels.map((hotel: any) => {
          return <HotelCard key={hotel.id} name={hotel.name} />;
        })}
      </div>
    </div>
  );
};
export default Hotels;
