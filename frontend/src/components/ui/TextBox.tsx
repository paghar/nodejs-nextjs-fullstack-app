// ui/TextBox.tsx
interface TextBoxProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
  }
  
  export default function TextBox({ value, onChange, placeholder, className = "" }: TextBoxProps) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-400 p-2 rounded ${className}`}
      />
    );
  }
  