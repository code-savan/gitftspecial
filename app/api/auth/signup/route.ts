





// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import prisma from "../../../../lib/prisma";



// // Function to generate a random 8-character referral code
// function generateReferralCode(length = 8) {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

// // POST request handler for user creation
// export async function POST(req: Request) {
//   const { name, email, password, username, ref } = await req.json();

//   // Check for missing fields
//   if (!name || !email || !password || !username) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   // Check if user already exists
//   const existingUser = await prisma.user.findFirst({
//     where: {
//       OR: [{ email }, { username }],
//     },
//   });

//   if (existingUser) {
//     return NextResponse.json({ error: "Email or username already exists" }, { status: 400 });
//   }

//   // Generate a unique referral code for the new user
//   let referralCode;
//   let isUnique = false;

//   // Ensure the generated referral code is unique
//   while (!isUnique) {
//     referralCode = generateReferralCode();
//     const existingReferralCode = await prisma.user.findUnique({
//       where: { referralCode },
//     });
//     if (!existingReferralCode) {
//       isUnique = true;
//     }
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Handle referrer if the `ref` code is passed
//   let referrer = null; // Hold the referrer record if it exists
//   if (ref) {
//     referrer = await prisma.user.findUnique({
//       where: { referralCode: ref },
//     });
//     if (!referrer) {
//       return NextResponse.json({ error: "Invalid referral code" }, { status: 400 });
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
//         referrerId: referrer ? referrer.id : null, // Link the referrer if provided
//       },
//     });

//     // Update the referrer's referral count (refs) and Referral table
//     if (referrer) {
//       // Increment the referrer's referral count
//       await prisma.user.update({
//         where: { id: referrer.id },
//         data: { refs: { increment: 1 } },
//       });

//       // Add an entry to the Referral table
//       await prisma.referral.create({
//         data: {
//           referredById: referrer.id,       // Referrer's ID
//           referredUserId: user.id,        // New user's ID
//           referredUserName: user.username, // New user's username
//           referredUserImage: user.image,   // Optional: New user's image
//         },
//       });
//     }

//     return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return NextResponse.json({ error: "Error creating user" }, { status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import prisma from "../../../../lib/prisma";

// // Function to generate a random 8-character referral code
// function generateReferralCode(length = 8) {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

// // POST request handler for user creation
// export async function POST(req: Request) {
//   const { email, password, ref } = await req.json();

//   // Check for missing fields
//   if (!email || !password ) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   // Check if user already exists
//   const existingUser = await prisma.user.findFirst({
//     where: {
//       OR: [{ email }],
//     },
//   });

//   if (existingUser) {
//     return NextResponse.json({ error: "Account already exists" }, { status: 400 });
//   }

//   // Generate a unique referral code for the new user
//   let referralCode;
//   let isUnique = false;

//   // Ensure the generated referral code is unique
//   while (!isUnique) {
//     referralCode = generateReferralCode();
//     const existingReferralCode = await prisma.user.findUnique({
//       where: { referralCode },
//     });
//     if (!existingReferralCode) {
//       isUnique = true;
//     }
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Handle referrer if the `ref` code is passed
//   let referrer = null; // Hold the referrer record if it exists
//   if (ref) {
//     referrer = await prisma.user.findUnique({
//       where: { referralCode: ref },
//     });
//     if (!referrer) {
//       return NextResponse.json({ error: "Invalid referral code" }, { status: 400 });
//     }
//   }

//   // Create the user in the database
//   try {
//     const user = await prisma.user.create({
//       data: {
//         email,
//         // username,
//         image: "https://i.postimg.cc/x1pw82bv/user.jpg",
//         password: hashedPassword,
//         referralCode, // Assign the generated referral code
//         referrerId: referrer ? referrer.id : null, // Link the referrer if provided
//       },
//     });

//     // Update the referrer's referral count (refs) and Referral table
//     if (referrer) {
//       // Increment the referrer's referral count
//       await prisma.user.update({
//         where: { id: referrer.id },
//         data: { refs: { increment: 1 },  chancesLeft: { increment: 5 }, batteryLevel: 100,},
//       });

//       // Add an entry to the Referral table
//       await prisma.referral.create({
//         data: {
//           referredById: referrer.id,       // Referrer's ID
//           referredUserId: user.id,        // New user's ID
//           referredUserName: user.username ?? "Anonymous", // New user's username
//           referredUserImage: user.image ?? "https://i.postimg.cc/x1pw82bv/user.jpg",   // Optional: New user's image
//         },
//       });
//     }

//     return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return NextResponse.json({ error: "Error creating user" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

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
  try {
    const { email, password, ref } = await req.json();

    // Check for missing fields
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });

  if (existingUser) {
    return NextResponse.json({ error: "Account already exists" }, { status: 400 });
  }

  // Generate the next username in the sequence
  let username;
  try {
    const latestUser = await prisma.user.findFirst({
      where: { username: { startsWith: "user" } }, // Filter for usernames starting with "user"
      orderBy: { username: "desc" }, // Order by descending username
    });

    if (latestUser && latestUser.username) {
      const lastNumber = parseInt(latestUser.username.replace("user", ""), 10) || 99; // Extract the number
      username = `user${lastNumber + 1}`; // Increment the number
    } else {
      username = "user100"; // Start from user100 if no users exist
    }
  } catch (error) {
    console.error("Error generating username:", error);
    return NextResponse.json({ error: "Error generating username" }, { status: 500 });
  }

  // Generate a unique referral code for the new user
  let referralCode;
  let isUnique = false;

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
  let referrer = null;
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
        email,
        username,
        image: "https://i.postimg.cc/x1pw82bv/user.jpg",
        password: hashedPassword,
        referralCode,
        referrerId: referrer ? referrer.id : null,
      },
    });

    // Update the referrer's referral count and Referral table
    if (referrer) {
      await prisma.user.update({
        where: { id: referrer.id },
        data: {
          refs: { increment: 1 },
          chancesLeft: { increment: 5 },
          batteryLevel: 100,
        },
      });

      await prisma.referral.create({
        data: {
          referredById: referrer.id,
          referredUserId: user.id,
          referredUserName: user.username ?? "Anonymous",
          referredUserImage: user.image,
        },
      });
    }

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({
      error: "Database connection failed. Please check your database configuration."
    }, { status: 500 });
  }
}
