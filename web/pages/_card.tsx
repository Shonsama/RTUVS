import { ROSNode } from './api/types';
interface CardProps {
  node: ROSNode;
}

const Card: React.FC<CardProps> = ({ node }) => {
    return (
      <div className="group w-72 mr-8 mb-8 rounded-lg border px-3 py-2 transition-colors border-gray-300 bg-gray-100 bg-opacity-30">
        <div className="px-3 py-2">
          <h2 className="mb-3 text-2xl font-semibold">{node.name}</h2>
          
        </div>
      </div>
    );
  };
  

export default Card;
