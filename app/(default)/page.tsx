import { auth } from "../auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log("sesssion", session);

  return <div>Hello {JSON.stringify(session)} </div>;
}
