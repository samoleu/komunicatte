"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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
    activityStatus: profile.activityStatus,
  });

  const [bgColor, setBgColor] = useState<string>("rgba(252,252,255,0.4)");

  const maxBioLength = 100;
  const maxProfileNameLength = 16;

  const nameInputRef = useRef<HTMLInputElement>(null);
  const bioInputRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getActivityColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "border-onlineActivity";
      case "offline":
        return "border-offlineActivity";
      case "do not disturb":
        return "border-dndActivity";
      default:
        return "border-offlineActivity";
    }
  };

  const activityColor = useMemo(
    () => getActivityColor(profileData.activityStatus),
    [profileData.activityStatus]
  );

  useEffect(() => {
    // Extract average color from the profile picture
    const extractColor = () => {
      if (imageRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = imageRef.current;

        if (ctx && img) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const data = imageData.data;

          let r = 0, g = 0, b = 0;
          const length = data.length / 4;

          for (let i = 0; i < length; i++) {
            r += data[i * 4];
            g += data[i * 4 + 1];
            b += data[i * 4 + 2];
          }

          r = Math.floor(r / length);
          g = Math.floor(g / length);
          b = Math.floor(b / length);

          setBgColor(`rgba(${r},${g},${b},0.4)`);
        }
      }
    };

    if (profileData.profilePicture) {
      const img = document.createElement("img") as HTMLImageElement;
      img.src = profileData.profilePicture;
      img.onload = extractColor;
    }
  }, [profileData.profilePicture]);

  useEffect(() => {
    // Save profile data to the backend whenever profileData changes
    const saveProfileData = async () => {
      try {
        // Change logic to save profile data to the backend
        console.log("Profile saved:", profileData);
      } catch (error) {
        console.error("Error saving profile data:", error);
      }
    };
    saveProfileData();
  }, [profileData]);

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

  const cycleActivityStatus = () => {
    const statuses = ["online", "offline", "do not disturb"];
    const currentIndex = statuses.indexOf(profileData.activityStatus.toLowerCase());
    const nextIndex = (currentIndex + 1) % statuses.length;
    setProfileData((prev) => ({
      ...prev,
      activityStatus: statuses[nextIndex],
    }));
  };

  return (
    <div className="relative w-80 h-[32rem] rounded-lg overflow-hidden shadow-lg bg-[rgba(221,219,255,0.75)] backdrop-blur-lg">
      <div
        className="absolute top-0 left-0 w-full h-1/3"
        style={{ backgroundColor: bgColor }}
      ></div>
      <div className="relative w-[15.125rem] h-[15.125rem] group mx-auto top-10">
        <Image
          src={profileData.profilePicture}
          alt="Profile Avatar"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
          ref={imageRef}
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
            aria-label="Edit profile picture"
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
          <div className="absolute top-1 right-2 flex items-center px-2 py-1">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Edit profile name"
            >
              <path
                d="M17.71 4.04006C18.1 3.65006 18.1 3.00006 17.71 2.63006L15.37 0.290059C15 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.12 2.12006L15.87 5.87006M0 14.2501V18.0001H3.75L14.81 6.93006L11.06 3.18006L0 14.2501Z"
                fill="black"
                fillOpacity="0.36"
              />
            </svg>
          </div>
          <div className="text-right text-xs text-gray-600">
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
          <div className="absolute bottom-1 right-2 flex items-center p-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Edit bio"
            >
              <path
                d="M17.71 4.04006C18.1 3.65006 18.1 3.00006 17.71 2.63006L15.37 0.290059C15 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.12 2.12006L15.87 5.87006M0 14.2501V18.0001H3.75L14.81 6.93006L11.06 3.18006L0 14.2501Z"
                fill="black"
                fillOpacity="0.36"
              />
            </svg>
          </div>
        </div>
        <div className="text-right text-xs text-gray-600">
          {profileData.bio.length}/{maxBioLength} characters
        </div>
      </div>
      <div
        className="absolute bottom-[-4.25rem] left-1/2 transform -translate-x-1/2"
        onClick={cycleActivityStatus}
      >
        <div
          className={`w-[8.625rem] h-[8.625rem] rounded-full border-[1rem] flex items-center justify-center cursor-pointer ${activityColor}`}
        >
          <span className="absolute text-lg font-semibold text-black top-[1.5rem] select-none max-w-[6rem] text-center break-words leading-tight">
            {profileData.activityStatus}
          </span>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default ProfileCardConfig;
