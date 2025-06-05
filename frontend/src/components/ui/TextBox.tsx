"use client";

import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ForwardedRef,
} from "react";

// ─── Props ──────────────────────────────────────────────────────────────────
interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  multiline?: boolean;
  rows?: number;
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────
const TextBox = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextBoxProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ multiline = false, rows = 4, className = "", ...props }, ref) => {
  // ─── Styles ───────────────────────────────────────────────────────────────
  const baseClass = `border border-gray-400 p-2 rounded w-full ${className}`;

  // ─── Render ───────────────────────────────────────────────────────────────
  if (multiline) {
    return (
      <textarea
        {...props}
        rows={rows}
        className={baseClass}
        ref={ref as ForwardedRef<HTMLTextAreaElement>}
      />
    );
  }

  return (
    <input
      {...props}
      className={baseClass}
      ref={ref as ForwardedRef<HTMLInputElement>}
    />
  );
});

TextBox.displayName = "TextBox";

export default TextBox;
