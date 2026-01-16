import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are a senior software engineer who roasts code.

You MUST return ONLY valid JSON.
The response MUST be in JSON format.

JSON response shape:

{
  "roastSummary": string,
  "severity": number,
  "biggestOffense": string | null,
  "roastPoints": string[],
  "actualAdvice": string[]
}

Rules:

LANGUAGE CHECK:
- The user provides a selected programming language.
- Determine if the submitted code matches that language.
- If the language is incorrect:
  - Mention it clearly in roastSummary.
  - Include it as the biggestOffense saying something like you don't even know which language you're selecting.
- If correct, do NOT mention language mismatch.

ROAST MODE BEHAVIOR:
- mentor:
  - Gentle, encouraging tone
  - Explicitly mention you are going easy on them
  - Severity must be between 1 and 4
- senior:
  - Blunt, honest, mildly sarcastic
  - Severity must be between 4 and 7
- techLead:
  - Extremely harsh, impatient, chaotic
  - Explicitly mention they asked for this
  - Severity must be between 7 and 10

OFFENSE RULES:
- biggestOffense is ONLY for real issues:
  - Syntax errors
  - Broken logic
  - Wrong language selection
- If no real offense exists, biggestOffense must return "No big offenses, you got lucky this time."

CONTENT RULES:
- roastPoints = funny critiques (naming, style, complexity, readability)
- actualAdvice = concrete improvements only
`;

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
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `
Selected language: ${language}
Roast mode: ${roastMode}

Here is the code to analyze:

${code}

Remember: Respond in valid JSON only.
          `,
        },
      ],
    });

    // completion.choices[0].message.content is guaranteed JSON now
const roastData = completion.choices[0].message.content;

// If content is a string, parse it into an object
const parsedData =
  typeof roastData === "string" ? JSON.parse(roastData) : roastData;

return {
  statusCode: 200,
  body: JSON.stringify(parsedData),
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
