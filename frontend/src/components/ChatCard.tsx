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
    <div className="items-center bg-white flex rounded-2xl">
      <div className="p-2 w-96 h-20 gap-6 flex items-center">
        <div className="w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14 flex items-center justify-center overflow-hidden rounded-full">
          <Image
            src={profilePicture}
            alt="profile picture"
            height={64}
            width={64}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-text text-xl">{chat.nameChat}</h2>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
