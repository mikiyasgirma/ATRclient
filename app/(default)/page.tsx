import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return <div>Hello {JSON.stringify(session, null, 2)} </div>;
}
