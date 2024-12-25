// @ts-nocheck
'use server'



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
      wallet: result === 'win' ? user.wallet + 0.5 : user.wallet
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
