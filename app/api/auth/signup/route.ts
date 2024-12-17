// import { NextResponse } from "next/server"
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcrypt"


// const prisma = new PrismaClient()

// function generateReferralCode(length = 8) {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
//   }


// export async function POST(req: Request) {
//     const referralCode = generateReferralCode();
//   const { name, email, password, username } = await req.json()

//   if (!name || !email || !password || !username) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 })
//   }

//   const existingUser = await prisma.user.findFirst({
//     where: {
//       OR: [
//         { email },
//         { username }
//       ]
//     },
//   })

//   if (existingUser) {
//     return NextResponse.json({ error: "Email or username already exists" }, { status: 400 })
//   }

//   const hashedPassword = await bcrypt.hash(password, 10)

//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       username,
//       password: hashedPassword,
//       referralCode,
//     },
//   })

//   return NextResponse.json({ message: "User created successfully" }, { status: 201 })
// }





// import { NextResponse } from "next/server"
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcrypt"

// const prisma = new PrismaClient()

// // Function to generate a random 8-character referral code
// function generateReferralCode(length = 8) {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
// }

// // POST request handler for user creation
// export async function POST(req: Request) {
//     const { name, email, password, username } = await req.json()

//     // Check for missing fields
//     if (!name || !email || !password || !username) {
//         return NextResponse.json({ error: "Missing fields" }, { status: 400 })
//     }

//     // Check if user already exists
//     const existingUser = await prisma.user.findFirst({
//         where: {
//             OR: [
//                 { email },
//                 { username }
//             ]
//         },
//     })

//     if (existingUser) {
//         return NextResponse.json({ error: "Email or username already exists" }, { status: 400 })
//     }



//     // Generate a unique referral code
//     let referralCode;
//     let isUnique = false;

//     while (!isUnique) {
//         referralCode = generateReferralCode(); // Generate a new referral code
//         try {
//             // Try to create the user
//             const user = await prisma.user.create({
//                 data: {
//                     name,
//                     email,
//                     username,
//                     password: await bcrypt.hash(password, 10), // Hash the password
//                     referralCode, // Add the generated referral code
//                 },
//             })
//             isUnique = true; // Break the loop if user is created successfully
//             return NextResponse.json({ message: "User created successfully", user }, { status: 201 })
//         } catch (error) {
//             // If the referral code already exists, it will throw a P2002 error
//             if (error.code === 'P2002') {
//                 console.warn('Duplicate referral code generated. Retrying...');
//             } else {
//                 console.error('Error creating user:', error)
//                 return NextResponse.json({ error: "Error creating user" }, { status: 500 })
//             }
//         }
//     }
// }









// import { NextResponse } from "next/server"
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcrypt"

// const prisma = new PrismaClient()

// // Function to generate a random 8-character referral code
// function generateReferralCode(length = 8) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

// // POST request handler for user creation
// export async function POST(req: Request) {
//   const { name, email, password, username, ref } = await req.json()

//   // Check for missing fields
//   if (!name || !email || !password || !username) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 })
//   }

//   // Check if user already exists
//   const existingUser = await prisma.user.findFirst({
//     where: {
//       OR: [
//         { email },
//         { username }
//       ]
//     },
//   })

//   if (existingUser) {
//     return NextResponse.json({ error: "Email or username already exists" }, { status: 400 })
//   }

//   // Generate a unique referral code for the new user
//   let referralCode;
//   let isUnique = false;

//   // Ensure the generated referral code is unique
//   while (!isUnique) {
//     referralCode = generateReferralCode(); // Generate a new referral code
//     const existingReferralCode = await prisma.user.findUnique({
//       where: { referralCode },
//     })
//     if (!existingReferralCode) {
//       isUnique = true; // Unique referral code
//     }
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10)

//   // Handle referrer if the `ref` code is passed
//   let referrerId = null;
//   if (ref) {
//     const referrer = await prisma.user.findUnique({
//       where: { referralCode: ref },
//     })
//     if (referrer) {
//       referrerId = referrer.id
//     } else {
//       return NextResponse.json({ error: "Invalid referral code" }, { status: 400 })
//     }
//   }

//   // Create the user in the database
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         username,
//         password: hashedPassword,
//         referralCode, // Assign the generated referral code
//         referrerId, // Link the referrer if provided
//       },
//     })

//     // Update the referrer's referral count (refs)
//     if (referrerId) {
//       await prisma.user.update({
//         where: { id: referrerId },
//         data: { refs: { increment: 1 } },
//       })
//     }

//     return NextResponse.json({ message: "User created successfully", user }, { status: 201 })
//   } catch (error) {
//     console.error("Error creating user:", error)
//     return NextResponse.json({ error: "Error creating user" }, { status: 500 })
//   }
// }











import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Function to generate a random 8-character referral code
function generateReferralCode(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// POST request handler for user creation
export async function POST(req: Request) {
  const { name, email, password, username, ref } = await req.json();

  // Check for missing fields
  if (!name || !email || !password || !username) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: "Email or username already exists" }, { status: 400 });
  }

  // Generate a unique referral code for the new user
  let referralCode;
  let isUnique = false;

  // Ensure the generated referral code is unique
  while (!isUnique) {
    referralCode = generateReferralCode();
    const existingReferralCode = await prisma.user.findUnique({
      where: { referralCode },
    });
    if (!existingReferralCode) {
      isUnique = true;
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Handle referrer if the `ref` code is passed
  let referrer = null; // Hold the referrer record if it exists
  if (ref) {
    referrer = await prisma.user.findUnique({
      where: { referralCode: ref },
    });
    if (!referrer) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 400 });
    }
  }

  // Create the user in the database
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        referralCode, // Assign the generated referral code
        referrerId: referrer ? referrer.id : null, // Link the referrer if provided
      },
    });

    // Update the referrer's referral count (refs) and Referral table
    if (referrer) {
      // Increment the referrer's referral count
      await prisma.user.update({
        where: { id: referrer.id },
        data: { refs: { increment: 1 } },
      });

      // Add an entry to the Referral table
      await prisma.referral.create({
        data: {
          referredById: referrer.id,       // Referrer's ID
          referredUserId: user.id,        // New user's ID
          referredUserName: user.username, // New user's username
          referredUserImage: user.image,   // Optional: New user's image
        },
      });
    }

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
