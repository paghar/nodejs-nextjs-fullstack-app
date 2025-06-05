"use client";

// ─── Props ──────────────────────────────────────────────────────────────────
interface SelectBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  className?: string;
  ariaLabel?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function SelectBox({
  value,
  onChange,
  options,
  className = "",
  ariaLabel = "Select an option",
}: SelectBoxProps) {
  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-gray-400 p-2 rounded ${className}`}
      aria-label={ariaLabel}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
