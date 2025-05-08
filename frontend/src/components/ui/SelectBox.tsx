interface SelectBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  className?: string;
}

export default function SelectBox({
  value,
  onChange,
  options,
  className = "",
}: SelectBoxProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-gray-400 p-2 rounded ${className}`}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
