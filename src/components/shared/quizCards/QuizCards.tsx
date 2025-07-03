import { formatToReadableDate } from "@/services/dateformat";
import React from "react";
import { RiQuestionnaireFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const QuizCards = ({ quiz, questionsCount, date }: any) => {
  console.log("=====Card Quiz", quiz);
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/quiz?quizId=${quiz._id}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="max-w-sm w-full h-44 cursor-pointer hover:shadow-md hover:bg-gray-50 rounded-xl border border-gray-200 bg-white shadow p-4 flex flex-col justify-between"
    >
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {/* {title} */}
          {quiz?.title}
        </h3>

        {/* Description */}
        <div className="text-xs text-gray-500 line-clamp-2">
          {/* {description} */}
          {quiz?.description}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs">
          {quiz?.tags.map((tag: any, i: any) => (
            <span
              key={i}
              className={`px-2 py-1 rounded-full ${
                i % 2 == 0
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-1 flex justify-between items-center text-xs text-gray-500 font-semibold">
        <div className="flex gap-2 items-center">
          <span>{formatToReadableDate(date)}</span>
          <span className="flex items-center gap-1">
            <RiQuestionnaireFill size={16} />
            {questionsCount} Questions
          </span>
        </div>
        {/* <img
          className="h-8 w-8 rounded-full object-cover"
          src={userImg}
          alt="user"
        /> */}
      </div>
    </div>
  );
};

export default QuizCards;
