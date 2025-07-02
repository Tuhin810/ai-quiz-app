import QuizList from "@/components/main/quizList/QuizList";
import Navbar from "@/components/shared/navbar/Navbar";
import UserSidebar from "@/components/shared/userSidebar/UserSidebar";
import React from "react";

const quizzes = [
  {
    title: "Mastering UI Design for Impactful Solutions",
    description:
      "Learn how to build stunning and accessible interfaces using modern UI principles.",
    tags: ["UI/UX"],
    urgency: "Not Urgent",
    enrolledCount: 10,
    hostedAgo: "Hosted 2h ago",
    questionsCount: 10,
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s",
    bgImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GGOg-GQfWhriydCXcNxdZr-CcEho3a2skw&s",
  },
];

const page = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <UserSidebar />
      <div className="w-full">
        <Navbar />
        <QuizList quizzes={quizzes} />
      </div>
    </div>
  );
};

export default page;
