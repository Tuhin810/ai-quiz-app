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
        model: "mistralai/mistral-7b-instruct",
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
