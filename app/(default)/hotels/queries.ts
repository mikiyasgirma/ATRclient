import axios from "axios";

const fetchHotels = async (accessToken: string | undefined) => {
  // const session = await auth();

  try {
    const res = await axios.get("http://localhost:3000/hotels", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Error fetching hotels");
  }
};
export default fetchHotels;
