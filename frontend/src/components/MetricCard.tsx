// src/components/MetricCard.tsx
import React from 'react';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
}

const MetricCard: React.FC<Props> = ({ label, value, unit }) => {
  return (
    <div className="bg-navy/60 p-4 rounded-md text-center border border-cyan/30">
      <p className="text-sm text-grayLight mb-1">{label}</p>
      <p className="text-xl font-medium text-cyan">{value}{unit ? ` ${unit}` : ''}</p>
    </div>
  );
};

export default MetricCard;
