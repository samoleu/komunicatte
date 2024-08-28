"use client";

import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import Image from "next/image";
import axios from "axios";
import { useContext } from "react";
import { GeneralContext } from "@/context/GeneralContext";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

interface FriendListInterface {
  _id: string;
  profileId: string;
  profileName: string;
  profilePicture: string;
  friends: string[];
}

const CardSearchFriends: React.FC = () => {
  const context = useContext(GeneralContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [friendsList, setFriendsList] = useState<FriendListInterface[]>([]);

  const handleAddFriend = async (profileId: string) => {
    try {
      console.log("context", context);
      await axios.post(`${apiUrl}/api/profile/friend/${context.profile?.id}`, {
        friendId: profileId,
      });

      await axios.post(`${apiUrl}/api/chat`, {
        nameChat: "",
        createdBy: context.profile?.id,
        members: [profileId, context.profile?.id],
      });

      window.alert("Successfully added friend");
    } catch (error) {
      console.error("Erro ao adicionar amigo:", error);
      return;
    }
  };

  const handleSearch = async () => {
    try {
      // Faz a requisição para buscar usuários com o nome inserido
      const response = await axios.get(
        `${apiUrl}/api/profile/name/${searchQuery}`
      );

      // Filtra a lista de amigos para remover o objeto com _id igual ao id do contexto
      const filteredFriendsList = response.data.reduce(
        (acc: FriendListInterface[], friend: FriendListInterface) => {
          if (friend._id !== context.profile?.id) {
            acc.push(friend);
          }
          return acc;
        },
        []
      );

      setFriendsList(filteredFriendsList);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setFriendsList([]);
      return;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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
          <BiSearch className="ml-2 text-3xl text-black" />
        </button>
      </div>
      <div className="w-full overflow-y-auto space-y-2 p-3">
        {friendsList.map((friend) => (
          <div
            key={friend.profileId}
            className="bg-white flex mb-2 p-2 rounded-md items-center"
          >
            <div className="w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14 flex items-center justify-center overflow-hidden rounded-full">
              <Image
                src={friend.profilePicture + ".png"}
                alt="profile picture"
                height={64}
                width={64}
              />
            </div>
            <div className="flex ml-5 w-full items-center">
              <h2 className="text-text text-lg w-full mr-4">
                {friend.profileName}
              </h2>
              <button
                onClick={() => handleAddFriend(friend._id)}
                className="text-blue-500 text-sm mr-4"
              >
                <RiUserAddLine className="text-3xl text-black" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSearchFriends;
