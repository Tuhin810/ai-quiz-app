import QuizAttempt from "@/components/main/attemptQuiz";
import Navbar from "@/components/shared/navbar/Navbar";
import UserSidebar from "@/components/shared/userSidebar/UserSidebar";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen overflow-hidden">
        <UserSidebar />
        <div className="w-full">
          <Navbar />
          <QuizAttempt />
        </div>
      </div>
    </Suspense>
  );
};

export default page;
