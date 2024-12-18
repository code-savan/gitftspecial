'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface UserData {
  name: string | null;
  email: string | null;
  image: string | null;
  username: string | null;
  batteryLevel: number;
  points: number;
  wallet: number;
  referrerId: string | null;
  refs: number;
  chancesLeft: number;
  xoWins: number;
  referralCode: string | null;
}

interface UserContextType {
  userData: UserData | null;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { data: session } = useSession();

  const fetchUserData = async () => {
    if (session?.user) {
      try {
        const res = await fetch("/api/getuser");
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [session]);

  const refreshUserData = async () => {
    await fetchUserData();
  };

  return (
    <UserContext.Provider value={{ userData, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

