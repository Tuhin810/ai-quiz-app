import axios from "axios";

const BASE_URL = "http://localhost:8989";

/**
 * Fetch all quizzes attempted by a user
 * @param userId string - ID of the user
 */
export const getUnAttemptedQuizzes = async (userId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/attempt/get-unattempted-quiz`,
      {
        params: { userId },
      }
    );

    return response.data; // Contains { message, attemptedQuizzes }
  } catch (error: any) {
    console.error("❌ Error fetching attempted quizzes:", error);
    throw error?.response?.data || { message: "Unknown error" };
  }
};
