// src/components/StatusCard.tsx
import React from 'react';

interface Props {
  title: string;
  status: 'success' | 'failure' | 'warning' | 'info';
  children?: React.ReactNode;
}

const statusColors: Record<Props['status'], string> = {
  success: 'bg-green-800 border-green-600',
  failure: 'bg-red-800 border-red-600',
  warning: 'bg-amber-800 border-amber-600',
  info: 'bg-cyan-800 border-cyan-600',
};

const StatusCard: React.FC<Props> = ({ title, status, children }) => {
  return (
    <div className={`p-4 rounded-md border ${statusColors[status]} text-grayLight`}>
      <h3 className="text-lg font-semibold mb-2 text-cyan">{title}</h3>
      {children}
    </div>
  );
};

export default StatusCard;
