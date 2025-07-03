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
          model: "mistralai/mistral-7b-instruct",
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
