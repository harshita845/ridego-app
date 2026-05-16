import React from 'react';
import { Phone, Star } from 'lucide-react';

const DriverCard = ({ driverName, vehicleNo, rating }) => {
  const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(driverName || 'driver')}`;

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: '20px',
        padding: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid var(--color-brand-light)',
          flexShrink: 0,
          background: '#fef3ee',
        }}
      >
        <img
          src={avatarUrl}
          alt={driverName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Driver info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-family)',
            marginBottom: 3,
          }}
        >
          {driverName || 'Your Driver'}
        </div>
        <div
          style={{
            fontSize: 12,
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family)',
            marginBottom: 4,
          }}
        >
          {vehicleNo || 'MH 01 XX 0000'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#F59E0B',
              fontFamily: 'var(--font-family)',
            }}
          >
            {rating || '4.8'}
          </span>
        </div>
      </div>

      {/* Call button */}
      <button
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'var(--color-brand)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(232,80,10,0.35)',
          flexShrink: 0,
        }}
      >
        <Phone size={18} color="#fff" />
      </button>
    </div>
  );
};

export default DriverCard;
