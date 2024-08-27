'use client';

import CommunityMenu from "@/components/CommunityMenu";
import UserInfo from "@/components/UserInfo";
import { UserButton, useUser, useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import React, { use } from "react";

const Page = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <p>KOMUNICATTE</p>; // or a loading indicator
  }

  if (!isSignedIn) {
    // Handle the signed-out state here
    return <p>Please sign in</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen bg-gradient-to-b from-[#9a94d5] to-[#DDDBFF] bg-opacity-60">
        <main className="2xl:w-[96rem] xl:w-[80rem] lg:w-[64rem] md:w-[48rem] sm:w-[40rem] w-full h-full flex flex-col items-center">
          <section className="flex justify-between items-center px-8 pt-4 w-full">
            <div className="flex items-center space-x-4">
              <Image
                src="https://imgur.com/ezguYup"
                alt="komunicatte-logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <h1 className="text-4xl font-bold text-black leading-tight">Komunicatte</h1>
            </div>
            <UserButton />
          </section>
          <CommunityMenu />
        </main>
      </div>
    </>
  );
};

export default Page;