"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

const UserInfo = () => {
  const [chats, setChats] = useState([]);
  const { userId } = useAuth();

  const userChats = async () => {
    if (userId) {
      try {
        const response = await axios.get(`${apiUrl}/api/chat/${userId}`);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    }
  };

  useEffect(() => {
    userChats();
  }, [userId]);

  return (
    <>
      <div className="bg-red-500 flex flex-col text-white text-2xl font-bold">
        <p>Your userId is: {userId}</p>
        <p>And you currently have {chats.length} chats</p>
      </div>
    </>
  );
};

export default UserInfo;
