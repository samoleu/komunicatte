"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SideBarMenu from "@/components/SideBarMenu";
import { GeneralContext } from "@/context/GeneralContext";
import { UserButton } from "@clerk/nextjs";
import ChatArea from "@/components/ChatArea";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

export default function App() {
  const context = useContext(GeneralContext);
  const [clerkUser, setClerkUser] = useState<any>(null);
  const clerkId = context.clerkId;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get('/api/clerk-user', {
  //         params: { user_id: clerkId },
  //       });
  //       setClerkUser(response.data);
  //     } catch (error) {
  //       console.error("Failed to get user", error);
  //     }
  //   };
  //   fetchUser();
  // }, [clerkId]);

  // useEffect(() => {
  //   const fetchProfileId = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${apiUrl}/api/account/clerk/${clerkId}`
  //       );
  //       if (response.data) {
  //         console.log("User account exists", response.data);
  //         const currentProfileId = response.data.profileReferences[0];
  //         context.handleProfile({ id: currentProfileId, status: "online" });
  //         axios.put(`${apiUrl}/api/profile/${currentProfileId}`, {
  //           activityStatus: "online",
  //         });
  //       } else {
  //         console.log("Account first login, creating profile");
  //         const accountCreateResponse = await axios.post(
  //           `${apiUrl}/api/account/`,
  //           {
  //             clerkUserId: clerkId,
  //             userName: clerkUser.username,
  //             email: clerkUser.email_addresses[0].email_address,
  //             profileReferences: [],
  //           }
  //         );
  //         console.log("Account created", accountCreateResponse.data);
  //         const profileCreatedResponse = await axios.post(
  //           `${apiUrl}/api/profile/`,
  //           {
  //             accountRef: clerkId,
  //             profileId: clerkUser.username,
  //             profileName: clerkUser.firstName,
  //           }
  //         );
  //         console.log("Profile created", profileCreatedResponse.data);
  //         const accountPutResponse = await axios.put(
  //           `${apiUrl}/api/account/${accountCreateResponse.data._id}`,
  //           {
  //             profileReferences: [profileCreatedResponse.data._id],
  //           }
  //         );
  //         console.log("Account updated", accountPutResponse.data);
  //       }
  //       console.log("API call succeeded");
  //     } catch (error) {
  //       console.error("Failed to get user account", error);
  //     }
  //   };

  //   fetchProfileId();
  // }, [clerkUser]);

  return (
    <div className="flex h-screen">
      <div className="w-80">
        {" "}
        {/* Adjust this width as needed */}
        <SideBarMenu />
      </div>
      <ChatArea/>
      <div className="absolute top-8 right-8">
        <UserButton />
      </div>
    </div>
  );
}
