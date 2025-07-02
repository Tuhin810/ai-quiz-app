import React from "react";
import QuizSidebar from "./sidebar/QuizSidebar";
import QuizForm from "./quizform/QuizForm";

const QuizBuilder = () => {
  return (
    <div>
      <div className="flex ">
        <QuizSidebar />
        <div className="h-screen p-10 w-full overflow-y-scroll">
          <QuizForm />
        </div>
      </div>
    </div>
  );
};

export default QuizBuilder;
