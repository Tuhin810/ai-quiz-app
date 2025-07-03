import QuizBuilder from "@/components/main/quizeBuilder";
import Navbar from "@/components/shared/navbar/Navbar";
import UserSidebar from "@/components/shared/userSidebar/UserSidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <UserSidebar />

      <div className="w-full">
        <Navbar />
        <QuizBuilder />
      </div>
    </div>
  );
};

export default page;
