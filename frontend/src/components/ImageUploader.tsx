// src/components/ImageUploader.tsx
import React, { ChangeEvent } from 'react';
import { LucideUpload } from 'lucide-react';

interface Props {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const ImageUploader: React.FC<Props> = ({ onFileSelect, disabled }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-cyan rounded-md cursor-pointer hover:bg-cyan/10 transition" htmlFor="file-input">
      <LucideUpload className="w-8 h-8 text-cyan mb-2" />
      <span className="text-grayLight">Drag & drop or click to select an image</span>
      <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleChange} disabled={disabled} />
    </label>
  );
};

export default ImageUploader;
