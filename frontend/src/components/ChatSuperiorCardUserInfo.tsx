"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProfileCard from "./ProfileCard";

interface ChatSuperiorCardUserInfoProps {
  profile: {
    accountRef: string;
    profileId: string;
    profileName: string;
    acitivityStatus: string; // Corrected the typo here
    bio: string;
    profilePicture: string;
    friends: string[];
    communityRefs: string[];
  };
}

const ChatSuperiorCardUserInfo = ({
  profile,
}: ChatSuperiorCardUserInfoProps) => {
  const [showProfile, setShowProfile] = useState(false);

  function handleShowProfile() {
    setShowProfile(!showProfile);
  }

  return (
    <>
      {showProfile && (
        <div className="flex justify-center items-center w-full bg-black opacity-20 blur-3xl">
          <ProfileCard profile={profile} />
        </div>
      )}
      {/* TODO: ADD handleShowProfile to onClick Attribute */}
      <div className="flex items-center gap-4 w-full h-full">
        <div>
          <div className="rounded-full h-14 w-14 overflow-hidden flex items-center justify-center">
            <Image
              src={
                profile.profilePicture
                  ? profile.profilePicture
                  : "https://imgur.com/mCHMpLT.png"
              }
              alt={`${profile.profileName}'s Photo`}
              width={64}
              height={64}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-col text-text">
          <p className="font-bold text-4xl">{profile.profileName}</p>
          <p>{profile.acitivityStatus}</p> {/* Corrected the typo here */}
        </div>
      </div>
    </>
  );
};

export default ChatSuperiorCardUserInfo;
