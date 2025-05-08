import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
}

const Button = ({
  children,
  onClick,
  variant = "default",
  size = "md",
}: ButtonProps) => {
  const baseStyles =
    "rounded px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default:
      "bg-[#e6005c] text-white hover:bg-[#cc0052] focus:ring-[#e6005c]",
    outline:
      "border border-[#e6005c] text-[#e6005c] hover:bg-gray-100 focus:ring-[#e6005c]",
    destructive:
      "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
  };

  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
};

export default Button;
