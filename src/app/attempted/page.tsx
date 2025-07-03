"use client";
import { getAttemptedQuizzes } from "@/api/getQuiz/getAttempetdQuiz.api";
import QuizList from "@/components/main/quizList/QuizList";
import Navbar from "@/components/shared/navbar/Navbar";
import UserSidebar from "@/components/shared/userSidebar/UserSidebar";
import React, { useEffect, useState } from "react";

const page = () => {
  const [attemptedQuizzes, setAttemptedQuizzes] = useState<any>([]);
  const [error, setError] = useState("");

  const userId = "68642c6383001c04b2de6833"; // Normally from session/auth context

  const loadAttempts = async () => {
    try {
      const data = await getAttemptedQuizzes(userId);
      setAttemptedQuizzes(data.result);
      console.log("===>attemptedQuizzes", data.result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch attempts.");
    }
  };
  useEffect(() => {
    loadAttempts();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      <UserSidebar />
      <div className="w-full">
        <Navbar />

        <QuizList quizzes={attemptedQuizzes} attempted={true} />
      </div>
    </div>
  );
};

export default page;
