'use client';
import { IoChatbubble } from "react-icons/io5";
import { FaUsers, FaCog, FaUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import {GeneralContext} from "@/context/GeneralContext";
import { UserButton, UserProfile } from "@clerk/nextjs";
import ChangeProfileButton from "./ChangeProfileButton";
import axios from "axios";
import ProfileConfigGroup from "./ProfileConfigGroup";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

const Navbar = () => {

  const [activeTab, setActiveTab] = useState("chat");
  const [userProfile, setUserProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const context = useContext(GeneralContext);
  const userId = context.clerkId;
  const userProfileId = context.profile?.id;

  function handleClick(chatType : "chat" | "community") {
    context.handleActiveView({chatId: null, type: chatType});
    setActiveTab(chatType);
  }

  function handleUserClick() {
    setActiveTab('user');
    setShowProfile(!showProfile);
  }

  useEffect(() => {
    if (!userProfileId || !userId) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/profile/${userProfileId}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userProfileId, userId]);
  

  return (
    <>
      <div className="flex justify-center relative">
        <div className="absolute bottom-16">
          {showProfile && <ProfileConfigGroup profile={userProfile!} />}
        </div>
        <nav className="m-0 p-5 py-2 flex justify-around items-center w-72 rounded-xl text-[rgb(252,252,255)] bg-[rgba(221,219,255,0.75)] backdrop-blur-lg" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
          <div
            className={`flex p-1 font-bold justify-center items-center cursor-pointer ${activeTab === 'chats' ? 'text-[rgb(98,88,187)]' : 'text-[rgb(252,252,255)]'}`}
            onClick={() => handleClick('chat')}
          >
            <IoChatbubble size={24}/>
          </div>
          <div className="bg-[rgb(252,252,255)] h-7 w-px"></div>
        
          <div
            className={`flex p-1 font-bold justify-center items-center cursor-pointer ${activeTab === 'communities' ? 'text-[rgb(98,88,187)]' : 'text-[rgb(252,252,255)]'}`}
            onClick={() => handleClick('community')}
          >
            <FaUsers size={24}/>
          </div>
          <div className="bg-[rgb(252,252,255)] h-7 w-px"></div>
        
          <div
            className={`flex p-1 font-bold justify-center items-center relative cursor-pointer ${activeTab === 'config' && <UserProfile /> ? 'text-[rgb(98,88,187)]' : 'text-[rgb(252,252,255)]'}`}
            onClick={() => setActiveTab('config')}
          >
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: 'opacity-0 w-8 h-8 rounded-full z-10 absolute', // Customize the size and shape
                  userButtonTrigger: 'bg-transparent p-0', // Removes background and padding
                },
              }} />
              <FaCog size={24} />
          </div>
          <div className="bg-[rgb(252,252,255)] h-7 w-px"></div>
        
          <div
            className={`flex p-1 font-bold justify-center items-center cursor-pointer ${activeTab === 'user' ? 'text-[rgb(98,88,187)]' : 'text-[rgb(252,252,255)]'}`}
            onClick={() => handleUserClick()}
          >
            <FaUser size={24}/>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
