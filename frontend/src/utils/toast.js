import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);
  const toastCounterRef = React.useRef(0);

  const addToast = (message, type = 'info', duration = 3000) => {
    toastCounterRef.current += 1;
    const id = toastCounterRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
};

export const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 space-y-2 z-50">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl border shadow-sm transition-all duration-300 ${
          toast.type === 'error'
            ? 'bg-red-50 text-red-700 border-red-200'
            : toast.type === 'success'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-[#F8FAFC] text-[#1E1B6A] border-[#F2D3A3]'
        }`}
      >
        {toast.type === 'error' && <AlertCircle size={20} />}
        <span>{toast.message}</span>
        <button
          onClick={() => removeToast(toast.id)}
          className="ml-2 hover:opacity-60"
        >
          <X size={16} />
        </button>
      </div>
    ))}
  </div>
);
