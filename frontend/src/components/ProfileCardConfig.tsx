"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface ProfileCardConfigProps {
  profile: {
    accountRef: string;
    profileId: string;
    profileName: string;
    activityStatus: string;
    bio: string;
    profilePicture: string;
    friends: string[];
    communityRefs: string[];
  };
}

const ProfileCardConfig = ({ profile }: ProfileCardConfigProps) => {
  const [profileData, setProfileData] = useState({
    profileName: profile.profileName,
    bio: profile.bio,
    profilePicture: profile.profilePicture,
  });

  const maxBioLength = 100;
  const maxProfileNameLength = 16;

  const nameRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const bioInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (nameInputRef.current && nameRef.current) {
      nameInputRef.current.style.width = `${nameRef.current.scrollWidth}px`;
    }
    if (bioInputRef.current && bioRef.current) {
      bioInputRef.current.style.height = `${bioRef.current.scrollHeight}px`;
    }
  }, [profileData.profileName, profileData.bio]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfileData((prev) => ({
        ...prev,
        profileName: e.target.value.slice(0, maxProfileNameLength),
      }));
    },
    []
  );

  const handleBioChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setProfileData((prev) => ({
        ...prev,
        bio: e.target.value,
      }));
    },
    []
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setProfileData((prev) => ({
              ...prev,
              profilePicture: event.target?.result as string,
            }));
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    []
  );

  const handleSave = () => {
    // Change this to save the profile data to the backend
    console.log("Profile saved:", profileData);
    alert("Profile saved!");
  };

  return (
    <div className="relative w-80 h-[32rem] rounded-lg overflow-hidden shadow-lg bg-[rgba(221,219,255,0.75)] backdrop-blur-lg">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-[rgba(252,252,255,0.4)]"></div>
      <div className="relative w-[15.125rem] h-[15.125rem] group mx-auto top-10">
        <Image
          src={profileData.profilePicture}
          alt="Profile Avatar"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer rounded-full z-10"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40 rounded-full z-2 cursor-pointer">
          <svg
            width="36"
            height="36"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.71 4.04006C18.1 3.65006 18.1 3.00006 17.71 2.63006L15.37 0.290059C15 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.12 2.12006L15.87 5.87006M0 14.2501V18.0001H3.75L14.81 6.93006L11.06 3.18006L0 14.2501Z"
              fill="white"
              fillOpacity="0.75"
            />
          </svg>
        </div>
      </div>
      <div className="absolute top-[18.5rem] left-1/2 transform -translate-x-1/2 w-[90%]">
        <div className="relative flex flex-col">
          <input
            type="text"
            value={profileData.profileName}
            onChange={handleNameChange}
            className="text-xl font-bold text-black bg-transparent text-center pr-2 pl-2 rounded-lg"
            ref={nameInputRef}
            style={{ width: "auto" }}
          />
          <div className="absolute top-1 right-2 flex items-center px-2 py-1 z-[-1]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.71 4.04006C18.1 3.65006 18.1 3.00006 17.71 2.63006L15.37 0.290059C15 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.12 2.12006L15.87 5.87006M0 14.2501V18.0001H3.75L14.81 6.93006L11.06 3.18006L0 14.2501Z"
                fill="black"
                fillOpacity="0.36"
              />
            </svg>
          </div>
          <div className="text-right text-sm text-gray-600">
            {profileData.profileName.length}/{maxProfileNameLength} characters
          </div>
        </div>
      </div>
      <div className="absolute top-[22rem] left-1/2 transform -translate-x-1/2 w-[90%]">
        <div className="relative">
          <textarea
            value={profileData.bio}
            onChange={handleBioChange}
            maxLength={maxBioLength}
            className="w-full h-[90%] text-center text-md text-black bg-[rgba(252,252,255,0.3)] p-3 rounded-lg break-words overflow-hidden resize-none"
            ref={bioInputRef}
          />
          <div className="absolute bottom-1 right-2 flex items-center p-2 z-[-1]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.71 4.04006C18.1 3.65006 18.1 3.00006 17.71 2.63006L15.37 0.290059C15 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.12 2.12006L15.87 5.87006M0 14.2501V18.0001H3.75L14.81 6.93006L11.06 3.18006L0 14.2501Z"
                fill="black"
                fillOpacity="0.36"
              />
            </svg>
          </div>
        </div>
        <div className="text-right text-sm text-gray-600">
          {profileData.bio.length}/{maxBioLength} characters
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileCardConfig;
