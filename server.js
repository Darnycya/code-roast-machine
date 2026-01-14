import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables
dotenv.config({ override: true });
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "loaded" : "missing");

// --------------------
// Local fallback roast
// --------------------
function getLocalFallbackRoast(code: string) {
  const roastPoints = [
    "Looks like a first-year coding bootcamp project.",
    "Did you write this after a triple espresso?",
    "Syntax errors are your best friends, I see.",
    "Indentation? Never heard of her.",
    "This function has more twists than a thriller novel.",
  ];

  const advice = [
    "Check your variables. Twice.",
    "Comment your code like it’s going out of style.",
    "Refactor before it refactors you.",
    "Read the docs. Seriously.",
    "Maybe try some tutorials again.",
  ];

  return {
    roastSummary: `Local roast: your ${
      code.length > 20 ? "code is… adventurous" : "snippet is tiny, but brave"
    }.`,
    biggestOffense:
      roastPoints[Math.floor(Math.random() * roastPoints.length)],
    roastPoints: roastPoints.sort(() => 0.5 - Math.random()).slice(0, 3),
    actualAdvice: advice.sort(() => 0.5 - Math.random()).slice(0, 3),
    severity: Math.floor(Math.random() * 6) + 4, // 4-9
  };
}

// --------------------
// Express server setup
// --------------------
const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("Server alive!"));

// Roast route
app.post("/api/roast", async (req, res) => {
  const { code, language, mode } = req.body;

  if (!code || !language || !mode) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Initialize OpenAI client
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are a ${mode} developer giving a roast of this ${language} code.
Provide JSON with keys: roastSummary, biggestOffense, roastPoints, actualAdvice, severity.
Code:
${code}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message?.content ?? "";

    try {
      // Try parsing AI response
      return res.json(JSON.parse(content));
    } catch (parseErr) {
      console.warn("Failed to parse AI response, using fallback", parseErr);
      return res.json(getLocalFallbackRoast(code));
    }
  } catch (err: any) {
    // Handle API errors (rate limits, invalid key, etc.)
    console.error("Roast failed:", err?.message ?? err);
    return res.json(getLocalFallbackRoast(code));
  }
});

// Catch unhandled promise rejections to keep server alive
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
