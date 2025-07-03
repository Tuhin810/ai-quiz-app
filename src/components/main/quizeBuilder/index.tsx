"use client";

import React, { useState } from "react";
import QuizSidebar from "./sidebar/QuizSidebar";
import QuizForm, { QuizData } from "./quizform/QuizForm";
import { useSearchParams } from "next/navigation";
import { addMultipleQuestionsToQuiz } from "@/app/api/addquestions/index.api";
import { useRouter } from "next/navigation";

const QuizBuilder = () => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");
  const router = useRouter();
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

  const handleSubmit = async () => {
    const payload = {
      questions: forms.map((form) => ({
        text: form.question,
        options: form.options,
        correctOptionIndex: form.correctAnswers[0] || 0, // Use first correct answer index
      })),
    };

    console.log("✅ Questions added:", payload);
    try {
      const result = await addMultipleQuestionsToQuiz(quizId, payload);
      router.push(`quizList`);
    } catch (err: any) {
      console.error("❌ Failed to add questions:", err.message);
    }
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
