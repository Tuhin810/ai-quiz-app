import axios from "axios";

const BASE_URL = "http://localhost:8989";

/**
 * Create a new quiz (admin only)
 * @param userId string - ID of the user creating the quiz (admin)
 * @param title string - title of the quiz
 * @param description string - optional description
 * @param tags string[] - optional tags array
 */
export const createQuiz = async ({
  userId,
  title,
  description,
  tags,
}: {
  userId: string;
  title: string;
  description?: string;
  tags?: string[];
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/quiz/create-quiz`, {
      userId,
      title,
      description,
      tags,
    });

    return response.data; // Contains { message, result }
  } catch (error: any) {
    console.error("Error creating quiz:", error);
    throw error?.response?.data || { message: "Unknown error" };
  }
};
