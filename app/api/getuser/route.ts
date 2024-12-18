// @ts-nocheck

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";
// import prisma from "../../../lib/prisma";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }else {
//     // Reject other HTTP methods
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   const session = await getServerSession(req, res, authOptions);
//   console.log("Session:", session);

//   if (!session?.user?.id) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       select: { chancesLeft: true, xoWins: true, points: true },
//     });

//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Prisma Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }




// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";
// import prisma from "../../../lib/prisma";
// import { NextResponse } from 'next/server';

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions);
// //   console.log("Session:", session);

//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       select: {
//         name: true,
//         email: true,
//         image: true,
//         username: true,
//         batteryLevel: true,
//         points: true,
//         wallet: true,
//         referrerId: true,
//         refs: true,
//         chancesLeft: true,
//         xoWins: true,
//         referralCode: true,
//       },
//     });

//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("Prisma Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }









import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "../../../lib/authOptions";
import prisma from "../../../lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        image: true,
        username: true,
        batteryLevel: true,
        points: true,
        wallet: true,
        referrerId: true,
        refs: true,
        chancesLeft: true,
        xoWins: true,
        referralCode: true,
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Prisma Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
