import React from "react";
import ChatSuperiorCardUserInfo from "./ChatSuperiorCardUserInfo";
import CallButtons from "./CallButtons";

interface ChatSuperiorCardProps {
  profile: {
    accountRef: string;
    profileId: string;
    profileName: string;
    acitivityStatus: string;
    bio: string;
    profilePicture: string;
    friends: string[];
    communityRefs: string[];
  };
}

const ChatSuperiorCard = ({ profile }: ChatSuperiorCardProps) => {
  return (
    <div className="flex items-center justify-between bg-background text-text h-16 w-full px-2">
      <ChatSuperiorCardUserInfo profile={profile} />
      <CallButtons />
    </div>
  );
};

export default ChatSuperiorCard;
