// "use client"

// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../lib/authOptions"
// import Link from "next/link"
// import Modal from "./../components/Modal"
// import { useState } from "react"

// export default async function Home() {
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const session = await getServerSession(authOptions)

//   return (
//     <main className="flex min-h-screen items-center justify-between p-24 border w-full">
//       <h1 className="text-4xl font-bold">CASHXO</h1>
//       {session ? (
//         <div className="flex flex-col items-center">
//           <p className="text-2xl mb-4">Welcome, {session.user?.name}</p>
//           <Link href="/dashboard" className="text-blue-500 hover:underline mb-2">Go to Dashboard</Link>
//           <Link href="/api/auth/signout" className="text-red-500 hover:underline">Sign out</Link>
//         </div>
//       ) : (
//         <div className="flex gap-4">
//           <Link href="/signin" className="text-blue-500 hover:underline">Sign in</Link>
//           <Link href="/signup" className="text-green-500 hover:underline">Sign up</Link>
//           <button onClick={() => setIsModalOpen(true)}>
//         Open Modal
//       </button>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         ctaText="Get ₦ 1000"
//         ctaLink="/register"
//         backgroundImage="/path-to-your-background.jpg"
//       >
//         <div className="text-center space-y-4">
//           <h2 className="text-4xl font-bold">
//             Register to get ₦ 1000 bonus
//           </h2>
//           <p className="text-lg opacity-90">
//             Available after first download of the app
//           </p>
//         </div>
//       </Modal>
//         </div>
//       )}
//     </main>
//   )
// }



import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";
import HomeClient from "./HomeClient";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen items-center justify-between p-24 border w-full">
      <HomeClient session={session} />
    </main>
  );
}
