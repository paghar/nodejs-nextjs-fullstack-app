import React, { useEffect, useState } from "react";
import Image from "next/image";

interface FileUploadProps {
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  file?: File | null;
  imageUrl?: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = "Upload File",
  accept = "*",
  onChange,
  name,
  file,
  imageUrl,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const fileName = file
    ? file.name
    : imageUrl
      ? imageUrl.split("/").pop()
      : null;

  return (
    <div>
      {label && (
        <label
          htmlFor={name || "file-upload"}
          className="block text-sm font-medium text-gray-700 mb-1"
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
      <div className="mt-2">
        {file && previewUrl ? (
          <div className="flex items-center space-x-2">
            {/* <span className="text-xs text-gray-600">{file.name}</span> */}
            <Image
              src={previewUrl}
              alt="Selected"
              width={60}
              height={60}
              style={{ borderRadius: 4, objectFit: "cover" }}
            />
          </div>
        ) : imageUrl ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">{fileName}</span>
            <Image
              src={imageUrl}
              alt="Current"
              width={60}
              height={60}
              style={{ borderRadius: 4, objectFit: "cover" }}
            />
          </div>
        ) : (
          <span className="text-xs text-gray-400">No file selected</span>
        )}
      </div>
    </div>
  );
};

export default FileUpload;