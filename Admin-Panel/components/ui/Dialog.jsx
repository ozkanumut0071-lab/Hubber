import React from 'react';

/**
 * Basit dialog bileşeni (portal kullanmadan)
 */
export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <div className="dialog" aria-modal="true" role="dialog">
      <div className="dialog__overlay" onClick={handleOverlayClick} />
      <div className="dialog__content">{children}</div>
    </div>
  );
};

export const DialogContent = ({ children, className = '' }) => (
  <div className={`dialog__card ${className}`}>{children}</div>
);

export const DialogHeader = ({ children, className = '' }) => (
  <div className={`dialog__header ${className}`}>{children}</div>
);

export const DialogTitle = ({ children, className = '' }) => (
  <h3 className={`dialog__title ${className}`}>{children}</h3>
);

export const DialogDescription = ({ children, className = '' }) => (
  <p className={`dialog__description ${className}`}>{children}</p>
);

export default {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
