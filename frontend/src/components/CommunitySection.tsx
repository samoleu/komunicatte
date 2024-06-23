"use client";

import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface CommunitySectionProps {
  sectionTitle: string;
  chats: {
    id: number;
    name: string;
  }[];
}

const CommunitySection = ({ sectionTitle, chats }: CommunitySectionProps) => {
  const [isOpen, setOpen] = useState(false);

  const handleSectionClick = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center cursor-pointer hover:bg-background-2 w-full rounded-md" onClick={handleSectionClick}>
          {isOpen ? (
            <MdOutlineKeyboardArrowDown className="text-xl"/>
          ) : (
            <MdOutlineKeyboardArrowRight className="text-xl"/>
          )}
          <p >{sectionTitle}</p>
        </div>
        {isOpen && (
          <>
            {chats.map((chat) => (
              <p className="pl-5" key={chat.id}>{chat.name}</p>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CommunitySection;
