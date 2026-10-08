// src/components/ImagePreview.tsx
import React from 'react';

interface Props {
  file: File | null;
  imageUrl: string | null;
}

const ImagePreview: React.FC<Props> = ({ file, imageUrl }) => {
  if (!file || !imageUrl) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm text-grayLight">File: {file.name}</p>
      <p className="text-sm text-grayLight">
        Size: {(file.size / 1024).toFixed(1)} KB
      </p>
      <img src={imageUrl} alt="preview" className="max-w-full h-auto rounded" />
    </div>
  );
};

export default ImagePreview;
