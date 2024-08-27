import Image from "next/image";
import { BsGearFill } from "react-icons/bs";
import CommunitySection from "./CommunitySection";

interface CommunityNavProps {
  communityInfo: {
    name: string;
    description: string;
    img_url: string;
    members: string[];
    sections: {
      name: string;
      chats: {
        id: number;
        name: string;
      }[];
    }[];
  };
}

const CommunityNav = ({ communityInfo }: CommunityNavProps) => {
  return (
    <section className="flex flex-col h-full w-64 bg-background items-center">
      <div className="flex flex-col flex-nowrap items-center w-full">
        <div className="w-full h-48 justify-center items-center flex overflow-hidden">
          <Image
            src={communityInfo.img_url}
            alt={communityInfo.name}
            width={256}
            height={256}
          />
        </div>
        <div className="flex w-full justify-between items-center text-text px-4 py-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{communityInfo.name}</h2>
            <p>{communityInfo.members.length} members</p>
          </div>
          <button>
            <BsGearFill className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-col px-4 py-2 text-text w-full">
        {communityInfo.sections.map((section) => (
          <CommunitySection
            sectionTitle={section.name}
            chats={section.chats}
            key={communityInfo.sections.indexOf(section)}
          />
        ))}
      </div>
    </section>
  );
};

export default CommunityNav;
