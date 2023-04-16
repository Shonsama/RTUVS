interface CardProps {
  title: string;
  content: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
    return (
      <div className="group rounded-lg border px-5 py-4 transition-colors border-gray-300 bg-gray-100 bg-opacity-30">
        <div className="px-3 py-2">
          <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
          <div className="mt-2 text-gray-600">{content}</div>
        </div>
      </div>
    );
  };
  

export default Card;
