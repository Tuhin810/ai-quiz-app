import axios from "axios";

export const getQuizForAttempt = async (quizId: string, userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8989/api/v1/attempt/attempt-quiz`,
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
