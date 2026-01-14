export type RoastMode = "mentor" | "senior" | "techLead";

export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "other";

export type RoastRequest = {
  code: string;
  language: Language;
  mode: RoastMode;
};

export type RoastResponse = {
  roastSummary: string;
  biggestOffense: string;
  roastPoints: string[];
  actualAdvice: string[];
  severity: number; // 1–10
};
