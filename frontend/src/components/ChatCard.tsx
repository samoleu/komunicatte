"use client";

import { useContext, useState } from "react";
import { GeneralContext } from "@/context/GeneralContext";
import Image from "next/image";

interface ChatProps {
  chat: {
    nameChat: String;
    members: String[];
    _id: string;
  };
}

const ChatCard = ({ chat }: ChatProps) => {
  const context = useContext(GeneralContext);
  const [profilePicture, setProfilePicture] = useState<string>(
    "https://imgur.com/mCHMpLT.png"
  );

  function handleCardClick() {
    context.handleActiveView({ chatId: chat._id, type: "chat" });
  }

  // TODO: change to profile picture in return
  return (
    <div
      className="items-center bg-background flex rounded-2xl hover:bg-[#EFEFFC] transition-colors duration-150 cursor-pointer"
      onClick={handleCardClick} 
    >
      <div className="px-4 py-2 w-96 h-20 gap-6 flex items-center">
        <div>
          <div className="rounded-full h-14 w-14 overflow-hidden flex items-center justify-center">
            <Image
              src={profilePicture}
              alt="profile picture"
              width={64}
              height={64}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-text text-xl">{chat.nameChat}</h2>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
