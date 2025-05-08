import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "outline" | "destructive" | "link" | "pagination";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "rounded px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-[#e6005c] text-white hover:bg-[#cc0052] focus:ring-[#e6005c]",
    outline: "border border-[#e6005c] text-[#e6005c] hover:bg-gray-100",
    destructive: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
    link: "text-xs text-red-600 hover:underline p-0 bg-transparent border-none focus:ring-0",
    pagination: disabled
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "border border-gray-400 text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const sizeStyle = variant === "link" || variant === "pagination" ? "text-sm" : sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizeStyle} ${className}`}
    >
      {children}
    </button>
  );
}
