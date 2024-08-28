"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ProfileCardProps {
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

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const [bgColor, setBgColor] = useState<string>("rgba(252,252,255,0.4)");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const getActivityColor = (acitivityStatus: string) => {
    switch (acitivityStatus.toLowerCase()) {
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

  const activityColor = getActivityColor(profile.acitivityStatus);

  const truncatedName =
    profile.profileName.length > 16
      ? `${profile.profileName.substring(0, 13)}...`
      : profile.profileName;

  const truncatedBio =
    profile.bio.length > 102
      ? `${profile.bio.substring(0, 100)}...`
      : profile.bio;

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

  useEffect(() => {
    if (profile.profilePicture) {
      const img = document.createElement("img") as HTMLImageElement;
      img.src = profile.profilePicture;
      img.onload = extractColor;
    }
  }, [profile.profilePicture]);

  return (
    <div className="relative w-80 h-[32rem] rounded-lg overflow-hidden shadow-lg bg-[rgba(221,219,255,0.75)] backdrop-blur-lg">
      <div
        className="absolute top-0 left-0 w-full h-1/3"
        style={{ backgroundColor: bgColor }}
      ></div>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <div className="w-[15.125rem] h-[15.125rem] relative">
          <Image
            src={profile.profilePicture}
            alt="Profile Avatar"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            ref={imageRef}
          />
        </div>
      </div>
      <div className="absolute top-[18.5rem] left-1/2 transform -translate-x-1/2 w-full text-center">
        <p className="text-xl font-bold text-black">{truncatedName}</p>
      </div>
      <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 w-[90%] h-24">
        <p className="w-full h-full text-center text-md text-black bg-[rgba(252,252,255,0.3)] p-3 rounded-lg break-words overflow-hidden">
          {truncatedBio}
        </p>
      </div>
      <div className="absolute bottom-[-4.25rem] left-1/2 transform -translate-x-1/2">
        <div
          className={`w-[8.625rem] h-[8.625rem] rounded-full border-[1rem] flex items-center justify-center ${activityColor}`}
        >
          <span
            className="absolute text-lg font-semibold text-black top-[2.5rem] select-none max-w-[6rem] text-center break-words leading-tight transform -translate-y-[40%]"
            style={{
              lineHeight:
                profile.acitivityStatus.length > 10 ? "1.2" : "normal",
            }}
          >
            {profile.acitivityStatus}
          </span>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default ProfileCard;
