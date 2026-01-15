type RoastModeSelectProps = {
  value: string;
  onChange: (m: any) => void;
};

export default function RoastModeSelect({ value, onChange }: RoastModeSelectProps) {
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

      <option value="mentor">Gentle Mentor</option>
      <option value="senior">Blunt Senior</option>
      <option value="techLead">Tech Lead on Deadline</option>
    </select>
  );
}
