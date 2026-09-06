import React from 'react';
import { cn } from '../utils/cn';

const RangeSlider = ({
  min = 0,
  max = 100,
  value,
  onChange,
  step = 1,
  className,
  label,
  currency = '₦',
  showLabels = true,
  ...props
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-brave-gray">{label}</span>
          <span className="text-sm font-semibold font-serif text-brave-black">
            {currency}{value.toLocaleString()}
          </span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3FB8C4 0%, #3FB8C4 ${percentage}%, #E5E5E5 ${percentage}%, #E5E5E5 100%)`,
          }}
          {...props}
        />
       
      </div>
      {showLabels && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-brave-gray">{currency}{min.toLocaleString()}</span>
          <span className="text-xs text-brave-gray">{currency}{max.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default RangeSlider;