import React from "react";

interface FileUploadProps {
  label?: string;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = "Upload File",
  accept = "*",
  onChange,
  name,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="file"
        accept={accept}
        name={name}
        onChange={onChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-[#e6005c] file:text-white
          hover:file:bg-pink-600"
      />
    </div>
  );
};

export default FileUpload;
