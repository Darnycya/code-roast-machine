import type { RoastResponse } from "../../types/roast";

export const fakeRoast: RoastResponse = {
  roastSummary: "This function works, but only because JavaScript is forgiving.",
  biggestOffense: "Trying to do everything in one function.",
  roastPoints: [
    "This function has more responsibilities than a team lead.",
    "Your variable names suggest you gave up halfway through."
  ],
  actualAdvice: [
    "Split logic into smaller functions.",
    "Use clearer variable names.",
    "Add early returns for edge cases."
  ],
  severity: 7
};
