import axios from "axios";

export async function getUserFromDb(email: string, password: string) {
  console.log(email, password);
  try {
    const response = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
