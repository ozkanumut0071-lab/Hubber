import React, { useEffect, useState } from 'react';
import '../../styles/toast.css';

/**
 * Toast Notification Component for Admin Panel
 */
let showToastCallback = null;

export const showToast = (message, type = 'info') => {
  if (showToastCallback) {
    showToastCallback(message, type);
  }
};

const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    showToastCallback = (message, type) => {
      const id = Date.now();
      setToast({ message, type, id });

      // Auto-hide after 4 seconds
      setTimeout(() => {
        setToast(null);
      }, 4000);
    };

    return () => {
      showToastCallback = null;
    };
  }, []);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '×';
      case 'warning':
        return '!';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`toast toast--${toast.type}`}>
      <span className="toast__icon">{getIcon()}</span>
      <span className="toast__message">{toast.message}</span>
      <button
        className="toast__close"
        onClick={() => setToast(null)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
