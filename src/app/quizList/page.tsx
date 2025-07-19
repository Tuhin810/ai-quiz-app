"use client";

import { getUnAttemptedQuizzes } from "@/app/api/getQuiz/getUnattemptedQuiz";
import QuizList from "@/components/main/quizList/QuizList";
import Navbar from "@/components/shared/navbar/Navbar";
import UserSidebar from "@/components/shared/userSidebar/UserSidebar";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const page = () => {
  const { user } = useUser();

  const [unattemptedQuizzes, setUnAttemptedQuizzes] = useState<any>([]);
  const [error, setError] = useState("");

  const loadAttempts = async () => {
    console.log("====>userId0", user);
    try {
      const data = await getUnAttemptedQuizzes(user?._id);
      setUnAttemptedQuizzes(data.result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch attempts.");
    }
  };
  useEffect(() => {
    loadAttempts();
  }, [user]);
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
