import React from 'react';

const SkeletonCard = () => (
  <div
    style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '16px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      marginBottom: '12px',
    }}
  >
    {/* Emoji placeholder */}
    <div
      className="shimmer"
      style={{ width: 48, height: 48, borderRadius: '12px', flexShrink: 0 }}
    />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Title */}
      <div className="shimmer" style={{ height: 16, borderRadius: 8, width: '60%' }} />
      {/* Subtitle */}
      <div className="shimmer" style={{ height: 12, borderRadius: 8, width: '40%' }} />
    </div>
    {/* Price */}
    <div className="shimmer" style={{ width: 56, height: 20, borderRadius: 8 }} />
  </div>
);

export default SkeletonCard;
