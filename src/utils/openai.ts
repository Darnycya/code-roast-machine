import type { RoastRequest, RoastResponse } from "../types/roast";

export const getRoast = async (request: RoastRequest): Promise<RoastResponse> => {
  try {
    const res = await fetch("http://localhost:4000/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    // Always attempt to parse JSON
    const data: RoastResponse = await res.json();

    // Ensure the returned object has all keys to avoid undefined errors
    return {
      roastSummary: data.roastSummary ?? "No summary available.",
      biggestOffense: data.biggestOffense ?? "No offense found.",
      roastPoints: data.roastPoints ?? ["No roast points available."],
      actualAdvice: data.actualAdvice ?? ["No advice available."],
      severity: data.severity ?? 0,
    };
  } catch (err) {
    console.error("Failed to fetch roast, using fallback:", err);

    // Fallback roast if fetch fails
    return {
      roastSummary: "Fake roast engaged 😎",
      biggestOffense: "You forgot semicolons… classic mistake.",
      roastPoints: [
        "Variables are all over the place.",
        "Functions are way too long.",
        "Comments? What comments?"
      ],
      actualAdvice: [
        "Add semicolons where needed.",
        "Refactor your functions into smaller pieces.",
        "Document your code for future you."
      ],
      severity: 5,
    };
  }
};
