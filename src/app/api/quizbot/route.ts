import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { context, conversation } = await req.json();

  if (!context || !conversation) {
    return Response.json({ error: "Missing data." }, { status: 400 });
  }

  const { question, correctAnswer, MyselectedAnswer } = context;

  const formattedHistory = conversation.map((msg: any) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.text,
  }));

  const systemPrompt = `
You're an AI assistant helping a user with a quiz. Only reply based on the provided context.

Context:
- Question: "${question}"
- Correct Answer: "${correctAnswer}"
- User's Selected Answer: "${MyselectedAnswer}"

Do not discuss unrelated topics. Stay on the subject of the question.
`;

  try {
    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            ...formattedHistory,
          ],
        }),
      }
    );

    const data = await aiResponse.json();
    const reply = data.choices?.[0]?.message?.content || "🤖 No valid reply.";

    return Response.json({ reply });
  } catch (err) {
    console.error("❌ Chat API error:", err);
    return Response.json({ error: "AI request failed." }, { status: 500 });
  }
}
