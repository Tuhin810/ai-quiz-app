export async function POST(req: Request) {
  const { topic, count, difficulty } = await req.json();

  const prompt = `
Generate ${count} ${difficulty} level multiple choice questions on the topic "${topic}".
Return strictly JSON like:
{
  "questions": [
    {
      "text": "...",
      "options": ["..."],
      "correctOptionIndex": 0
    }
  ]
}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );

  const data = await response.json();

  const content = data.choices?.[0]?.message?.content || "{}";

  try {
    console.log("======> api response ", content);
    const json = JSON.parse(content);
    return Response.json(json);
  } catch (err) {
    console.error("❌ JSON parse error:", err);
    return Response.json(
      { error: "Failed to parse AI response." },
      { status: 500 }
    );
  }
}
