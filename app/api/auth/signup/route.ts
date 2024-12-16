import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"


const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, email, password, username } = await req.json()

  if (!name || !email || !password || !username) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    },
  })

  if (existingUser) {
    return NextResponse.json({ error: "Email or username already exists" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ message: "User created successfully" }, { status: 201 })
}
