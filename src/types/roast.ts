export type RoastMode = "mentor" | "senior" | "techLead";

export type Language =
  | "javascript"
  | "typescript"
  | "html"
  | "css"
  | "java"
  | "cpp"
  | "python"
  | "other";

export type RoastRequest = {
  code: string;
  language: Language;
  roastMode: RoastMode;
};

export type RoastResponse = {
  roastSummary: string;
  biggestOffense: string;
  roastPoints: string[];
  actualAdvice: string[];
  severity: number; // 1–10
};
