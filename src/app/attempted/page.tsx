"use client";
import { getAttemptedQuizzes } from "@/app/api/getQuiz/getAttempetdQuiz.api";
import QuizList from "@/components/main/quizList/QuizList";
import Navbar from "@/components/shared/navbar/Navbar";
import UserSidebar from "@/components/shared/userSidebar/UserSidebar";
import React, { Suspense, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const page = () => {
  const [attemptedQuizzes, setAttemptedQuizzes] = useState<any>([]);
  const [error, setError] = useState("");
  const { user } = useUser();

  const loadAttempts = async () => {
    console.log("====>userId0", user?._id);
    try {
      const data = await getAttemptedQuizzes(user?._id);
      setAttemptedQuizzes(data.result);
      console.log("===>attemptedQuizzes", data.result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch attempts.");
    }
  };
  useEffect(() => {
    loadAttempts();
  }, [user]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen overflow-hidden">
        <UserSidebar />
        <div className="w-full">
          <Navbar />

          <QuizList quizzes={attemptedQuizzes} attempted={true} />
        </div>
      </div>
    </Suspense>
  );
};

export default page;
