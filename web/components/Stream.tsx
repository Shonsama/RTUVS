import { useEffect, useState } from 'react';
type StreamProps = {
    topicName: String;
};
const Stream: React.FC<StreamProps> = ({ topicname }) => {
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const response = await axios.get(`/api/stream?topicname=${topicname}`);
        setStreamUrl(response.data.streamUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStreamUrl();
  }, [topicname]);

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
