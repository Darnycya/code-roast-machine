import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `...YOUR EXISTING PROMPT...`;

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const { code, language, roastMode } = JSON.parse(event.body || "{}");

  if (!code || !language || !roastMode) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields." }),
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: roastMode === "techLead" ? 0.8 : 0.6,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `
Selected language: ${language}
Roast mode: ${roastMode}

Here is the code to analyze:

${code}
          `,
        },
      ],
    });

    const roastData = JSON.parse(
      completion.choices[0].message.content
    );

    return {
      statusCode: 200,
      body: JSON.stringify(roastData),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        roastSummary: "The roast engine crashed harder than this code.",
        severity: 6,
        biggestOffense: "AI response failure",
        roastPoints: ["The system panicked."],
        actualAdvice: ["Try again.", "Check server logs."],
      }),
    };
  }
}
