type RoastModeSelectProps = {
  value: string;
  onChange: (m: any) => void;
};

export default function RoastModeSelect({ value, onChange }: RoastModeSelectProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="mentor">Gentle Mentor</option>
      <option value="senior">Blunt Senior</option>
      <option value="techLead">Tech Lead on Deadline</option>
    </select>
  );
}
