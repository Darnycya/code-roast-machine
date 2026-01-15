import { useState } from "react";
import Header from "./components/Header";
import EditorSection from "./features/editor/EditorSection";
import RoastOutput from "./features/roast/RoastOutput";
import type { RoastResponse, RoastRequest, Language, RoastMode } from "./types/roast";
import { getRoast } from "./utils/openai";

function App() {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [mode, setMode] = useState<RoastMode>("mentor");
  const [roast, setRoast] = useState<RoastResponse | null>(null);
  const [loading, setLoading] = useState(false);


const handleRoast = async () => {
  const request: RoastRequest = { code, language, mode };

  setLoading(true);
  setRoast(null);

  try {
    const result = await getRoast(request);
    setRoast(result);
  } catch (err) {
    console.error("Roast failed:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Header />
      <main style={{ width: "90%", justifySelf: "center", display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
        <EditorSection
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          mode={mode}
          setMode={setMode}
          onRoast={handleRoast}
        />
        <RoastOutput roast={roast} loading={loading} />
      </main>
    </>
  );
}

export default App;
