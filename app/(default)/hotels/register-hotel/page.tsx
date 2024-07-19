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

const RegisterHotel = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const router = useRouter();

  const toggleToast = useStore((state) => state.toggleToast);

  const session = useSession();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      location,
      rooms: Number(numberOfRooms),
      userId: session.data?.user.id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/hotels`,
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Hotel registered successfully:", data);

      toggleToast("Hotel Registered successfully", "SUCCESS");

      setTimeout(() => {
        router.push("/hotels");
      }, 5000);
      revalidatePath("/hotels");
    } catch (error) {
      console.error("Failed to register hotel:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="py-12 font-medium underline underline-offset-8">
          Register a hotel
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-12 max-w-[600px]">
            <Field>
              <Label className="text-sm/6  text-black">Name</Label>
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Hotel Name"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-xs text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/55"
                )}
              />
            </Field>
            <Field>
              <Label className="text-sm/6  text-black">Region</Label>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                placeholder="Region"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-xs text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/55"
                )}
              />
            </Field>
            <Field>
              <Label className="text-sm/6  text-black">Numbre of rooms</Label>
              <Input
                onChange={(e) => setNumberOfRooms(e.target.value)}
                value={numberOfRooms}
                placeholder="Number of rooms"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-xs text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/55"
                )}
              />
            </Field>
            <Field>
              <Label className="text-sm/6 text-black">User email</Label>
              <Input
                //   value={session.data?.user.id}
                placeholder={session.data?.user.email}
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-xs text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/55"
                )}
                disabled={true}
              />
            </Field>
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
export default RegisterHotel;
