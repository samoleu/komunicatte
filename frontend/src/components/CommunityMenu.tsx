"use client";

import CommunitySearchBtn from "./CommunitySearchBtn";
import Image from "next/image";
import CommunityNav from "./CommunityNav";
import { useState } from "react";

interface CommunityMenuProps {
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
}

const CommunityMenu = () => {
  const userCommunityList = [
    {
      id: 1,
      name: "Community 1",
      description: "Community 1 Description",
      members: ["user1", "user2", "user3"],
      img_url: "https://i.imgur.com/Qpw6j8D.png",
      sections: [
        {
          name: "Section 1",
          chats: [
            { name: "Chat 1", id: 1 },
            { name: "Chat 2", id: 2 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Community 2",
      description: "Community 2 Description",
      members: ["user1", "user2", "user3"],
      img_url: "https://i.imgur.com/RDlxwsW.jpeg",
      sections: [
        {
          name: "Section 1",
          chats: [
            { name: "Chat 1", id: 1 },
            { name: "Chat 2", id: 2 },
          ],
        },
        {
          name: "Section 2",
          chats: [
            { name: "Chat 1", id: 1 },
            { name: "Chat 2", id: 2 },
          ],
        }
      ],
    },
    {
      id: 3,
      name: "Community 3",
      description: "Community 3 Description",
      members: ["user1", "user3"],
      img_url: "https://i.imgur.com/B8ta5Aa.jpeg",
      sections: [
        {
          name: "Section 1",
          chats: [
            { name: "Chat 1", id: 1 },
            { name: "Chat 2", id: 2 },
          ],
        },
      ],
    }
  ];

  const [currentCommunity, setCurrentCommunity] = useState(
    userCommunityList[0]
  );

  const handleCommunityClick = (community: CommunityMenuProps) => {
    setCurrentCommunity(community);
  };

  return (
    <>
      <div className="flex flex-nowrap absolute top-0 left-0 h-full">
        <div className="flex flex-col items-center gap-4 py-4 px-2 h-full w-16 bg-background z-10 shadow-[5px_0px_10px_0px_#00000030]">
          <CommunitySearchBtn />
          <div className="flex flex-col items-center gap-2 h-full w-full">
            {userCommunityList.map((community) => {
              return (
                <div className={`flex rounded-xl justify-center items-center p-1 cursor-pointer`}>
                  <div
                    key={community.id}
                    onClick={() => handleCommunityClick(community)}
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
            })}
          </div>
        </div>
        <CommunityNav communityInfo={currentCommunity} />
      </div>
    </>
  );
};

export default CommunityMenu;
