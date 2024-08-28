"use client";

import React, { useState, useEffect } from "react";
import ChatArea from "@/components/ChatArea";
import CommunityMenu from "@/components/CommunityMenu";


import UserInfo from "@/components/UserInfo";

import Image from "next/image";

import axios from "axios";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'; 

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

export default function Page() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const channelId = "test-channel"; // TODO: it should be recovered from the contextAPI
  
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter(); 

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/'); 
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        // TODO: set the user id to the actual user id
        const response = await axios.get(
          `${apiUrl}/api/stream/authenticate/anotheruser`
        );
        setUserToken(response.data.token);
      } catch (error) {
        console.error("Failed to fetch user token", error);
      }
    };

    fetchUserToken();
  }, []);

  if (!userToken) {
    return <div>Loading...</div>;
  }

  console.log(channelId, userToken);


  return (

    <div className="flex h-screen">
      <div className="w-80">
        {" "}
        {/* Adjust this width as needed */}
        <CommunityMenu />
      </div>
      <div className="flex-1 flex">
        <ChatArea channelId={channelId} userToken={userToken} />
      </div>
    </div>
  );
};

export default Page;
