import Image from "next/image";

interface CommunityMiniatureProps {
  community: {
    id: number;
    name: string;
    description: string;
    members: string[];
    img_url: string;
    sections: {
      name: string;
      chats: {
        name: string;
        id: number;
      }[];
    }[];
  };
  currentCommunity: {
    id: number;
    name: string;
    description: string;
    members: string[];
    img_url: string;
    sections: {
      name: string;
      chats: {
        name: string;
        id: number;
      }[];
    }[];
  };
}

const CommunityMiniature = ({
  community,
  currentCommunity,
}: CommunityMiniatureProps) => {

  return (
    <div
      className={`flex rounded-xl h-12 w-12 hover:bg-secondary transition-colors duration-300 ease-in-out justify-center items-center p-1 select-none ${
        currentCommunity.id==community.id ? "bg-background-2" : ""
      }`}
    >
      <div key={community.id}>
        <div className="rounded-full h-11 w-11 overflow-hidden">
          <Image
            src={community.img_url}
            alt={community.name}
            width={256}
            height={256}
            className="object-cover h-full w-full"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityMiniature;
