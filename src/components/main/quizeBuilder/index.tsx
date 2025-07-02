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

  const [selectedIndex, setSelectedIndex] = useState(0); // 🧠 Track selected form

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
    setSelectedIndex(forms.length); // 👈 Select newly added form
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
    // fetch("/api/submit-quiz", { method: "POST", body: JSON.stringify(payload) })
  };

  return (
    <div className="flex min-h-screen pt-1">
      <QuizSidebar
        setForms={setForms}
        forms={forms}
        handleSubmit={handleSubmit}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        addForm={addForm}
      />
      <div className="w-full h-screen overflow-y-scroll p-10">
        {/* 🚀 Only show selected form */}
        {forms[selectedIndex] && (
          <QuizForm
            key={selectedIndex}
            index={selectedIndex}
            {...forms[selectedIndex]}
            onChange={updateForm}
          />
        )}
      </div>
    </div>
  );
};

export default QuizBuilder;
