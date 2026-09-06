import React, { useState, useEffect } from 'react';

export const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
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
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((t) => (
        <div key={t.id} className="mb-2 bg-white border rounded-lg p-4 shadow-lg">
          {t.title && <div className="font-semibold">{t.title}</div>}
          {t.description && <div className="text-sm opacity-90">{t.description}</div>}
        </div>
      ))}
    </div>
  );
};