import React from 'react';
import { cn } from '../utils/cn';

const Toast = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-white text-brave-black border-brave-light-gray',
    destructive: 'border-brave-red bg-brave-red/10 text-brave-red',
    success: 'border-green-500 bg-green-50 text-green-800',
    warning: 'border-brave-amber bg-brave-amber/10 text-brave-amber/80',
  };

  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4 pr-8 shadow-lg',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const ToastProvider = ({ children }) => <>{children}</>;
const ToastViewport = ({ className, ...props }) => (
  <div
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
);

let toastCount = 0;
const toast = (options) => {
  const id = ++toastCount;
  const event = new CustomEvent('toast', {
    detail: { id, ...options },
  });
  document.dispatchEvent(event);
  return id;
};

const Toaster = () => {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const handler = (e) => {
      const toastData = e.detail;
      setToasts((prev) => [...prev, toastData]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastData.id));
      }, 5000);
    };
    document.addEventListener('toast', handler);
    return () => document.removeEventListener('toast', handler);
  }, []);

  return (
    <ToastViewport>
      {toasts.map((t) => (
        <Toast key={t.id} variant={t.variant} className="mb-2">
          {t.title && <div className="font-semibold">{t.title}</div>}
          {t.description && <div className="text-sm opacity-90">{t.description}</div>}
        </Toast>
      ))}
    </ToastViewport>
  );
};

export { Toast, ToastProvider, ToastViewport, Toaster, toast };
export default Toast;