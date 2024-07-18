"use client";
import { CustomToast } from "@/app/components/custom-toast";
import Modal from "@/app/components/modal";
import { useStore } from "@/app/store/store";
import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { revalidatePath } from "next/cache";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { getTodayDate } from "@/app/utils/toDate";

type OptionType = {
  value: number;
  label: string;
};

type HotelType = {
  id: number;
  name: string;
};

const CreatePerformance = () => {
  const [soldRooms, setSoldRooms] = useState("");
  const [revenu, setRevenu] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<HotelType>();
  const router = useRouter();

  const toggleToast = useStore((state) => state.toggleToast);

  const session = useSession();

  async function fetchHotels(inputValue: string): Promise<OptionType[]> {
    try {
      const response = await axios.get(
        `http://localhost:3000/hotels/search?term=${inputValue}`,
        {
          headers: {
            Authorization: `Bearer ${session?.data?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // Transform the response data as needed
      const options = response.data.map(
        (item: { name: string; id: number }) => ({
          label: item.name,
          value: item.id,
        })
      );
      //   console.log("options", options);
      return options;
    } catch (error) {
      //   console.error(error);
      return [];
    }
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      //   hotelId: selectedHotel?.id,
      sold_rooms: Number(soldRooms),
      availableRooms: Number(availableRooms),
      revenue: Number(revenu),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/hotels/${selectedHotel?.id}/hotel-performances`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.data?.accessToken}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      console.log("Hotel registered successfully:", data);

      toggleToast("Hotel Registered successfully", "SUCCESS");

      setTimeout(() => {
        router.push("/hotel-performance");
      }, 5000);
      // revalidatePath("/hotels");
    } catch (error) {
      console.error("Failed to register hotel:", error);
    }
  };

  const handleHotelChange = (option: OptionType | null) => {
    if (option !== null) {
      const hotel: HotelType = {
        id: option.value,
        name: option.label,
      };

      setSelectedHotel(hotel);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="py-12 font-medium underline underline-offset-8">
          Record a performace for a hotel
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-3 items-end gap-8 max-w-[800px]">
            <Field>
              <Label className="text-sm/6  text-black">Select a Hotel</Label>
              <AsyncSelect
                cacheOptions
                loadOptions={fetchHotels}
                placeholder="Search for a Product"
                onChange={(option) => handleHotelChange(option)}
              />
            </Field>
            <Field>
              <Label className="text-sm  text-black">Date</Label>
              <Input
                value={getTodayDate()}
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-xs text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/55"
                )}
                disabled={true}
              />
            </Field>
            <div></div>
            <Field>
              <Label className="text-sm  text-black">Available rooms</Label>
              <Input
                onChange={(e) => setAvailableRooms(e.target.value)}
                value={availableRooms}
                placeholder="Available rooms on the date"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-xs text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/55"
                )}
              />
            </Field>
            <Field>
              <Label className="text-sm  text-black">Sold rooms</Label>
              <Input
                onChange={(e) => setSoldRooms(e.target.value)}
                value={soldRooms}
                placeholder="Sold rooms on the date"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-xs text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/55"
                )}
              />
            </Field>
            <Field>
              <Label className="text-sm text-black">Revenue</Label>
              <Input
                onChange={(e) => setRevenu(e.target.value)}
                value={revenu}
                placeholder="Revenue on the date"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-xs text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/55"
                )}
                // disabled={true}
              />
            </Field>
            <div></div>
            <div></div>
            <Button
              type="submit"
              className="p-2 text-xs bg-primary text-white rounded-md"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <CustomToast />
    </>
  );
};
export default CreatePerformance;
