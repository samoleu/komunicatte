import React from "react";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import AppPage from "@/components/app/AppPage";
import HomePage from "@/components/home/HomePage";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <HomePage />
      </SignedOut>
      <SignedIn>
        <AppPage />
      </SignedIn>
    </main>
  );
};

export default Home;
