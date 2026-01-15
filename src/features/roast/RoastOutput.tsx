import type { RoastResponse } from "../../types/roast";

type Props = {
  roast: RoastResponse | null;
  loading: boolean;
};

export default function RoastOutput({ roast, loading }: Props) {
  if (loading) {
    return (
      <section
        style={{
          flex: 1,
          padding: "1.5rem",
          background: "var(--panel)",
          borderRadius: "18px",
          boxShadow: "var(--panel-glow)",
          border: "2px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "1.1rem", color: "var(--accent)" }}>
          🔥 Roasting your code
        </span>

        <div className="loading-dots" />

        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
          This may sting a little.
        </span>

        <style>
          {`
          .loading-dots {
            width: 48px;
            height: 12px;
            display: flex;
            justify-content: space-between;
          }

          .loading-dots::before,
          .loading-dots::after,
          .loading-dots div {
            content: "";
            width: 10px;
            height: 10px;
            background: var(--accent);
            border-radius: 50%;
            animation: pulse 1.4s infinite ease-in-out both;
          }

          .loading-dots::before {
            animation-delay: -0.32s;
          }

          .loading-dots div {
            animation-delay: -0.16s;
          }

          @keyframes pulse {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.3;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
        </style>
      </section>
    );
  }

  // Placeholder when no roast exists yet
  if (!roast) {
    return (
      <section
        style={{
          flex: 1,
          padding: "1rem",
          background: "var(--panel)",
          borderRadius: "18px",
          boxShadow: "var(--panel-glow)",
          border: "2px solid var(--border)",
        }}
      >
        <p style={{ color: "var(--muted)" }}>
          Paste some code and hit <strong>Roast Me</strong>. We'll be gentle...
          probably.
        </p>
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

  const cleanedRoastPoints = roastPoints.filter(
    (point) => point && point.trim().length > 0
  );

  const cleanedAdvice = actualAdvice.filter(
    (tip) => tip && tip.trim().length > 0
  );

  return (
    <section
      style={{
        flex: 1,
        boxShadow: "var(--panel-glow)",
      }}
    >
      {/* Roast Summary */}
      <section
        style={{
          flex: 1,
          padding: "1rem",
          marginBottom: ".75rem",
          background: "var(--panel)",
          borderRadius: "18px",
          boxShadow: "var(--panel-glow)",
          border: "2px solid var(--border)",
        }}
      >
        <h2 style={{ color: "var(--text)", borderBottom: "2px solid var(--border)", marginBottom: "1rem", paddingBottom: ".50rem" }}>Roast Summary</h2>
        <p>{roastSummary}</p>

        {/* Severity Badge */}
        <span
          className={severity >= 8 ? "shake" : ""}
          style={{
            display: "inline-block",
            marginTop: "0.5rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            background:
              "linear-gradient(135deg, rgba(255,122,24,0.2), rgba(255,61,129,0.2))",
            boxShadow: "0 0 15px rgba(255, 122, 24, 0.4)",
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          Severity: {severity}/10
        </span>
      </section>

      {/* Biggest Offense */}
      <section
        style={{
          flex: 1,
          padding: "1rem",
          marginBottom: ".75rem",
          background: "var(--panel)",
          borderRadius: "18px",
          boxShadow: "var(--panel-glow)",
          border: "2px solid #ef444498",
        }}
      >
        <h3 style={{ color: "#ef444498", borderBottom: "2px solid #ef444498", marginBottom: "1rem", paddingBottom: ".50rem" }}>🔥 Biggest Offense</h3>
        <p>{biggestOffense}</p>
      </section>

      {/* Roast Points */}
      <section
        style={{
          flex: 1,
          padding: "1rem",
          marginBottom: ".75rem",
          background: "var(--panel)",
          borderRadius: "18px",
          boxShadow: "var(--panel-glow)",
          border: "2px solid #7c7cff98",
        }}
      >
        <h3 style={{ color: "#7c7cff98", borderBottom: "2px solid #7c7cff98", marginBottom: "1rem", paddingBottom: ".50rem" }}>Roast Points</h3>
        <ul>
          {cleanedRoastPoints.length > 0 ? (
            cleanedRoastPoints.map((point, i) => (
              <li
                key={i}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s forwards`,
                  animationDelay: `${i * 0.15}s`,
                  borderLeft: "3px solid #7c7cff98",
                }}
              >
                {point}
              </li>
            ))
          ) : (
            <li>No roast points available.</li>
          )}
        </ul>
      </section>

      {/* Actual Advice */}
      <section
        style={{
          flex: 1,
          padding: "1rem",
          marginBottom: ".75rem",
          background: "var(--panel)",
          borderRadius: "18px",
          boxShadow: "var(--panel-glow)",
          border: "2px solid #00e5ff98",
        }}
      >
        <h3 style={{ color: "#00e5ff98", borderBottom: "2px solid #00e5ff98", marginBottom: "1rem", paddingBottom: ".50rem" }}>Actual Advice</h3>
        <ul>
          {cleanedAdvice.length > 0 ? (
            cleanedAdvice.map((tip, i) => (
              <li
                key={i}
                style={{
                  paddingLeft: "0.5rem",
                  borderLeft: "3px solid #00e5ff98",
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
      </section>

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
