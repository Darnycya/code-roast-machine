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

  const handleRoast = async () => {
    const request: RoastRequest = { code, language, mode };
    setRoast(null);

    // Use the helper which handles fallback automatically
    const result = await getRoast(request);
    setRoast(result);
  };

  return (
    <>
      <Header />
      <main style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
        <EditorSection
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          mode={mode}
          setMode={setMode}
          onRoast={handleRoast}
        />
        <RoastOutput roast={roast} />
      </main>
    </>
  );
}

export default App;
