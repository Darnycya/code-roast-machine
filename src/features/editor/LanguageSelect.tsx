type LanguageSelectProps = {
  value: string;
  onChange: (l: any) => void;
};

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="other">Other</option>
    </select>
  );
}
