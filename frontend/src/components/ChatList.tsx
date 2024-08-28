"use client";

import { useContext, useEffect, useState, useRef  } from "react";
import { GeneralContext } from "@/context/GeneralContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { RiUserAddLine } from "react-icons/ri";
import ChatCard from "./ChatCard";
import CardSearchFriends from "./CardSearchFriends";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

interface Chat {
  nameChat: string;
  members: string[];
}

const ChatList = () => {

  const context = useContext(GeneralContext);
  const userId = context.profile?.id;

  const [filteredUserChats, setFilteredUserChats] = useState<Chat[]>([]);
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [showSearchFriends, setShowSearchFriends] = useState(false);
  const searchFriendsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fetchUserChats = async () => {
    if (userId) {
      try {
        const response = await axios.get(`${apiUrl}/api/chat/${userId}`);
        setUserChats(response.data);
        setFilteredUserChats(response.data);
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    }
  };

  const [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    const normalizedSearchBar = searchBar.trim().replace(/\s+/g, ' ').toLowerCase();
    const filteredChats = userChats.filter((chat) => {
      const normalizedChatName = chat.nameChat.trim().replace(/\s+/g, ' ').toLowerCase();
      return normalizedChatName.includes(normalizedSearchBar);
    });
  
    setFilteredUserChats(filteredChats);
  }, [searchBar]);
  
  useEffect(() => {
    fetchUserChats();
  }, [userId]);

  const toggleSearchFriends = () => {
    setShowSearchFriends(!showSearchFriends);
  }
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verifica se o clique foi fora do botão e do CardSearchFriends
      if (
        searchFriendsRef.current &&
        !searchFriendsRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSearchFriends(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-background p-2 h-screen w-96 z-50 shadow-[4px_0px_36.2px_1px_#EFEFFC]">
      <div className="flex items-center ml-2 mb-4 mt-2">
        <input
            type="text"
            onChange={(e) => setSearchBar(e.target.value)}
            placeholder="Search here ..."
            className="focus:outline-none flex w-full p-2 text-text-2 bg-[#EFEFFC] rounded-md"
        />
        <button 
          ref={buttonRef}
          className="bg-[#EFEFFC] mx-3 p-2 rounded-md"
          onClick={toggleSearchFriends}
        >
          <RiUserAddLine className='text-3xl text-text-2'/>
        </button>
      </div>

      {showSearchFriends && (
        <div ref={searchFriendsRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CardSearchFriends />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {filteredUserChats.map((chat) => (
          <ChatCard key={chat.nameChat} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;