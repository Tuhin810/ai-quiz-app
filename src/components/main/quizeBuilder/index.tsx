"use client";

import React, { useState } from "react";
import QuizSidebar from "./sidebar/QuizSidebar";
import QuizForm, { QuizData } from "./quizform/QuizForm";

const QuizBuilder = () => {
  const [forms, setForms] = useState<QuizData[]>([
    {
      question: "",
      options: ["", ""],
      correctAnswers: [],
      multipleAnswers: false,
    },
  ]);

  const updateForm = (index: number, updatedData: QuizData) => {
    const updatedForms = [...forms];
    updatedForms[index] = updatedData;
    setForms(updatedForms);
  };

  const addForm = () => {
    setForms((prev) => [
      ...prev,
      {
        question: "",
        options: ["", ""],
        correctAnswers: [],
        multipleAnswers: false,
      },
    ]);
  };

  const handleSubmit = () => {
    const payload = {
      questions: forms.map((form) => ({
        text: form.question,
        options: form.options,
        correctOptionIndex: form.multipleAnswers
          ? form.correctAnswers
          : form.correctAnswers[0],
      })),
    };

    console.log("Payload ready to send:", payload);
    // You can now POST this to your API endpoint
    // fetch("/api/submit-quiz", { method: "POST", body: JSON.stringify(payload) })
  };

  return (
    <div className="flex min-h-screen">
      <QuizSidebar setForms={setForms} forms={forms} />
      <div className="w-full h-screen overflow-y-scroll p-10 space-y-5">
        {forms.map((form, idx) => (
          <QuizForm key={idx} index={idx} {...form} onChange={updateForm} />
        ))}

        <div className="flex gap-4 mt-10">
          <button
            onClick={addForm}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            + Add New Question
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizBuilder;
