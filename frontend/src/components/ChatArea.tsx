import React, { useState, useEffect, useContext, use } from "react";
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

  console.log("context", context);

  const [channel, setChannel] = useState<StreamChannelType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [clientReady, setClientReady] = useState(false);

  // Fetch user profile in a separate useEffect
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/profile/${userProfileId}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userProfileId) {
      fetchUserProfile();
    }
  }, [userProfileId, userId]);

  // Handle client connection and channel initialization
  useEffect(() => {
    let activeChannel: StreamChannelType | null = null;

    const initChannel = async () => {
      if (!client) return;

      activeChannel = client.channel("messaging", channelId);
      await activeChannel.watch();
      setChannel(activeChannel);
    };

    const connectUser = async () => {
      try {
        const profileId = await context.profile?.id;
        console.log("Trying to connect user...", { id: profileId }, userToken);
        const response = await client.queryUsers({ id: { $in: ['66cd6ccc95824a1dfded1fd3', '66ce264ea1d15a9f2882912d', 'jessie'] } });
        console.log("testttttttttt", response);
        await client.connectUser({ id: profileId! }, userToken);
        setClientReady(true);
        await initChannel();
      } catch (error) {
        console.error("Error connecting user:", error);
      }
    };

    



    if (userToken) {
      connectUser();
    }

    return () => {
      if (activeChannel) {
        activeChannel.stopWatching();
      }
    };
  }, [channelId, userToken, userId]);

  if (!clientReady) {
    return <div>Loading...</div>;
  }

  if (!channel) {
    return <div>Loading channel...</div>;
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
      {channel ? (
        <Chat client={client} theme={theme} customClasses={customClasses}>
          <Channel channel={channel}>
            <Window>
              <ChatSuperiorCard profile={userProfile!}/>
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </Chat>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ChatArea;
