import { useEffect, useState } from 'react';
type StreamProps = {
    topicName: String;
};
const Stream: React.FC<StreamProps> = ({ topicName }) => {
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    const fetchStreamUrl = async () => {
    };

    fetchStreamUrl();
  }, [topicName]);

  if (!streamUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <video src={streamUrl} controls />
    </div>
  );
};

export default Stream;
