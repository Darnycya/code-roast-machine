import type { RoastRequest, RoastResponse } from "../types/roast";

const API_URL =
  import.meta.env.DEV
    ? "http://localhost:4000/api/roast"
    : "/.netlify/functions/roast";

export const getRoast = async (request: RoastRequest): Promise<RoastResponse> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const data: RoastResponse = await res.json();

    return {
      roastSummary: data.roastSummary ?? "No summary available.",
      biggestOffense: data.biggestOffense ?? "No offense found.",
      roastPoints: data.roastPoints ?? ["No roast points available."],
      actualAdvice: data.actualAdvice ?? ["No advice available."],
      severity: data.severity ?? 0,
    };
  } catch (err) {
    console.error("Failed to fetch roast:", err);
    throw err;
  }
};
