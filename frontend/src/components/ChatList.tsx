"use client";

import ChatCard from "./ChatCard";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { GeneralContext } from "@/context/GeneralContext";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

const ChatList = () => {
  const context = useContext(GeneralContext);
  const [userChats, setUserChats] = useState([]);
  const userId = context.profile?.id;

  const fetchUserChats = async () => {
    console.log("userId", userId);
    if (userId) {
      try {
        const response = await axios.get(`${apiUrl}/api/chat/${userId}`);
        setUserChats(response.data);
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserChats();
  }, [userId]);

  return (
    <div>
      {userChats.map((chat) => {
        return <ChatCard chat={chat} />;
      })}
    </div>
  );
};

export default ChatList;
