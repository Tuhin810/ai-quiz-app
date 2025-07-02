"use client";

import React, { useState } from "react";
import { MdOutlineQuiz, MdOutlineCheckCircle, MdAdd } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const QuizSidebar = () => {
  const [questions, setQuestions] = useState<string[]>([
    "What does UI stand for?",
    "Which aspect of UI design...",
    "How to export a picture...",
    "Which term refers to t...",
    "Why is maintaining co...",
  ]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, `New Question ${prev.length + 1}`]);
  };

  return (
    <div className="w-1/4 min-h-screen bg-gray-100 border-r border-gray-200 p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-sm text-gray-500">
            QUESTION ({questions.length})
          </div>
          <button
            onClick={addQuestion}
            className="p-1 rounded-full hover:bg-gray-200 transition"
            title="Add Question"
          >
            <MdAdd className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Question List */}
        <div className="space-y-3">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="border border-gray-300 bg-white rounded-xl p-3 flex items-start justify-between shadow-sm hover:shadow-md transition"
            >
              <div>
                <div className="text-md font-semibold">
                  {idx + 1}. {q.slice(0, 25)}
                  {q.length > 25 ? "..." : ""}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MdOutlineQuiz className="text-gray-500" />
                  Multiple choice
                </div>
              </div>
              <BsThreeDots className="text-gray-400 mt-1 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      {/* Result Screen */}
      <div className="mt-6">
        <div className="border border-gray-300 rounded-xl p-3 flex items-center justify-between hover:shadow-md transition cursor-pointer">
          <div className="flex items-center gap-2">
            <MdOutlineCheckCircle className="text-gray-500 text-xl" />
            <div>
              <div className="text-sm font-semibold">Result Screen</div>
              <div className="text-xs text-gray-500">
                Set your Passed/failed message
              </div>
            </div>
          </div>
          <BsThreeDots className="text-gray-400 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default QuizSidebar;
