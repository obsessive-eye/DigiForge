// src/components/LoadingState.tsx
import React from 'react';
import { LucideLoader2 } from 'lucide-react';

interface Props {
  messages?: string[];
}

const defaultMessages = [
  'Analyzing image',
  'Embedding watermark',
  'Calculating image metrics',
  'Finalizing protected image',
];

const LoadingState: React.FC<Props> = ({ messages }) => {
  const msgs = messages ?? defaultMessages;
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <LucideLoader2 className="animate-spin w-12 h-12 text-cyan mb-4" />
      <p className="text-grayLight text-center mb-2">Processing…</p>
      <ul className="list-disc text-sm text-grayLight">
        {msgs.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoadingState;
