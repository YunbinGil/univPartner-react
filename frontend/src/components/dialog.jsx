// src/components/Dialog.jsx
import { useEffect } from 'react';

export default function Dialog({ open, title, message, onClose, actionText = '확인' }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose?.(); }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-card" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="dialog-title">{title}</h3>}
        {message && <p className="dialog-message">{message}</p>}
        <div className="dialog-actions">
          <button className="btn btn-primary" onClick={onClose}>{actionText}</button>
        </div>
      </div>
    </div>
  );
}
