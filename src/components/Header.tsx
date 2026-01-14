export default function Header() {
  return (
    <header
      style={{
        padding: "1rem 2rem",
        borderBottom: "1px solid var(--border)",
        background: "var(--panel)"
      }}
    >
      <h1 style={{ margin: 0 }}>🔥 Code Roast Machine</h1>
      <p style={{ margin: "0.25rem 0 0", color: "var(--muted)" }}>
        Brutally honest code feedback. Emotionally optional.
      </p>
    </header>
  );
}
