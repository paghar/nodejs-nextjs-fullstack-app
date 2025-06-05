import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "outline" | "destructive" | "link" | "pagination" | "close";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "rounded-md px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  const variants = {
    default: "bg-[#e6005c] text-white hover:bg-[#cc0052] focus:ring-[#e6005c]",
    outline: "border border-[#e6005c] text-[#e6005c] hover:bg-gray-100",
    destructive: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
    link: "text-sm text-pink-600 hover:underline p-0 bg-transparent border-none focus:ring-0",
    pagination: disabled
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "border border-gray-400 text-gray-600 hover:bg-gray-100",
    close: "text-gray-600 hover:text-gray-900 p-0 bg-transparent border-none focus:ring-0 absolute top-2 right-2",
  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const sizeStyle = variant === "link" || variant === "pagination" || variant === "close"
    ? "text-sm"
    : sizes[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizeStyle} ${className}`}
    >
      {children}
    </button>
  );
}