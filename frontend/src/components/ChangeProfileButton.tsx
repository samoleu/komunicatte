'use client';
import { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

type Profile = {
  accountRef: string;
  profileId: string;
  profileName?: string;
  profilePicture?: string;
};

const ChangeProfileButton = ({ profiles }: { profiles: Profile[] }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleProfileClick = (profileId: string) => {
    // Handle the profile click event (e.g., navigate to profile details)
    console.log(`Profile clicked: ${profileId}`);
    // You can add logic to navigate or show profile details here
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
          {profiles.slice(0, 3).map((profile, index) => (
            <div key={profile.profileId} className={`flex items-center p-1 ${index < profiles.length - 1 ? 'border-b border-[rgb(252,252,255)]' : ''}`}>
              <button
                className="flex items-center w-full text-left bg-transparent hover:bg-[rgba(176,169,255,0.75)] rounded-xl select-none p-1"
                onClick={() => handleProfileClick(profile.profileId)}
              >
                <img
                  src={profile.profilePicture || 'https://placehold.jp/3d4070/ffffff/50x50.png?text=No%20Image'}
                  alt={profile.profileName}
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
