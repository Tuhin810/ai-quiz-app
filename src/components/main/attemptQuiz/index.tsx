"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { addMultipleQuestionsToQuiz } from "@/app/api/addquestions/index.api";
import { useRouter } from "next/navigation";
import QuizSidebar from "./sidebar/QuizSidebar";
import QuizForm from "./quizform/QuizForm";
import { getQuizForAttempt } from "@/app/api/attemptQuiz/index.api";
import { submitQuiz } from "@/app/api/submitQuiz/index.api";
import ScoreCard from "@/components/shared/scoreCard/ScoreCard";
import AiChatBot from "@/components/shared/aiChatBot/AiChatBot";

const QuizAttempt = () => {
  const searchParams = useSearchParams();
  const quizId: any = searchParams.get("quizId");

  const [forms, setForms] = useState<any[]>([
    {
      _id: "",
      question: "",
      options: [],
      correctAnswers: "",
      multipleAnswers: false,
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [quizData, setQuizData] = useState<any>([]);

  const updateForm = (index: number, updatedData: any) => {
    const updatedForms = [...forms];
    updatedForms[index] = updatedData;
    setForms(updatedForms);
  };

  const addForm = () => {
    setForms((prev) => [
      ...prev,
      {
        _id: "",
        question: "",
        options: [],
        correctAnswers: "",
        multipleAnswers: false,
      },
    ]);
    setSelectedIndex(forms.length); // 👈 Select newly added form
  };

  const handleSubmit = async () => {
    setLoading(true);
    const answers = forms
      .map((form) => {
        const selected = form.correctAnswers; // 👈 Assume single answer
        if (form.correctAnswers.length <= 1) return null;

        return {
          question_id: form._id,
          selected_option_id: form.correctAnswers,
        };
      })
      .filter(Boolean);

    const payload = { answers };
    const result = await submitQuiz(
      quizId,
      "68643c2383001c04b2de6848",
      payload
    );
    console.log("======>submit answer response", result);

    try {
      console.log("🚀 Final Payload:", payload);
    } catch (err: any) {
      console.error("❌ Failed to submit attempt:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const quizData = await getQuizForAttempt(
        quizId,
        "68643c2383001c04b2de6848"
      );

      if (quizData.attempted) {
        console.log("✅ Already attempted. Score:", quizData.score);
        setAttempted(true);
        setQuizData(quizData);
        setForms(
          quizData.questions.map((question: any) => ({
            _id: question.question_id,
            question: question.text,
            options: question.options,
            correctAnswers: question.correctOptionIndex
              ? [question.correctOptionIndex]
              : [],
            multipleAnswers: false, // Assuming single answer for now
          }))
        );
      } else {
        console.log("🆕 Not attempted. Start quiz now!");
        setForms(
          quizData.questions.map((question: any) => ({
            _id: question.question_id,
            question: question.text,
            options: question.options,
            correctAnswers: question.correctOptionIndex
              ? [question.correctOptionIndex]
              : [],
            multipleAnswers: false, // Assuming single answer for now
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  return (
    <div className="flex min-h-screen pt-1">
      {loading ? null : (
        <>
          <QuizSidebar
            setForms={setForms}
            forms={forms}
            handleSubmit={handleSubmit}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            addForm={addForm}
          />
          <div className="w-full flex justify-between h-screen overflow-y-scroll p-10">
            <div className={`${attempted ? "w-4/5 mr-5" : "w-full"}`}>
              {forms[selectedIndex] && (
                <QuizForm
                  quizData={attempted ? quizData : null}
                  key={selectedIndex}
                  index={selectedIndex}
                  {...forms[selectedIndex]}
                  onChange={updateForm}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  attempted={attempted}
                />
              )}
            </div>

            {attempted && (
              <ScoreCard score={quizData?.score} quiz={quizData?.quiz} />
            )}
          </div>
          {attempted && quizData?.questions && (
            <AiChatBot quizData={quizData?.questions[selectedIndex]} />
          )}
        </>
      )}
    </div>
  );
};

export default QuizAttempt;
