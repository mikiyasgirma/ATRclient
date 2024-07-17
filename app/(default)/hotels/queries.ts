// import { auth } from "@/auth";
import axios from "axios";

export default async function getHotels() {
  //   const session = await auth();

  try {
    const data = await axios.get("http://localhost:3000/hotels", {
      headers: {},
    });
  } catch {}
}
