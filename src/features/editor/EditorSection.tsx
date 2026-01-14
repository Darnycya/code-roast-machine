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
      style={{
        flex: 1,
        padding: "1.5rem",
        background: "var(--panel)",
      }}
    >
      <LanguageSelect value={language} onChange={setLanguage} />
      <RoastModeSelect value={mode} onChange={setMode} />
      <CodeEditor code={code} onChange={setCode} />
      <button style={{ marginTop: "1rem" }} onClick={onRoast}>
        Roast Me 🔥
      </button>
    </section>
  );
}
