"use client";

import { getUnAttemptedQuizzes } from "@/app/api/getQuiz/getUnattemptedQuiz";
import QuizList from "@/components/main/quizList/QuizList";
import Navbar from "@/components/shared/navbar/Navbar";
import UserSidebar from "@/components/shared/userSidebar/UserSidebar";
import React, { useEffect, useState } from "react";

const page = () => {
  const [unattemptedQuizzes, setUnAttemptedQuizzes] = useState<any>([]);
  const [error, setError] = useState("");
  let userId = null;

  if (typeof window !== "undefined") {
    const storedUserId = localStorage.getItem("userId");
    userId = storedUserId ? JSON.parse(storedUserId) : null;
  }
  const loadAttempts = async () => {
    console.log("====>userId0", userId);
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
