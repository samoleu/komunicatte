"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  createContext,
  useState,
  SetStateAction,
  useEffect,
} from "react";

export type GeneralContextType = {
  clerkId: string | null | undefined;
  userToken: string | null | undefined;
  profile: null | {
    id: string;
    status: "online" | "offline" | "do not disturb";
  };
  theme: "light" | "dark";
  activeView: {
    chatId: string | null;
    type: "chat" | "community";
  };
  handleProfile: (profile: GeneralContextType["profile"]) => void;
  handleActiveView: (activeView: GeneralContextType["activeView"]) => void;
  handleTheme: () => void;
};

const defaultContext: GeneralContextType = {
  clerkId: null, // Changed to null to match the type
  userToken: null, // Changed to null to match the type
  profile: null,
  theme: "light",
  activeView: { chatId: null, type: "chat" },
  handleTheme: () => {},
  handleProfile: (profile) => {},
  handleActiveView: (activeView) => {},
};

export const GeneralContext = createContext<GeneralContextType>(defaultContext);

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

export default function GeneralContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = useAuth();
  const [clerkId, setClerkId] = useState<string | null | undefined>(userId);
  const [userToken, setUserToken] = useState<string | null | undefined>(
    defaultContext.userToken
  );
  const [profile, setProfile] = useState(defaultContext.profile);
  const [theme, setTheme] = useState(defaultContext.theme);
  const [activeView, setActiveView] = useState(defaultContext.activeView);

  useEffect(() => {
    const fetchUserToken = async () => {
      if (profile?.id) {
        try {
          const response = await axios.get(
            `${apiUrl}/api/stream/authenticate/${profile.id}`
          );
          const { token } = response.data;
          setUserToken(token);
        } catch (error) {
          console.error("Failed to fetch user token", error);
        }
      }
    };

    fetchUserToken();
  }, [profile]);

  useEffect(() => {
    setClerkId(userId);
  }, [userId]);

  const [clerkUser, setClerkUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/clerk-user", {
          params: { user_id: clerkId },
        });
        setClerkUser(response.data);
      } catch (error) {
        console.error("Failed to get user", error);
      }
    };
    fetchUser();
  }, [clerkId]);

  useEffect(() => {
    const fetchProfileId = async () => {
      if (!clerkId || !clerkUser) return; // Ensure necessary data is available

      try {
        const response = await axios.get(
          `${apiUrl}/api/account/clerk/${clerkId}`
        );

        if (response.data) {
          console.log("User account exists", response.data);
          setProfile({ id: response.data.profileReferences[0], status: "online" });
        } else {
          console.log("Account first login, creating profile");

          const accountCreateResponse = await axios.post(
            `${apiUrl}/api/account/`,
            {
              clerkUserId: clerkId,
              userName: clerkUser.username,
              email: clerkUser.email_addresses[0].email_address,
              profileReferences: [],
            }
          );

          console.log("Account created", accountCreateResponse.data);

          const profileCreatedResponse = await axios.post(
            `${apiUrl}/api/profile/`,
            {
              accountRef: clerkId,
              profileId: clerkUser.username,
              profileName: clerkUser.first_name,
            }
          );

          console.log("Profile created", profileCreatedResponse.data);

          await axios.put(
            `${apiUrl}/api/account/${accountCreateResponse.data._id}`,
            {
              profileReferences: [profileCreatedResponse.data._id],
            }
          );

          console.log("Account updated");
        }
      } catch (error) {
        console.error("Failed to get or create user account", error);
      }
    };

    fetchProfileId();
  }, [clerkId, clerkUser]);

  function handleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  function handleProfile(profile: GeneralContextType["profile"]) {
    if (
      profile &&
      ["online", "offline", "do not disturb"].includes(profile.status)
    ) {
      setProfile(profile);
    } else {
      console.log("Invalid profile status");
    }
  }

  function handleActiveView(activeView: GeneralContextType["activeView"]) {
    if (activeView && ["chat", "community"].includes(activeView.type)) {
      setActiveView(activeView);
    } else {
      console.log("Invalid active view tab");
    }
  }

  return (
    <GeneralContext.Provider
      value={{
        handleTheme,
        clerkId,
        profile,
        theme,
        activeView,
        handleProfile,
        handleActiveView,
        userToken,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}
