import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  code: string;
  onChange: (c: string) => void;
};

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
  return (
    <div style={{ marginTop: "1rem", height: "300px" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language="javascript"
        theme="vs-light"
        value={code}
        onChange={(value) => {
          if (value !== undefined) onChange(value);
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
}
