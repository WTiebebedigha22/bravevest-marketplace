import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-brave-black text-brave-white hover:bg-brave-black/90',
        primary: 'bg-brave-lime text-brave-black hover:bg-brave-lime/90',
        outline: 'border border-brave-black bg-transparent text-brave-black hover:bg-brave-black/5',
        secondary: 'bg-brave-teal text-brave-white hover:bg-brave-teal/90',
        ghost: 'hover:bg-brave-black/5 text-brave-black',
        destructive: 'bg-brave-red text-white hover:bg-brave-red/90',
        link: 'underline-offset-4 hover:underline text-brave-teal',
      },
      size: {
        default: 'h-10 py-2 px-6',
        sm: 'h-9 px-4 rounded-full',
        lg: 'h-11 px-8 rounded-full',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export default Button;