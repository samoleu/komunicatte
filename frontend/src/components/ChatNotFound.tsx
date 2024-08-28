import React from 'react'
import Image from 'next/image'
import KomunicatteLogo from "../../public/komunicatte.svg"

const ChatNotFound = () => {
  return (
    <div className='flex justify-center items-center w-full bg-background'>
      <div className='w-96 h-96'>
        <Image src={KomunicatteLogo} alt='komunicatte logo' width={480} height={480} />
      </div>
    </div>
  )
}

export default ChatNotFound