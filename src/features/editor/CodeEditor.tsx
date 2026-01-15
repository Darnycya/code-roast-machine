import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  code: string;
  onChange: (c: string) => void;
};

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <div
      style={{
        marginTop: "1rem",
        height: "70%",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "var(--panel-glow)",
        border: "1px solid var(--border)",
      }}
    >
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => {
          if (value !== undefined) onChange(value);
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          fontFamily: "JetBrains Mono, monospace",
          cursorBlinking: "smooth",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}
