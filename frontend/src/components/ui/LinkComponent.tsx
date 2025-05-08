import Link from "next/link";
import { ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function LinkComponent({ href, children, className = "" }: LinkProps) {
  return (
    <Link
      href={href}
      className={`hover:underline font-medium ${className}`}
    >
      {children}
    </Link>
  );
}
