import React, { useState, useEffect, useContext } from "react";
import {
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  Chat,
  CustomClasses,
} from "stream-chat-react";
import { Channel as StreamChannelType } from "stream-chat";
import { client } from "../streamClient";

import "stream-chat-react/dist/css/v2/index.css";
import { GeneralContext } from "@/context/GeneralContext";
import axios from "axios";
import ChatSuperiorCard from "./ChatSuperiorCard";
import ChatNotFound from "./ChatNotFound";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

interface UserProfile {
  accountRef: string;
  profileId: string;
  profileName: string;
  acitivityStatus: string;
  bio: string;
  profilePicture: string;
  friends: string[];
  communityRefs: string[];
}

const ChatArea = () => {
  const context = useContext(GeneralContext);
  const channelId = context.activeView.chatId;
  const userToken = context.userToken;
  const userId = context.clerkId;
  const userProfileId = context.profile?.id;

  const [channel, setChannel] = useState<StreamChannelType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [receiverProfile, setReceiverProfile] = useState<UserProfile | null>(
    null
  );
  const [clientReady, setClientReady] = useState(false);

  // Fetch user profile
  useEffect(() => {
    if (!userProfileId || !userId) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/profile/${userProfileId}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userProfileId, userId]);

  // Fetch receiver profile
  useEffect(() => {
    const fetchReceiverProfile = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/chat/${context.profile?.id}`
        );

        // Debug: Check the entire response object

        // Check if response.data is an array or an object with the expected property
        const targetChat = Array.isArray(response.data)
          ? response.data.find((chat: any) => chat._id === channelId)
          : response.data; // If response.data is not an array, use it directly

        if (!targetChat) {
          throw new Error("Target chat not found");
        }

        // Check if members exist and is an array
        const members = targetChat.members;
        if (!Array.isArray(members)) {
          throw new Error("Members is not an array or is undefined");
        }

        const filteredMembers = members.filter(
          (member: string) => member !== context.profile?.id
        );

        if (filteredMembers.length === 1) {
          const response = await axios.get(
            `${apiUrl}/api/profile/${filteredMembers[0]}`
          );
          const updatedProfile = response.data;
          setReceiverProfile(updatedProfile);
        }
      } catch (error) {
        console.error("Error fetching receiver profile:", error);
      }
    };

    if (channelId && userId) {
      fetchReceiverProfile();
    }
  }, [channelId, userId]);

  // Handle client connection and channel initialization
  useEffect(() => {
    if (!userToken || !channelId || !userProfileId) return;

    let activeChannel: StreamChannelType | null = null;

    const initChannel = async () => {
      if (!client) return;
      activeChannel = client.channel("messaging", channelId);
      await activeChannel.watch();
      setChannel(activeChannel);
    };

    const connectUser = async () => {
      try {
        await client.connectUser({ id: userProfileId }, userToken);
        setClientReady(true);
        await initChannel();
      } catch (error) {
        console.error("Error connecting user:", error);
      }
    };

    connectUser();

    return () => {
      if (activeChannel) {
        activeChannel.stopWatching();
      }
    };
  }, [channelId, userToken, userProfileId]);

  if (!clientReady || !channel) {
    return <ChatNotFound />;
  }

  const customClasses: CustomClasses = {
    chat: "str-chat",
  };

  const theme =
    context.theme === "light"
      ? "str-chat__theme-light"
      : "str-chat__theme-dark";

  return (
    <>
      {context.activeView.chatId ? (
        <Chat client={client} theme={theme} customClasses={customClasses}>
          <Channel channel={channel}>
            <Window>
              {context.activeView.type === "chat" && receiverProfile ? (
                <ChatSuperiorCard profile={receiverProfile} />
              ) : (
                <ChannelHeader />
              )}
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </Chat>
      ) : (
        <ChatNotFound />
      )}
    </>
  );
};

export default ChatArea;
