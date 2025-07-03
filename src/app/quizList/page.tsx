"use client";

import { getUnAttemptedQuizzes } from "@/api/getQuiz/getUnattemptedQuiz";
import QuizList from "@/components/main/quizList/QuizList";
import Navbar from "@/components/shared/navbar/Navbar";
import UserSidebar from "@/components/shared/userSidebar/UserSidebar";
import React, { useEffect, useState } from "react";

const page = () => {
  const [unattemptedQuizzes, setUnAttemptedQuizzes] = useState<any>([]);
  const [error, setError] = useState("");

  const userId = "68642c6383001c04b2de6833"; // Normally from session/auth context

  const loadAttempts = async () => {
    try {
      const data = await getUnAttemptedQuizzes(userId);
      setUnAttemptedQuizzes(data.result);
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
        <QuizList quizzes={unattemptedQuizzes} attempted={false} />
      </div>
    </div>
  );
};

export default page;
