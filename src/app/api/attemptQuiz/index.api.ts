import axios from "axios";

export const getQuizForAttempt = async (quizId: string, userId: any) => {
  try {
    const response = await axios.get(
      `https://quiz.tuhinthakur.me/api/v1/attempt/attempt-quiz`,
      {
        params: {
          quizId,
          userId,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to fetch quiz for attempt:", error);
    throw error?.response?.data || { message: "Unknown error" };
  }
};
