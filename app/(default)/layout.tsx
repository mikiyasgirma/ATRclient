import "./../globals.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
// import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "../auth";
import { CustomToast } from "../components/custom-toast";

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
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="p-12 grow bg-background">{children}</div>
          </div>
          <div className="">{/* <Footer /> */}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
