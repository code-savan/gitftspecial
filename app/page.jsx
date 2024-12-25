

import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";
import HomeClient from "./HomeClient";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="w-full h-screen">
          <HomeClient
              session={session} />
    </main>
  );
}
