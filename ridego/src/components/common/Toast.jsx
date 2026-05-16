import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const Toast = ({ message, type = 'error', onDismiss, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss?.(), 350);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const isError = type === 'error';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'fixed',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            width: 'calc(390px - 32px)',
            maxWidth: 'calc(100vw - 32px)',
            background: isError ? '#1A1A2E' : '#22C55E',
            color: '#fff',
            borderRadius: '14px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          }}
        >
          {isError
            ? <AlertCircle size={20} color="#FF6B6B" />
            : <CheckCircle2 size={20} color="#fff" />
          }
          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-family)' }}>
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
