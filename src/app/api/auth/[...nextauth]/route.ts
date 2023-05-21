import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, _ }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
        select: { email: true, id: true, name: true },
      });
      return { ...session, user };
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //      const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        //      return user;
        if (
          (credentials?.email.length as number) > 2 &&
          (credentials?.password.length as number) > 2
        ) {
          const user = await prisma?.user.upsert({
            where: { email: credentials?.email },
            update: {},
            create: {
              email: credentials?.email as string,
              password: credentials?.password as string,
            },
          });
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
