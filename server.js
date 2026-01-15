import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/roast
app.post("/api/roast", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing 'code' in request body." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", //
      messages: [
        {
          role: "system",
          content: "You are a funny coding coach that roasts code and gives advice.",
        },
        {
          role: "user",
          content: `Analyze this code and roast it, then give advice: ${code}`,
        },
      ],
      temperature: 0.7,
    });

    const roastText = completion.choices[0].message.content;

    
    res.json({
      roastSummary: roastText.split("\n")[0] || "No summary",
      biggestOffense: roastText.split("\n")[1] || "No offense",
      roastPoints: roastText.split("\n").slice(2, 5) || ["No points"],
      actualAdvice: roastText.split("\n").slice(5, 8) || ["No advice"],
      severity: 3,
    });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({
      roastSummary: "Fallback roast 😎",
      biggestOffense: "You forgot semicolons… classic mistake.",
      roastPoints: [
        "Variables are all over the place.",
        "Functions are way too long.",
        "Comments? What comments?",
      ],
      actualAdvice: [
        "Add semicolons.",
        "Refactor functions into smaller pieces.",
        "Document your code.",
      ],
      severity: 5,
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
