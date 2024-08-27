'use client';
import { IoChatbubble } from "react-icons/io5";
import { FaUsers, FaCog, FaUser } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {

  const [activeTab, setActiveTab] = useState("chats");

  return (
    <nav className="m-0 p-5 py-2 flex justify-around items-center w-80 rounded-xl text-[rgb(252,252,255)] bg-[rgba(221,219,255,0.75)] backdrop-blur-lg" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>

      <div
        className={`flex p-1 font-bold justify-center items-center cursor-pointer ${activeTab === 'chats' ? 'text-[rgb(98,88,187)]' : 'text-[rgb(252,252,255)]'}`}
        onClick={() => setActiveTab('chats')}
      >
        <IoChatbubble size={24}/>
      </div>
      <div className="bg-[rgb(252,252,255)] h-7 w-px"></div>
      
      <div
        className={`flex p-1 font-bold justify-center items-center cursor-pointer ${activeTab === 'communities' ? 'text-[rgb(98,88,187)]' : 'text-[rgb(252,252,255)]'}`}
        onClick={() => setActiveTab('communities')}
      >
        <FaUsers size={24}/>
      </div>
      <div className="bg-[rgb(252,252,255)] h-7 w-px"></div>
      
      <div
        className={`flex p-1 font-bold justify-center items-center cursor-pointer ${activeTab === 'config' ? 'text-[rgb(98,88,187)]' : 'text-[rgb(252,252,255)]'}`}
        onClick={() => setActiveTab('config')}
      >
        <FaCog size={24}/>
      </div>
      <div className="bg-[rgb(252,252,255)] h-7 w-px"></div>
      
      <div
        className={`flex p-1 font-bold justify-center items-center cursor-pointer ${activeTab === 'user' ? 'text-[rgb(98,88,187)]' : 'text-[rgb(252,252,255)]'}`}
        onClick={() => setActiveTab('user')}
      >
        <FaUser size={24}/>
      </div>
    </nav>
  );
};

export default Navbar;
