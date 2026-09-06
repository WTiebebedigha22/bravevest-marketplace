import React from 'react';
import { cn } from '../utils/cn';

const riskConfig = {
  low: {
    color: 'bg-green-100 text-green-800',
    dot: 'bg-green-500',
    label: 'Low Risk',
  },
  medium: {
    color: 'bg-brave-amber/20 text-brave-amber/80',
    dot: 'bg-brave-amber',
    label: 'Medium Risk',
  },
  high: {
    color: 'bg-brave-red/20 text-brave-red',
    dot: 'bg-brave-red',
    label: 'High Risk',
  },
};

const RiskBadge = ({ risk, className, showDot = true, ...props }) => {
  const config = riskConfig[risk] || riskConfig.low;
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        config.color,
        className
      )}
      {...props}
    >
      {showDot && <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />}
      {config.label}
    </span>
  );
};

export default RiskBadge;