"use client";

// ─── Imports ────────────────────────────────────────────────────────────────
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

// ─── Props ──────────────────────────────────────────────────────────────────
interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function LinkComponent({
  href,
  children,
  className = "",
  onClick,
}: LinkProps) {
  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`hover:underline font-medium ${className}`}
    >
      {children}
    </Link>
  );
}
