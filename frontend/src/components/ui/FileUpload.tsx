"use client";

// ─── Imports ────────────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import Image from "next/image";

// ─── Props ──────────────────────────────────────────────────────────────────
interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  file?: File | null;
  imageUrl?: string | null;
}

// ─── Component ──────────────────────────────────────────────────────────────
const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = "*",
  onChange,
  name,
  file,
  imageUrl,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // ─── Handle File Preview ─────────────────────────────────────────────────
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const previewSource = file && previewUrl ? previewUrl : imageUrl;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div>
      {label && (
        <label
          htmlFor={name || "file-upload"}
          className="block text-sm font-medium text-gray-500 mb-4"
        >
          {label}
        </label>
      )}

      <input
        id={name || "file-upload"}
        type="file"
        accept={accept}
        name={name}
        title={label}
        onChange={onChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-[#e6005c] file:text-white
          hover:file:bg-pink-600"
      />

      {previewSource && (
        <div className="mt-4 flex items-center">
          <Image
            src={previewSource}
            alt="Preview"
            width={100}
            height={100}
            className="rounded object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
