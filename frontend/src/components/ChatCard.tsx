import {GeneralContext} from '@/context/GeneralContext';
import Image from 'next/image';
import { useContext } from 'react';

interface ChatProps {
  chat: { 
    nameChat: String,
    lastMessage: {
      message: String,
      sender: String,
      timestamp: Date,
      status: Boolean,
    },
    members: String[],
    _id: string
  }
};

const ChatCard = ({chat}: ChatProps) => {

  const context = useContext(GeneralContext);

  function handleCardClick() {
    context.handleActiveView({chatId: chat._id, type: 'chat'});
  }
    
  // TODO: change to profile picture in return
  return (
    <div className="items-center bg-white flex " onClick={handleCardClick}>
      <div className="p-2 w-96 h-20 gap-7 flex items-center">
        <div className='w-16 h-16 content-center overflow-hidden rounded-full'>
          <Image src={"./next.svg"} alt="profile picture" height={64} width={64}/> 
        </div>
        <div className="flex flex-col">
          <h2 className="text-text text-xl">{chat.nameChat}</h2>
          <p className="text-text-2 text-base h-5">{chat.lastMessage.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;