import Image from 'next/image';
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

interface ChatProps {
  lastMessage: {
      message: String,
      sender: String,
      timestamp:Date
      status: Boolean,
    },
    members: [],
};

const ChatCard = async ({lastMessage, members}: ChatProps) => {

  const { userId } = useAuth();

  const response = await axios.get(`${apiUrl}/api/profile/${userId}`);
  const profile = response.data;

  return (
    <div className="items-center bg-white flex ">
      <div className="p-2 w-96 h-20 gap-7 flex items-center">
        <div className='w-16 h-16 content-center overflow-hidden rounded-full'>
          <Image src={profile.profilePicture} alt="profile picture" height={64} width={64}/>
        </div>
        <div className="flex flex-col">
          <h2 className="text-text text-xl">{lastMessage.sender}</h2>
          <p className="text-text-2 text-base">{lastMessage.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;