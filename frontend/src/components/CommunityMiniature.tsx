import React, { useContext } from "react";
import Image from "next/image";
import { GeneralContext } from "@/context/GeneralContext";

interface CommunityMiniatureProps {
  community: {
    id: number;
    name: string;
    description: string;
    members: string[];
    img_url: string;
    sections: {
      name: string;
      chats: {
        name: string;
        id: number;
      }[];
    }[];
  };
}

const CommunityMiniature = ({ community }: CommunityMiniatureProps) => {
  const { activeView } = useContext(GeneralContext);

  const isCurrentCommunity =
    activeView.type === "community" && activeView.chatId === String(community.id);

  return (
    <div
      className={`flex rounded-xl justify-center items-center p-1 ${
        isCurrentCommunity ? "bg-background-2" : ""
      }`}
    >
      <div
        key={community.id}
        className="h-12 w-12 overflow-hidden rounded-full"
      >
        <Image
          src={community.img_url}
          alt={community.name}
          width={48}
          height={48}
          className="object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default CommunityMiniature;
