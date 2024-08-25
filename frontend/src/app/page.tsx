import React from "react";
import Image from "next/image";
import ClerkBtn from "@/components/SignInBtn";

const Page = () => {
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
            <ClerkBtn></ClerkBtn>
          </section>
          <section className="flex justify-between items-center w-full h-screen px-8">
            <div className="flex flex-col flex-wrap gap-6 max-w-[50%]">
              <h1 className="text-6xl font-extrabold text-black my-6 leading-tight">
                Discover a New Era of Messaging
              </h1>
              <p className="text-lg font-bold text-[#3f3f3f] mb-6">
                Welcome to a new era of communication where
                you can effortlessly balance work and personal life.
                Our app provides a robust messaging platform with
                dedicated profiles for work and personal use, promising
                an experience that's not just better than WhatsApp.
              </p>
              <button className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 w-1/3">
                Get Started
              </button>
            </div>
            <Image
              src="https://imgur.com/NI2Xfzq"
              alt="messaging-img"
              width={400}
              height={400}
              className="object-cover"
            />
          </section>
        </main>
      </div>
    </>
  );
};

export default Page;
