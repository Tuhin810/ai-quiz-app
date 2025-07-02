"use client";

import React, { useState } from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdCheckBoxOutlineBlank,
  MdAdd,
} from "react-icons/md";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";

const QuizForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [multipleAnswers, setMultipleAnswers] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    setCorrectAnswers((prev) => prev.filter((i) => i !== index));
  };

  const toggleCorrect = (index: number) => {
    if (multipleAnswers) {
      setCorrectAnswers((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setCorrectAnswers([index]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 rounded-2xl bg-white border-2 border-gray-200 shadow max-w-4xl space-y-8"
    >
      {/* Question Field */}
      <div>
        <label className="font-semibold text-gray-800 text-lg mb-2 block flex gap-2 items-center">
          <FaQuestionCircle size={20} /> Question
          <span className="text-red-500">*</span>
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your quiz question here..."
          className="w-full p-4 bg-gray-100 rounded-xl text-lg placeholder-gray-500 placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          rows={3}
        />
      </div>

      {/* Choices + Toggle */}
      <div className="space-y-4 -mt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-md text-gray-700">Choices</h3>
          <h3 className="font-semibold text-md text-gray-700">
            Select the correct answer
          </h3>
        </div>

        {/* Options List */}
        {options.map((opt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-3 group"
          >
            <button
              type="button"
              onClick={() => toggleCorrect(idx)}
              className="text-xl text-purple-600"
            >
              {correctAnswers.includes(idx) ? (
                <IoCheckbox className="text-purple-600" />
              ) : (
                <MdCheckBoxOutlineBlank className="text-gray-400" />
              )}
            </button>

            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="flex-1 p-2 bg-gray-100 rounded-xl text-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            />

            {options.length > 2 && (
              <button
                onClick={() => removeOption(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <BsTrash />
              </button>
            )}
          </motion.div>
        ))}

        {/* Add Option Button */}
        <button
          type="button"
          onClick={addOption}
          className="flex items-center gap-2 text-sm mt-3 text-gray-800 font-semibold ml-8
          hover:text-blue-800 border border-dashed border-gray-300 border-3 px-3 py-2 rounded-md transition duration-200"
        >
          <MdAdd className="text-base" />
          Add answer
        </button>
      </div>
    </motion.div>
  );
};

export default QuizForm;
