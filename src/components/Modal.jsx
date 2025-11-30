import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{marginTop:0}}>{title}</h3>
        <div className="modal-body">
            {children}
        </div>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>İptal</button>
          <button className="btn-confirm" onClick={onConfirm}>Onayla</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;