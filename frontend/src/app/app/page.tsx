"use client";

import React, { useEffect } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import ChatArea from "@/components/ChatArea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="flex relative">
      <div className="w-80">
        {" "}
        {/* Adjust this width as needed */}
        <SideBarMenu />
      </div>
      <ChatArea />
    </div>
  );
}
