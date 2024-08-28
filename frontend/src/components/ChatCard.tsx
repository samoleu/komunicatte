"use client";
import Image from 'next/image';
import { useContext, useEffect, useState } from "react"
import { GeneralContext } from "@/context/GeneralContext";
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

interface ChatProps {
  chat: { 
    nameChat: String,
    members: String[],
  }
};

const ChatCard = ({chat}: ChatProps) => {
  const context = useContext(GeneralContext);
  const [profilePicture, setProfilePicture] = useState<string>('https://imgur.com/mCHMpLT.png');

  //TODO IMAGEM DO PERFIL INCOMPLETO, TERMINAR !!!!!!!!!!!!!!!!!!!!
  
  // useEffect(() => {
  //   const fetchProfilePicture = async () => {
  //     try {
  //       const isPrivate = chat.members.length === 2;
  //       const friendId = chat.members[0] === context.profile?.id ? chat.members[1] : chat.members[0];
        
  //       if (isPrivate) {
  //         const response = await axios.get(`${apiUrl}/api/profile/${friendId}`);
  //         setProfilePicture(response.data.profilePicture); // Adjust based on your API response
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile picture:", error);
  // //     }
  // //   };

  //   fetchProfilePicture();
  // }, [chat.members, context.profile?.id]); // Dependencies


  // TODO: change to profile picture in return
  return (
    <div className="items-center bg-white flex rounded-2xl">
      <div className="p-2 w-96 h-20 gap-6 flex items-center">
        <div className='w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14 flex items-center justify-center overflow-hidden rounded-full'>
          <Image src={profilePicture} alt="profile picture" height={64} width={64}/> 
        </div>
        <div className="flex flex-col">
          <h2 className="text-text text-xl">{chat.nameChat}</h2>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;