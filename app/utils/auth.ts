import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthConfig, Session } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

declare module "next-auth" {
  interface User {
    username: string;
    role: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "username" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = loginSchema.parse(credentials);
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
            username: true,
            hashedPassword: true,
            member: true,
            role: true,
          },
        });

        if (!user) return null;

        if (!(await compare(password, user.hashedPassword))) return null;

        return {
          id: user.id,
          name: user.member.name,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, session }) {
      if (user)
        (token.role = user.role),
          (token.id = user.id),
          (token.username = user.username);
      return token;
    },
    session: (param) => {
      const { session, token } = param as { session: Session; token: JWT };
      if (!session.user) return session;
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.username = token.username as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
