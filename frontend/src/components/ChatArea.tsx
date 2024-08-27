"use client";

import React, { useState, useEffect } from "react";
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

interface ChatAreaProps {
  channelId: string;
  userToken: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channelId, userToken }) => {
  const [channel, setChannel] = useState<StreamChannelType | null>(null);
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    let activeChannel: StreamChannelType | null = null;

    const initChannel = async () => {
      if (!client) return;

      // Initialize the channel
      activeChannel = client.channel("messaging", channelId);
      await activeChannel.watch();
      setChannel(activeChannel);
    };

    const connectUser = async () => {
      try {
        //TODO: set the user id to the actual user id
        await client.connectUser({ id: "anotheruser" }, userToken);
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
  }, [channelId, userToken]);

  if (!clientReady) {
    return <div>Loading...</div>;
  }

  if (!channel) {
    return <div>Loading channel...</div>;
  }

  const customClasses: CustomClasses = {
    chat: 'str-chat',
  };

  return (
    // TODO: set theme to match the contextAPI theme='str-chat__theme-dark'
    <Chat client={client} customClasses={customClasses}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatArea;
