// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey:
//     process.env.OPENAI_API_KEY ||
//     "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",
// });

// type Difficulty = "easy" | "medium" | "hard";

// interface Question {
//   text: string;
//   options: string[];
//   correctOptionIndex: number;
// }

// interface QuizPayload {
//   questions: Question[];
// }

// /**
//  * Generates quiz questions using OpenAI based on topic, difficulty and count
//  * @param topic string - e.g., "JavaScript"
//  * @param count number - e.g., 5
//  * @param difficulty Difficulty - "easy" | "medium" | "hard"
//  * @returns QuizPayload
//  */
// export const generateQuizQuestions = async (
//   topic: string,
//   count: number,
//   difficulty: Difficulty
// ): Promise<QuizPayload> => {
//   const prompt = `
// Generate ${count} ${difficulty} level multiple choice questions on the topic "${topic}".
// Return the result strictly as a JSON object with this format:

// {
//   "questions": [
//     {
//       "text": "Question here?",
//       "options": ["Option A", "Option B", "Option C", "Option D"],
//       "correctOptionIndex": 1
//     }
//   ]
// }
//   `;

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "user",
//           content: prompt.trim(),
//         },
//       ],
//       temperature: 0.7,
//     });

//     const jsonString = response.choices[0].message?.content || "";
//     const parsed = JSON.parse(jsonString);

//     if (!parsed.questions || !Array.isArray(parsed.questions)) {
//       throw new Error("Invalid format returned from OpenAI");
//     }

//     return parsed;
//   } catch (error) {
//     console.error("❌ Error generating quiz questions:", error);
//     throw error;
//   }
// };
