import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

// Extend the built-in types
import { DefaultSession, User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      username?: string | null;
    //   batteryLevel?: number;
    //   points?: number;
    //   wallet?: number;
    //   chancesLeft?: number;
    //   refs?: number;
    //   xoWins?: number;
      role: string;
    } & DefaultSession["user"];
  }
}

interface CustomUser extends NextAuthUser {
  username?: string | null;
//   batteryLevel?: number;
//   points?: number;
//   wallet?: number;
//   chancesLeft?: number;
//   refs?: number;
//   xoWins?: number;
  role: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
        //   email: user.email,
        //   name: user.name,
        //   batteryLevel: user.batteryLevel,
        //   points: user.points,
        //   wallet: user.wallet,
        //   chancesLeft: user.chancesLeft,
        //   refs: user.refs,
        //   xoWins: user.xoWins,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid as string;
        session.user.username = token.username as string | null;
        // session.user.batteryLevel = token.batteryLevel as number;
        // session.user.points = token.points as number;
        // session.user.wallet = token.wallet as number;
        // session.user.chancesLeft = token.chancesLeft as number;
        // session.user.refs = token.refs as number;
        // session.user.xoWins = token.xoWins as number;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.username = (user as CustomUser).username;
        // token.batteryLevel = (user as CustomUser).batteryLevel;
        // token.points = (user as CustomUser).points;
        // token.wallet = (user as CustomUser).wallet;
        // token.chancesLeft = (user as CustomUser).chancesLeft;
        // token.refs = (user as CustomUser).refs;
        //   token.xoWins = (user as CustomUser).xoWins;
          token.role = (user as CustomUser).role;
      }
      return token;
    },
    async signIn({ user }) {
      return !!user;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
};
