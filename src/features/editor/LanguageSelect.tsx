type LanguageSelectProps = {
  value: string;
  onChange: (l: any) => void;
};

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <select
  value={value}
  onChange={(e) => onChange(e.target.value)}
  style={{
    width: "100%",
    marginBottom: "0.75rem",
    padding: "0.6rem 0.75rem",
    borderRadius: "10px",
    background: "rgba(30, 35, 80, 0.8)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    outline: "none",
  }}
>
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="html">HTML</option>
      <option value="java">Java</option>
      <option value="cpp">C++</option>
      <option value="python">Python</option>
      <option value="css">CSS</option>
      <option value="other">Other</option>
    </select>
  );
}
