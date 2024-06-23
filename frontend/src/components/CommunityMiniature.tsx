import React from "react";
import Image from "next/image";

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

const CommunityMiniature = ( {community} : CommunityMiniatureProps ) => {
  return (
    <div
      className={`flex rounded-xl justify-center items-center p-1 `}> //TODO: Add bg-background-2 if community == currentCommunity (necessary contextAPI)
      <div
        key={community.id}
        className="h-12 w-12 overflow-hidden rounded-full"
      >
        <Image
          src={community.img_url}
          alt={community.name}
          width={48}
          height={48}
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default CommunityMiniature;
