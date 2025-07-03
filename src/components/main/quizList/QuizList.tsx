"use client";

import React, { useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import QuizCards from "@/components/shared/quizCards/QuizCards";

const QuizList = ({ quizzes, attempted }: any) => {
  console.log("=====>got quizzes", quizzes);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("All");

  const filters = ["All", "UI/UX", "Frontend", "Urgent", "Completed"];

  // Optional: filter logic (not active yet)
  // const filteredQuizzes =
  //   filter === "All"
  //     ? quizzes
  //     : quizzes.filter((q: any) => q.tags.includes(filter.replace(" ", "")));

  return (
    <div className="p-10 space-y-6 h-screen w-full overflow-y-scroll pb-20">
      {/* Toolbar */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-3 py-1 rounded-lg text-sm border border-gray-300 ${
                filter === item
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded ${
              view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <FiGrid />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded ${
              view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            <FiList />
          </button>
        </div>
      </div>

      {/* Quiz Cards */}
      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }`}
      >
        {attempted ? (
          <>
            {quizzes.map((quiz: any, index: any) => (
              <QuizCards
                key={index}
                quiz={quiz?.quiz}
                date={quiz?.attemptedAt}
                questionsCount={quiz?.totalQuestions}
              />
            ))}
          </>
        ) : (
          <>
            {quizzes.map((quiz: any, index: any) => (
              <QuizCards
                key={index}
                quiz={quiz?.quiz}
                date={quiz?.quiz?.createdAt}
                questionsCount={5}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizList;
