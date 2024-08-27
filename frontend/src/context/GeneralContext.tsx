"use client";
import { useAuth } from "@clerk/nextjs";
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
  clerkId: "",
  profile: null,
  theme: "light",
  activeView: { chatId: null, type: "chat" },
  handleTheme: () => {},
  handleProfile: (profile) => {},
  handleActiveView: (activeView) => {},
};

export const GeneralContext = createContext<GeneralContextType>(defaultContext);

export default function GeneralContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = useAuth();

  const [clerkId, setClerkId] = useState(userId);
  const [profile, setProfile] = useState(defaultContext.profile);
  const [theme, setTheme] = useState(defaultContext.theme);
  const [activeView, setActiveView] = useState(defaultContext.activeView);

  useEffect(() => {
    setClerkId(userId);
  }, [userId]);

  function handleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
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
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}
