// next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    token: string;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }
}
