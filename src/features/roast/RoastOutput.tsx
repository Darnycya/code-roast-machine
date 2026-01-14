import type { RoastResponse } from "../../types/roast";

type Props = {
  roast: RoastResponse | null;
};

export default function RoastOutput({ roast }: Props) {
  // Placeholder when no roast exists yet
  if (!roast) {
    return (
      <section
        style={{
          flex: 1,
          padding: "1.5rem",
          background: "var(--panel)",
          borderLeft: "1px solid var(--border)",
          color: "var(--muted)",
        }}
      >
        <p>Paste some code and hit “Roast Me”. We’ll be gentle. Probably.</p>
      </section>
    );
  }

  // Safe destructure with defaults
  const {
    roastSummary = "No summary available.",
    biggestOffense = "No offense found.",
    roastPoints = [],
    actualAdvice = [],
    severity = 0,
  } = roast;

  return (
    <section
      style={{
        flex: 1,
        padding: "1.5rem",
        background: "var(--panel)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      {/* Roast Summary */}
      <h2>Roast Summary</h2>
      <p>{roastSummary}</p>

      {/* Severity Badge */}
      <span
        className={severity >= 8 ? "shake" : ""}
        style={{
          display: "inline-block",
          marginTop: "0.5rem",
          padding: "0.25rem 0.75rem",
          borderRadius: "999px",
          background: "rgba(239, 68, 68, 0.1)",
          color: "var(--accent)",
          fontWeight: 600,
        }}
      >
        Severity: {severity}/10
      </span>

      {/* Biggest Offense */}
      <h3>🔥 Biggest Offense</h3>
      <p>{biggestOffense}</p>

      {/* Roast Points */}
      <h3>Roast Points</h3>
      <ul>
        {roastPoints.length > 0 ? (
          roastPoints.map((point, i) => (
            <li
              key={i}
              style={{
                opacity: 0,
                animation: `fadeIn 0.5s forwards`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {point}
            </li>
          ))
        ) : (
          <li>No roast points available.</li>
        )}
      </ul>

      {/* Actual Advice */}
      <h3>Actual Advice</h3>
      <ul>
        {actualAdvice.length > 0 ? (
          actualAdvice.map((tip, i) => (
            <li
              key={i}
              style={{
                opacity: 0,
                animation: `fadeIn 0.5s forwards`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {tip}
            </li>
          ))
        ) : (
          <li>No advice available.</li>
        )}
      </ul>

      {/* Fade-in animation styles */}
      <style>
        {`
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          .shake {
            animation: shake 0.5s;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
          }
        `}
      </style>
    </section>
  );
}
