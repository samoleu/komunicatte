import React from 'react'
import ProfileCardConfig from './ProfileCardConfig'
import ChangeProfileButton from './ChangeProfileButton'

interface ProfileConfigGroupProps {
  profile: {
    accountRef: string;
    profileId: string;
    profileName: string;
    activityStatus: string;
    bio: string;
    profilePicture: string;
    friends: string[];
    communityRefs: string[];
  };
}

const ProfileConfigGroup = ({ profile } : ProfileConfigGroupProps) => {
  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <ProfileCardConfig profile={profile}/>
        <ChangeProfileButton />
      </div>
    </>
  )
}

export default ProfileConfigGroup