import React from "react";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

interface ChatSuperiorCardUserInfoProps {
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

const ChatSuperiorCardUserInfo = ({
  profile,
}: ChatSuperiorCardUserInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-12 w-12 overflow-hidden rounded-full">
        <Image
          src={profile.profilePicture}
          alt={`${profile.profileName}'s Photo`}
          width={64}
          height={64}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-xl">{profile.profileName}</p>
        <p className="">{profile.acitivityStatus}</p>
      </div>
    </div>
  );
};

export default ChatSuperiorCardUserInfo;
