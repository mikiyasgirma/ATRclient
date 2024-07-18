import "./../globals.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { redirect } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "../auth";
import QueryClientProvider from "../components/QueryClientProvider";

const queryClient = new QueryClient();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect("/login");

  console.log("session", session);

  return (
    <html lang="en">
      <body className="max-h-screen overflow-hidden">
        <SessionProvider session={session}>
          <QueryClientProvider>
            <Header />
            <div className="flex">
              <Sidebar />
              <div className="p-12 grow bg-background">{children}</div>
            </div>
            <div className="">{/* <Footer /> */}</div>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
