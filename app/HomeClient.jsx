"use client";

import Link from "next/link";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";

export default function HomeClient({ session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 500); // 1 second (1000ms)

    return () => clearTimeout(timer); // Clean up the timer
  }, []);


  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold">CASHXO</h1>
      {session ? (
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-4">Welcome, {session.user?.name}</p>
          <Link href="/dashboard" className="text-blue-500 hover:underline mb-2">
            Go to Dashboard
          </Link>
          <Link href="/api/auth/signout" className="text-red-500 hover:underline">
            Sign out
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
          <Link href="/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Modal
          </button>
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              ctaText="Claim My Bonus"
              ctaLink="/signup"
              backgroundImage="/bg1.gif"
            >
              <div className="text-center space-y-4">
                <h2 className="text-[20px] md:text-[30px] font-bold mt-2 text-gray-100">Register Now and Get <span className="font-extrabold text-white">$2</span> Free Bonus Instantly!</h2>
                {/* <p className="text-lg opacity-90">
                  Available after the first download of the app
                </p> */}
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
