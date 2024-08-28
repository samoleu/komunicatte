'use client';

import React, { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import Image from 'next/image';
import axios from 'axios';
import { useContext } from "react";
import { GeneralContext } from "@/context/GeneralContext";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

interface CommunityListInterface {
    _id: string;
    communityRef: string;
    communityName: string;
    communityPhoto: string;
    communityMembers: string[];
};

const CardSearchCommunities: React.FC = () => {

  const context = useContext(GeneralContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [communitiesList, setCommunitiesList] = useState<CommunityListInterface[]>([]);

  const handleJoinCommunity = async (communityId: string) => {
    try {
      await axios.put(`${apiUrl}/api/community/join/${communityId}`, {
        idNewMember: context.profile?.id,
      });

      window.alert("Successfully joined community");

    } catch (error) {
      console.error('Error joining community:', error);
      return;
    }
  }

  const handleSearch = async () => {
    try {
      // Faz a requisição para buscar comunidades com o nome inserido
      const response = await axios.get(`${apiUrl}/api/community/name/${searchQuery}`);
      
      setCommunitiesList(response.data);
  
    } catch (error) {
      console.error('Error searching for communities:', error);
      setCommunitiesList([]);
      return;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-[36rem] h-[37rem] bg-[#dddbffd0] rounded-xl p-8 flex flex-col items-center">
      <div className="flex mb-4 w-full p-2 text-text-2 bg-[#EFEFFC] rounded-md">
        <input
          type="text"
          placeholder="Search here ..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#EFEFFC] focus:outline-none pl-2"
        />       
        <button onClick={handleSearch} className="focus:outline-none">
          <BiSearch className='ml-2 text-3xl text-black'/>
        </button>                               
      </div>
      <div className="w-full overflow-y-auto space-y-2 p-3">
        {communitiesList.map(community => (
          <div key={community._id} className="bg-white flex mb-2 p-2 rounded-md items-center">
            <div className="w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14 flex items-center justify-center overflow-hidden rounded-full">
              <Image src={community.communityPhoto + ".png"} alt="community picture" height={64} width={64} />
            </div>
            <div className="flex ml-5 w-full items-center">
              <h2 className="text-text text-lg w-full mr-4">{community.communityName}</h2>
              <button onClick={() => handleJoinCommunity(community._id)} className="text-blue-500 text-sm mr-4">
                <FaUsers className='text-3xl text-black'/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSearchCommunities;
