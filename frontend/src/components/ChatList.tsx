"use client";

import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

const ChatList = () => {

  const [userChats, setUserChats] = useState([]);
  const { userId } = useAuth();

  const fetchUserChats = async () => {
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