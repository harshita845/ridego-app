import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle2 } from 'lucide-react';
import { formatFare } from '../../utils/formatFare';

const RideCard = ({ ride, isSelected, onSelect, fare, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(ride)}
      style={{
        background: isSelected ? 'var(--color-brand-light)' : 'var(--color-surface)',
        border: isSelected
          ? '2px solid var(--color-brand)'
          : '2px solid transparent',
        borderRadius: '16px',
        padding: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 12,
        boxShadow: isSelected
          ? '0 4px 20px rgba(232,80,10,0.15)'
          : '0 4px 16px rgba(0,0,0,0.06)',
        opacity: isSelected === false && isSelected !== null ? undefined : 1,
        position: 'relative',
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease',
      }}
    >
      {/* Emoji icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: isSelected ? 'rgba(232,80,10,0.12)' : '#F7F7F7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          flexShrink: 0,
          transition: 'background 0.25s ease',
        }}
      >
        {ride.emoji}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-family)',
            }}
          >
            {ride.type}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family)',
            }}
          >
            <Users size={12} /> {ride.capacity} {ride.capacity === 1 ? 'seat' : 'seats'}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family)',
            }}
          >
            <Clock size={12} /> {ride.eta}
          </span>
        </div>
      </div>

      {/* Fare */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: isSelected ? 'var(--color-brand)' : 'var(--color-text-primary)',
            fontFamily: 'var(--font-family)',
            transition: 'color 0.25s ease',
          }}
        >
          {fare ? formatFare(fare) : `From ${formatFare(ride.baseFare)}`}
        </div>
      </div>

      {/* Checkmark when selected */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <CheckCircle2 size={18} color="var(--color-brand)" fill="white" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default RideCard;
