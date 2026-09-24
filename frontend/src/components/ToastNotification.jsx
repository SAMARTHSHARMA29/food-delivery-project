import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const ToastNotification = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle style={{ color: '#00E676', width: 20, height: 20 }} />,
    error: <AlertCircle style={{ color: '#FF5252', width: 20, height: 20 }} />,
    info: <Info style={{ color: '#FFB300', width: 20, height: 20 }} />
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 99999,
      background: 'rgba(23, 32, 54, 0.95)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(255, 82, 82, 0.2)',
      borderRadius: '16px',
      padding: '14px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#FFF',
      fontWeight: '600',
      fontSize: '0.95rem',
      animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
      {icons[toastMessage.type] || icons.info}
      <span>{toastMessage.message}</span>
    </div>
  );
};
