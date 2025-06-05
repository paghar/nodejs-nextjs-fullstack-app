"use client";

import Button from "@components/ui/Button"; // adjust path if needed

interface QuantityProps {
  value: number;
  onChange: (value: number) => void;
}

export default function Quantity({ value, onChange }: QuantityProps) {
  const increase = () => onChange(value + 1);
  const decrease = () => {
    if (value > 1) onChange(value - 1);
  };

  return (
    <div className="flex items-center border border-gray-300 shadow rounded w-fit">
      <Button
        onClick={decrease}
        variant="destructive" 
        size="sm"
        className="rounded-l-md px-2 py-1 text-sm"
        type="button"
      >
        -
      </Button>

      <span className="px-6 py-2 font-semibold text-black select-none">
        {value}
      </span>

      <Button
        onClick={increase}
        variant="destructive" 
        size="sm"
        className="rounded-r-md px-2 py-1 text--sm"
        type="button"
      >
        +
      </Button>
    </div>
  );
}
