import type { Language, RoastMode } from "../../types/roast";
import LanguageSelect from "./LanguageSelect";
import RoastModeSelect from "./RoastModeSelect";
import CodeEditor from "./CodeEditor";

type Props = {
  code: string;
  setCode: (c: string) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  mode: RoastMode;
  setMode: (m: RoastMode) => void;
  onRoast: () => void;
};

export default function EditorSection({
  code,
  setCode,
  language,
  setLanguage,
  mode,
  setMode,
  onRoast,
}: Props) {
  return (
    <section
      className="editorSection"
      style={{
        flex: 1,
        padding: "1rem",
        background: "var(--panel)",
        borderRadius: "18px",
        border: "2px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div className="selectContainer" style={{ display: "flex", gap: "0.5rem" }}>
        <LanguageSelect value={language} onChange={setLanguage} />
        <RoastModeSelect value={mode} onChange={setMode} />
      </div>
      <CodeEditor code={code} onChange={setCode} />
      <button
        onClick={onRoast}
        style={{
          marginTop: "1.25rem",
          width: "50%",
          padding: "0.85rem",
          fontSize: "1rem",
          fontWeight: 700,
          justifySelf: "center",
          color: "#fff",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #ff7a18, #ff3d81)",
          boxShadow: "0 10px 30px rgba(255, 122, 24, 0.35)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          textAlign: "center",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Roast Me 🔥
      </button>
    </section>
  );
}
