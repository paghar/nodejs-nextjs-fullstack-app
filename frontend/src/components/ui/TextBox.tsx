import { InputHTMLAttributes } from "react";

export default function TextBox({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border border-gray-400 p-2 rounded ${className}`}
    />
  );
}
