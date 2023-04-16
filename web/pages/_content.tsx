import { useState } from 'react';
import { ROSNode, Topic } from './api/types';

type ContentProps = {
  node: ROSNode;
  topics: Topic[];
};

const ContentPage: React.FC<ContentProps> = ({ node, topics }) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="flex flex-col h-full ">
      <header className="p-4 border-b flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Name: {node.name}</h1>
          <p className="text-gray-500">IP: {node.id}</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-600 text-white">
            Edit
          </button>
          <button className="p-2 bg-red-500 rounded hover:bg-red-600 focus:bg-red-600 text-white">
            Delete
          </button>
        </div>
      </header>
      <div className="flex-grow p-6">
        <div className="grid grid-cols-4 gap-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-gray-200 p-4 rounded-lg cursor-pointer"
            >
              <h2 className="text-lg font-medium mb-2">{topic.name}</h2>
              <p className="text-gray-500">{topic.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
