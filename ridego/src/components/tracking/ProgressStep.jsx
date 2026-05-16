import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ProgressStep = ({ label, isActive, isLast = false, index }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%' }}>
        {/* Circle + line column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Circle */}
          <motion.div
            animate={isActive ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={isActive ? { duration: 0.4, ease: 'easeOut' } : {}}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: isActive ? 'var(--color-brand)' : 'var(--color-disabled-bg)',
              border: isActive
                ? '2px solid var(--color-brand)'
                : '2px solid var(--color-disabled)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.4s ease, border-color 0.4s ease',
              boxShadow: isActive ? '0 0 0 6px rgba(232,80,10,0.15)' : 'none',
            }}
          >
            {isActive
              ? <Check size={16} color="#fff" strokeWidth={3} />
              : (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'var(--color-disabled)',
                  }}
                />
              )
            }
          </motion.div>

          {/* Connecting line below (except last step) */}
          {!isLast && (
            <div
              style={{
                width: 2,
                height: 36,
                background: 'var(--color-disabled-bg)',
                position: 'relative',
                overflow: 'hidden',
                marginTop: 2,
              }}
            >
              <motion.div
                initial={{ height: '0%' }}
                animate={{ height: isActive ? '100%' : '0%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  background: 'var(--color-brand)',
                }}
              />
            </div>
          )}
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: 15,
            fontWeight: isActive ? 700 : 500,
            color: isActive ? 'var(--color-text-primary)' : 'var(--color-disabled)',
            fontFamily: 'var(--font-family)',
            transition: 'color 0.3s ease, font-weight 0.3s ease',
            paddingBottom: isLast ? 0 : 38,
            alignSelf: 'flex-start',
            paddingTop: 6,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default ProgressStep;
