import React from "react";
import Image from "next/image";
import HeroImage from "@/../public/next.svg";
import { useAuth } from "@clerk/nextjs";
import SignInBtn from "@/components/SignInBtn";

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen w-screen bg-gradient-to-b from-purple-500 to-purple-100">
        <main className="2xl:w-[96rem] xl:w-[80rem] lg:w-[64rem] md:w-[48rem] sm:w-[40rem] w-full h-full flex flex-col items-center">
          <SignInBtn />
          <section className="flex justify-between items-center w-full h-screen">
            <div className="flex flex-col flex-wrap gap-4 max-w-[50%]">
              <h1>Generic Hero Section Title</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur quisquam a dolorem magni minima obcaecati eum
                dignissimos, error veniam beatae excepturi quasi atque numquam
                sapiente, tempore nam ea aliquam. Id!
              </p>
              <button className="bg-black rounded-lg px-4 py-2">
                Get Started
              </button>
            </div>
            <Image src={HeroImage} alt="Hero Image" width={400} height={400} />
          </section>
        </main>
      </div>
    </>
  );
};

export default page;
