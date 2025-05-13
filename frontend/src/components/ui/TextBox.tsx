import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  FC,
} from "react";

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  multiline?: boolean;
  rows?: number;
}

const TextBox: FC<TextBoxProps & TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  multiline = false,
  rows = 4,
  className = "",
  ...props
}) => {
  const baseClass = `border border-gray-400 p-2 rounded w-full ${className}`;

  return multiline ? (
    <textarea {...props} rows={rows} className={baseClass} />
  ) : (
    <input {...props} className={baseClass} />
  );
};

export default TextBox;
