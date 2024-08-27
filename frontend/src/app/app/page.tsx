"use client";

import React, { useState, useEffect } from "react";
import ChatArea from "@/components/ChatArea";
import CommunityMenu from "@/components/CommunityMenu";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

export default function Home() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const channelId = "test-channel"; // TODO: it should be recovered from the contextAPI

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
}
