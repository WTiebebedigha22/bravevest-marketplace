import React from 'react';
import { cn } from '../utils/cn';
import Card, { CardContent } from './Card';

const StatCard = ({ 
  className, 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  trendLabel,
  ...props 
}) => {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;
  
  return (
    <Card className={cn('overflow-hidden', className)} {...props}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-brave-gray">{title}</p>
            <p className="text-3xl font-serif font-light text-brave-black">{value}</p>
            {description && (
              <p className="text-xs text-brave-gray">{description}</p>
            )}
          </div>
          {Icon && (
            <div className="rounded-md bg-brave-lime/20 p-2 text-brave-black">
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        {trend !== undefined && (
          <div className="mt-3 flex items-center gap-1">
            <span className={cn(
              'text-xs font-medium',
              isPositive && 'text-green-600',
              isNegative && 'text-brave-red',
              !isPositive && !isNegative && 'text-brave-gray'
            )}>
              {isPositive && '↑'} {isNegative && '↓'} {Math.abs(trend)}%
            </span>
            {trendLabel && (
              <span className="text-xs text-brave-gray">{trendLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

StatCard.displayName = 'StatCard';

export default StatCard;