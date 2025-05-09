import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function LinkComponent({ href, children, className = "", onClick }: LinkProps) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`hover:underline font-medium ${className}`}
    >
      {children}
    </Link>
  );
}
