// create wrapper components 
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export const FlvNextPlayer = dynamic(
  () => import("@asurraa/react-ts-flv-player/dist/NextReactFlvPlayer"),
  {
    ssr: false,
  }
);

type StreamProps = {
  topicName: string;
};

const Stream: React.FC<StreamProps> = ({ topicName }) => {
  const [isValidFLV, setIsValidFLV] = useState(false);
  async function checkFLVStream(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.status === 200 && response.headers.get("content-type") === "video/x-flv") {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  useEffect(() => {
    async function validateFLV() {
      const isValid = await checkFLVStream(topicName);
      setIsValidFLV(isValid);
    }
    if (topicName) {
      validateFLV();
    }
  }, [topicName]);

  return ( 
    <div>
       {isValidFLV ? (
         <FlvNextPlayer
           url={topicName}
           isMuted={false}
           isLive={true}
           enableStashBuffer={true}
         />
       ) : (
         <p>No live stream</p>
       )}
    </div>
  );
};

export default Stream;
