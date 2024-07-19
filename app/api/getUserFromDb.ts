import axios from "axios";

export async function getUserFromDb(email: string, password: string) {
  console.log(email, password);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        email,
        password,
      }
    );
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
