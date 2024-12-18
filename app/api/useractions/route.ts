// @ts-nocheck
'use server'

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();


// export async function updateUserAfterGame(userId: string, gameResult: 'win' | 'lose' | 'draw') {
//   const user = await prisma.user.findUnique({ where: { id: userId } })
//   if (!user) throw new Error('User not found')

//   let updatedChances = gameResult === 'draw' ? user.chancesLeft : user.chancesLeft - 1
//   let updatedBatteryLevel = updatedChances >= 3 ? 100 : updatedChances * 30
//   let updatedPoints = user.points
//   let updatedXoWins = user.xoWins
//   let updatedWallet = user.wallet

//   if (gameResult === 'win') {
//     updatedPoints += 100
//     updatedXoWins += 1
//     updatedWallet += 0.1 // Add $0.10 to the wallet for each win
//   }

//   try {
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         chancesLeft: updatedChances,
//         batteryLevel: updatedBatteryLevel,
//         points: updatedPoints,
//         xoWins: updatedXoWins,
//         wallet: updatedWallet,
//       },
//     })

//     return {
//       chancesLeft: updatedUser.chancesLeft,
//       batteryLevel: updatedUser.batteryLevel,
//       points: updatedUser.points,
//       xoWins: updatedUser.xoWins,
//       wallet: updatedUser.wallet,
//     }
//   } catch (error) {
//     console.error('Error updating user after game:', error)
//     throw new Error('Failed to update user data')
//   }
// }

// export async function addReferral(userId: string, referredUserId: string, referredUserName: string, referredUserImage?: string) {
//   try {
//     const user = await prisma.user.findUnique({ where: { id: userId } })
//     if (!user) throw new Error('User not found')

//     await prisma.referral.create({
//       data: {
//         referredById: userId,
//         referredUserId,
//         referredUserName,
//         referredUserImage,
//       },
//     })

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         refs: { increment: 1 },
//         chancesLeft: { increment: 5 },
//         batteryLevel: 100,
//       },
//     })

//     return {
//       refs: updatedUser.refs,
//       chancesLeft: updatedUser.chancesLeft,
//       batteryLevel: updatedUser.batteryLevel,
//     }
//   } catch (error) {
//     console.error('Error adding referral:', error)
//     throw new Error('Failed to add referral')
//   }
// }




// import prisma from "../../lib/prisma";


// export async function updateUserAfterGame(userId: string, gameResult: 'win' | 'lose' | 'draw') {
//   try {
//     const user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) throw new Error('User not found');

//     let updatedChances = gameResult === 'draw' ? user.chancesLeft : user.chancesLeft - 1;
//     let updatedBatteryLevel = updatedChances >= 3 ? 100 : updatedChances * 30;
//     let updatedPoints = user.points;
//     let updatedXoWins = user.xoWins;
//     let updatedWallet = user.wallet;

//     if (gameResult === 'win') {
//       updatedPoints += 100;
//       updatedXoWins += 1;
//       updatedWallet += 0.1;
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         chancesLeft: updatedChances,
//         batteryLevel: updatedBatteryLevel,
//         points: updatedPoints,
//         xoWins: updatedXoWins,
//         wallet: updatedWallet,
//       },
//     });

//     return {
//       chancesLeft: updatedUser.chancesLeft,
//       batteryLevel: updatedUser.batteryLevel,
//       points: updatedUser.points,
//       xoWins: updatedUser.xoWins,
//       wallet: updatedUser.wallet,
//     };
//   } catch (error) {
//     console.error('Error updating user after game:', error);
//     throw new Error('Failed to update user data');
//   } finally {
//     await prisma.$disconnect();
//   }
// }









// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";
// import prisma from "../../../lib/prisma";
// import { NextResponse } from 'next/server';

// export async function POST(req: Request, res: Response) {
// //   if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

//   const session = await getServerSession(authOptions);

//    if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// }

//   const { result } = req.body; // 'win', 'lose', or 'draw'

//   const user = await prisma.user.findUnique({
//     where: { id: session.user.id },
//     select: { chancesLeft: true, points: true, xoWins: true }
//   });

//   if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
//   if (user.chancesLeft <= 0) return NextResponse.json({ error: "No chances left" }, { status: 400 });

//   // Update stats based on game result
//   const updates = {
//     chancesLeft: user.chancesLeft - 1,
//     ...(result === "win" && { xoWins: user.xoWins + 1, points: user.points + 10 }), // Add 10 points for a win
//     ...(result === "lose" && { points: user.points + 2 }), // Add 2 points for participation
//     ...(result === "draw" && { points: user.points + 5 }) // Add 5 points for a draw
//   };

//   const updatedUser = await prisma.user.update({
//     where: { id: session.user.id },
//     data: updates
//   });

//   NextResponse.json({ message: "Game stats updated", user: updatedUser }, { status: 200 });
// }





// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";
// import prisma from "../../../lib/prisma";
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     const { result } = body;

//     if (!result || !['win', 'lose', 'draw'].includes(result)) {
//       return NextResponse.json({ error: "Invalid game result" }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       select: { chancesLeft: true, points: true, xoWins: true, batteryLevel: true, wallet: true }
//     });

//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
//     if (user.chancesLeft <= 0) return NextResponse.json({ error: "No chances left" }, { status: 400 });

//     // Update stats based on game result
//     const updates = {
//       chancesLeft: result === 'draw' ? user.chancesLeft : user.chancesLeft - 1,
//       batteryLevel: user.chancesLeft >= 3 ? 100 : (user.chancesLeft - 1) * 30,
//       points: user.points + (result === 'win' ? 100 : result === 'draw' ? 5 : 2),
//       xoWins: result === 'win' ? user.xoWins + 1 : user.xoWins,
//       wallet: result === 'win' ? user.wallet + 0.1 : user.wallet
//     };

//     const updatedUser = await prisma.user.update({
//       where: { id: session.user.id },
//       data: updates
//     });

//     return NextResponse.json({
//       message: "Game stats updated",
//       user: {
//         chancesLeft: updatedUser.chancesLeft,
//         batteryLevel: updatedUser.batteryLevel,
//         points: updatedUser.points,
//         xoWins: updatedUser.xoWins,
//         wallet: updatedUser.wallet
//       }
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating user after game:', error);
//     return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }











import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";
import prisma from "../../../lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { result } = body;

    if (!result || !['win', 'lose', 'draw'].includes(result)) {
      return NextResponse.json({ error: "Invalid game result" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { chancesLeft: true, points: true, xoWins: true, batteryLevel: true, wallet: true }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.chancesLeft <= 0) return NextResponse.json({ error: "No chances left" }, { status: 400 });

    // Update stats based on game result
    const updates = {
      chancesLeft: result === 'draw' ? user.chancesLeft : user.chancesLeft - 1,
      batteryLevel: user.chancesLeft >= 3 ? 100 : (user.chancesLeft - 1) * 30,
      points: user.points + (result === 'win' ? 100 : result === 'draw' ? 5 : 2),
      xoWins: result === 'win' ? user.xoWins + 1 : user.xoWins,
      wallet: result === 'win' ? user.wallet + 0.1 : user.wallet
    };

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updates
    });

    return NextResponse.json({
      message: "Game stats updated",
      user: {
        chancesLeft: updatedUser.chancesLeft,
        batteryLevel: updatedUser.batteryLevel,
        points: updatedUser.points,
        xoWins: updatedUser.xoWins,
        wallet: updatedUser.wallet
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating user after game:', error);
    return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
