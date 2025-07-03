import React from "react";
import { MdAdd, MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import {
  BsFillQuestionCircleFill,
  BsQuestionSquareFill,
  BsTrash,
} from "react-icons/bs";
import { motion } from "framer-motion";

interface QuizFormProps {
  index: number;
  question: string;
  options: string[];
  correctAnswers: number[];
  multipleAnswers: boolean;
  onChange: (index: number, data: QuizData) => void;
}

export interface QuizData {
  question: string;
  options: string[];
  correctAnswers: number[];
  multipleAnswers: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({
  index,
  question,
  options,
  correctAnswers,
  multipleAnswers,
  onChange,
}) => {
  const handleChange = (updated: Partial<QuizData>) => {
    onChange(index, {
      question,
      options,
      correctAnswers,
      multipleAnswers,
      ...updated,
    });
  };

  const toggleCorrect = (idx: number) => {
    if (multipleAnswers) {
      const updated = correctAnswers.includes(idx)
        ? correctAnswers.filter((i) => i !== idx)
        : [...correctAnswers, idx];
      handleChange({ correctAnswers: updated });
    } else {
      handleChange({ correctAnswers: [idx] });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 mb-5 rounded-2xl bg-white border-2 border-gray-200 shadow max-w-4xl space-y-8"
    >
      {/* Question Field */}
      <div>
        <label className="font-semibold text-gray-800 text-md mb-2 block flex items-center gap-2">
          <BsFillQuestionCircleFill /> Question{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          value={question}
          onChange={(e) => handleChange({ question: e.target.value })}
          placeholder="Type your quiz question here..."
          className="w-full p-4 bg-gray-100 rounded-xl text-md placeholder-gray-500 placeholder:text-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          rows={3}
        />
      </div>

      {/* Options */}
      <div className="space-y-4 -mt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-md text-gray-700">Choices</h3>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            Select the correct answer answers
          </label>
        </div>

        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <button type="button" onClick={() => toggleCorrect(idx)}>
              {correctAnswers.includes(idx) ? (
                <IoCheckbox className="text-blue-600 text-2xl" />
              ) : (
                <MdCheckBoxOutlineBlank className="text-gray-400 text-2xl" />
              )}
            </button>
            <input
              value={opt}
              onChange={(e) => {
                const updated = [...options];
                updated[idx] = e.target.value;
                handleChange({ options: updated });
              }}
              placeholder={`Option ${idx + 1}`}
              className="flex-1 p-2 bg-gray-100 rounded-lg text-md"
            />
            {options.length > 2 && (
              <button
                onClick={() => {
                  const updated = options.filter((_, i) => i !== idx);
                  const updatedCorrect = correctAnswers.filter(
                    (i) => i !== idx
                  );
                  handleChange({
                    options: updated,
                    correctAnswers: updatedCorrect,
                  });
                }}
              >
                <BsTrash className="text-red-500" />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => handleChange({ options: [...options, ""] })}
          className="flex items-center gap-2 text-sm mt-3 text-gray-800 font-semibold ml-8
          hover:text-blue-800 border border-dashed border-gray-300 border-3 px-3 py-2 rounded-md transition duration-200"
        >
          <MdAdd className="text-base" />
          Add option
        </button>
      </div>
    </motion.div>
  );
};

export default QuizForm;
