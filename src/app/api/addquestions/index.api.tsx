import axios from "axios";

const BASE_URL = "https://quiz.tuhinthakur.me";

/**
 * Adds multiple questions to a quiz using quizId in query
 * @param quizId string - The quiz ID
 * @param questions array - List of questions with options & correct answer index
 */
export const addMultipleQuestionsToQuiz = async (
  quizId: any,
  questions: any
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/questions/add-question-bulk`,
      questions,
      { params: { quizId } }
    );

    return response.data;
  } catch (error: any) {
    console.error("❌ Error adding questions:", error);
    throw error?.response?.data || { message: "Something went wrong!" };
  }
};
