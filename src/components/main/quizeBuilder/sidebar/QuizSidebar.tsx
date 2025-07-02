"use client";

import React, { useState } from "react";
import { MdOutlineQuiz, MdOutlineCheckCircle, MdAdd } from "react-icons/md";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiCursorClickDuotone } from "react-icons/pi";
import AiButton from "@/components/shared/aiButton/AiButton";

const QuizSidebar = ({
  setForms,
  forms,
  handleSubmit,
  selectedIndex,
  setSelectedIndex,
}: any) => {
  const [questions, setQuestions] = useState<string[]>(["New Question 1"]);

  const addQuestion = () => {
    setForms((prev: any) => [
      ...prev,
      {
        question: `New Question ${prev.length + 1}`,
        options: ["", ""],
        correctAnswers: [],
        multipleAnswers: false,
      },
    ]);
    setQuestions((prev) => [...prev, `New Question ${prev.length + 1}`]);
  };

  const deleteForm = (indexToDelete: number) => {
    setSelectedIndex(indexToDelete - 1);
    setForms((prev: any) =>
      prev.filter((_: any, i: number) => i !== indexToDelete)
    );
  };

  return (
    <div className="w-1/4 h-[92vh] pt-4 pb-8  bg-gray-200 border-r border-gray-200 px-4 flex flex-col justify-between">
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
          {forms.map((q: any, idx: any) => (
            <div
              key={idx}
              className="border border-gray-300 bg-white rounded-xl p-3 flex items-start justify-between shadow-sm hover:shadow-md transition"
            >
              <div onClick={() => setSelectedIndex(idx)}>
                <div className="text-md font-semibold flex  text-center mb-2">
                  <div className="bg-gray-200 rounded-lg mr-2 text-sm flex items-center text-center justify-center h-6 w-6">
                    {idx + 1}
                  </div>
                  {q.question.slice(0, 20)}...
                </div>
                {selectedIndex === idx ? (
                  <div className="text-xs text-greeb-500 flex items-center gap-1 mt-1">
                    <IoMdCheckmarkCircleOutline
                      className="text-gray-500"
                      size={18}
                    />
                    Selected Question
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <PiCursorClickDuotone className="text-gray-500" size={17} />
                    Click here to select the question
                  </div>
                )}
              </div>
              {forms.length > 1 && (
                <div
                  className="cursor-pointer pt-1"
                  onClick={() => {
                    setSelectedIndex(idx - 1);
                    deleteForm(idx);
                  }}
                >
                  <BsTrash className="text-gray-600 hover:text-red-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Result Screen */}
      <div className="mt-6">
        <AiButton />
        <div
          onClick={handleSubmit}
          className="border border-gray-300 bg-green-500 rounded-xl 
          p-3 flex items-center justify-between hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <MdOutlineCheckCircle className="text-gray-100 text-xl" />
            <div>
              <div className="text-sm text-white font-semibold">
                Submit Questions
              </div>
              <div className="text-xs text-gray-100">Click here to submit</div>
            </div>
          </div>
          <BsThreeDots className="text-gray-400 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default QuizSidebar;
