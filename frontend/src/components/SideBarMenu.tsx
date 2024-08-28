"use client";

import { GeneralContext } from "@/context/GeneralContext";
import React, { useContext, useState } from "react";
import CommunityMenu from "./CommunityMenu";
import ChatList from "./ChatList";
import Navbar from "./Navbar";

const SideBarMenu = () => {
  const context = useContext(GeneralContext);
  // console.log(context.activeView);

  return (
    <>
      <div className="relative h-screen flex flex-col items-center w-80 z-20">
        {context.activeView.type === "chat" ? <ChatList /> : <CommunityMenu />}
        <div className="absolute z-10 bottom-8 ">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default SideBarMenu;
