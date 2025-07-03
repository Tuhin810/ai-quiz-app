import React from "react";

interface ScoreCardProps {
  score: number;
  quiz: {
    _id: string;
    title: string;
    description: string;
  };
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, quiz }) => {
  return (
    <div className="border border-gray-200 w-72 h-fit rounded-xl shadow-md p-5 bg-white space-y-4">
      <div>
        <h3 className="text-sm text-gray-500 mb-1">Quiz Title</h3>
        <p className="text-md font-medium text-gray-700">{quiz.title}</p>
      </div>

      <div>
        <h3 className="text-sm text-gray-500 mb-1">Description</h3>
        <p className="text-sm text-gray-600">{quiz.description}</p>
      </div>

      <div>
        <h3 className="text-sm text-gray-500 mb-1">Your Score</h3>
        <p
          className={`text-lg font-bold ${
            score === 0
              ? "text-red-500"
              : score < 5
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >
          {score}
        </p>
      </div>
    </div>
  );
};

export default ScoreCard;
