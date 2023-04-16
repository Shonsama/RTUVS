import { ROSNode } from './api/types';

type LeftBarProps = {
  cur: string;
  nodes: ROSNode[];
};

const LeftBar: React.FC<LeftBarProps> = ({ cur, nodes }) => {
  return (
    <aside className="flex flex-col items-center w-56 p-3 h-full border-b bg-gray-100">
      <nav className="w-full">
        <button className="w-full mb-2 text-center rounded-md px-2 py-1 bg-blue-600 hover:bg-blue-700">
          +
        </button>
        {nodes.map((node) => {
          if (node.id === cur) {
            return (
              <div
                key={node.name}
                className="w-full cursor-pointer text-center rounded-md mb-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 focus:bg-gray-200"
              >
                {node.name}
              </div>
            );
          } else {
            return (
              <div
                key={node.name}
                className="w-full cursor-pointer text-center rounded-md mb-2 px-2 py-1 hover:bg-gray-300 focus:bg-gray-200"
              >
                {node.name}
              </div>
            );
          }
        })}
      </nav>
    </aside>
  );
};

export default LeftBar;
