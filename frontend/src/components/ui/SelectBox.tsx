// ui/SelectBox.tsx
interface SelectBoxProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[];
    className?: string;
  }
  
  export default function SelectBox({ value, onChange, options, className = "" }: SelectBoxProps) {
    return (
      <select value={value} onChange={onChange} className={`border border-gray-400 p-2 rounded ${className}`}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
  