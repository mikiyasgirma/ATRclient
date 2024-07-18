import axios from "axios";

export const fetchHotels = async (accessToken: string | undefined) => {
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

export const fetchHotelOccupancyRate = async (
  accessToken: string | undefined,
  id: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/hotels/${id}/occupancy-rate`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Error fetching hotels");
  }
};

export const fetchHotelOccupancyADR = async (
  accessToken: string | undefined,
  id: string
) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/hotels/${id}/adr`, {
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

export const fetchHotelRevpar = async (
  accessToken: string | undefined,
  id: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/hotels/${id}/revpar`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Error fetching hotels");
  }
};

export const fetchHotelRanking = async (
  accessToken: string | undefined,
  id: string
) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/hotels/${id}/rankings`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Error fetching hotels");
  }
};

// export default {
//   fetchHotels,
//   fetchHotelOccupancyADR,
//   fetchHotelOccupancyRate,
//   fetchHotelRanking,
//   fetchHotelRevpar,
// };
