import React from 'react';
import { motion } from 'framer-motion';

const ProceedButton = ({ isEnabled, onPress, label, disabledLabel = 'Select a Ride' }) => {
  return (
    <motion.button
      whileTap={isEnabled ? { scale: 0.96 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={isEnabled ? onPress : undefined}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: '16px',
        border: 'none',
        background: isEnabled ? 'var(--color-brand)' : 'var(--color-disabled-bg)',
        color: isEnabled ? '#fff' : 'var(--color-disabled)',
        fontSize: 16,
        fontWeight: 700,
        fontFamily: 'var(--font-family)',
        cursor: isEnabled ? 'pointer' : 'not-allowed',
        transition: 'background 0.2s ease, color 0.2s ease',
        outline: 'none',
        letterSpacing: '0.3px',
        boxShadow: isEnabled ? '0 4px 20px rgba(232,80,10,0.35)' : 'none',
      }}
    >
      {isEnabled ? label : disabledLabel}
    </motion.button>
  );
};

export default ProceedButton;
