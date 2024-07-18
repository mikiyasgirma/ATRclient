"use client";
import HotelCard from "@/app/components/hotelCard";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchHotels } from "./queries";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@/app/auth";
import { FaHotel } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import fetchHotels from "./queries";

const Hotels = () => {
  const session = useSession();

  const {
    data: hotels,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchHotels(session?.data?.accessToken),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading hotels {error.message}</div>;

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
        {hotels?.map((hotel: any) => {
          return (
            <Link href={`/hotels/${hotel.id}`}>
              <HotelCard key={hotel.id} name={hotel.name} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Hotels;
