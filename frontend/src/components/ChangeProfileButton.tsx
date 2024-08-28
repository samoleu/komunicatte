'use client';
import { useState, useEffect, useRef, useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { GeneralContext } from "@/context/GeneralContext";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URI;

type Account = {
  clerkUserId: string;
  userName: string;
  email: string;
  profileReferences?: Profile[];
}

type Profile = {
  accountRef: string;
  profileId: string;
  profileName?: string;
  profilePicture?: string;
  _id: string; 
};

const ChangeProfileButton = () => {
  const context = useContext(GeneralContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [profileChange, setProfileChange] = useState(Object);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [userProfiles, setUserProfiles] = useState<Profile[]>([]);
  const userId  = context.clerkId;

  const fetchProfiles = async () => {
    if (userId) {
      try {
        const response = await axios.get(`${apiUrl}api/profile/clerk/${userId}`);
        setUserProfiles(response.data);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    }
  };

  
  useEffect(() => {
    fetchProfiles();
  }, [userId]);

  useEffect(() => {
    console.log('Updated Profiles:', userProfiles);
  }, [userProfiles]);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleProfileClick = (profile: Object) => {
    context.handleProfile({id: profile._id, status: "online"});
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="m-0 p-3 py-2 flex justify-center items-center w-80 rounded-xl text-[rgb(252,252,255)] bg-[rgba(221,219,255,0.75)] backdrop-blur-lg select-none"
        style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        onClick={togglePopup}
      >
        <span className="mr-2">Change Profile</span>
        <FaArrowRight size={20} />
      </button>

      {isPopupVisible && (
        <div
          ref={popupRef}
          className="absolute top-1/2 left-full ml-4 p-3 rounded-xl text-[rgb(252,252,255)] bg-[rgba(221,219,255,0.75)] backdrop-blur-lg transform -translate-y-1/2 overflow-auto select-none"
          style={{
            width: '75%',
            maxHeight: '14rem',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
          }}
        >
          {userProfiles.slice(0, 3).map((profile, index) => (
            <div key={index} className={`flex items-center p-1 ${index < userProfiles.length - 1 ? 'border-b border-[rgb(252,252,255)]' : ''}`}>
              <button
                className="flex items-center w-full text-left bg-transparent hover:bg-[rgba(200,195,255,0.75)] rounded-xl select-none p-1"
                onClick={() => handleProfileClick(profile)}
              >
                <img
                  src={`${profile.profilePicture}.png` || 'https://placehold.jp/3d4070/ffffff/50x50.png?text=No%20Image'}
                  alt={profile.profileName}
                  height={300}
                  width={300}
                  className="w-12 h-12 rounded-full mr-2 object-cover"
                />
                <span className="font-bold truncate w-[calc(100%-3rem)]">{profile.profileName || 'Unnamed Profile'}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeProfileButton;
