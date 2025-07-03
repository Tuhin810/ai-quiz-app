import React from "react";
import { MdAdd, MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";

const QuizForm = ({
  index,
  question,
  options,
  correctAnswers,
  multipleAnswers,
  onChange,
  _id,
  selectedIndex,
  setSelectedIndex,
  attempted,
  quizData,
}: any) => {
  const handleChange = (updated: any) => {
    onChange(index, {
      question,
      _id,
      options,
      correctAnswers,
      multipleAnswers,
      ...updated,
    });
  };

  const toggleCorrect = (optionId: any) => {
    handleChange({ correctAnswers: optionId });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 mb-5 rounded-2xl bg-white border-2 border-gray-200 shadow max-w-4xl space-y-8"
    >
      <div>
        <label className="font-semibold text-gray-800 text-md mb-2 block flex items-center gap-2">
          <BsFillQuestionCircleFill /> Question{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="text-xl mb-5">{question}</div>
      </div>

      {/* Options */}
      <div className="space-y-4 -mt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-md text-gray-700">Choices</h3>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            Select the correct answer answers
          </label>
        </div>
        {attempted ? (
          <div className="space-y-4 mt-6">
            {/* ✅ Correct Answer */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                ✅ Correct Answer
              </label>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg border border-green-300">
                {quizData?.questions[selectedIndex]?.correctOption?.text || "—"}
              </div>
            </div>

            {/* 🧍 Your Answer */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                🧍 Your Answer
              </label>
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300">
                {quizData?.questions[selectedIndex]?.selectedOption?.text ||
                  "—"}
              </div>
            </div>
          </div>
        ) : (
          <>
            {options.map((opt: any, idx: any) => (
              <div key={idx} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    console.log("selected", opt?.option_id);
                    toggleCorrect(opt?.option_id);
                  }}
                >
                  {correctAnswers === opt?.option_id ? (
                    <IoCheckbox className="text-blue-600 text-2xl" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="text-gray-400 text-2xl" />
                  )}
                </button>
                <div className="flex-1 p-2 bg-gray-100 rounded-lg text-md">
                  {opt?.text}
                </div>
              </div>
            ))}
          </>
        )}

        <button
          onClick={() => setSelectedIndex(selectedIndex + 1)}
          className="flex items-center gap-2 text-sm mt-3 text-gray-800 font-semibold ml-8
          hover:text-blue-800 border border-gray-300 border-3 px-3 py-2 rounded-md transition duration-200"
        >
          Go Next
        </button>
      </div>
    </motion.div>
  );
};

export default QuizForm;
