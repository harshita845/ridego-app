import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="screen"
      style={{
        background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '844px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration circles */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(232,80,10,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(232,80,10,0.06)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          right: 20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(232,80,10,0.05)',
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Logo circle */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
          style={{
            width: 100,
            height: 100,
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #E8500A, #FF7A3D)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            boxShadow: '0 20px 60px rgba(232,80,10,0.4)',
            marginBottom: 8,
          }}
        >
          🏍️
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: 'var(--font-family)',
            letterSpacing: '-1px',
            lineHeight: 1,
          }}
        >
          Ride<span style={{ color: '#E8500A' }}>Go</span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-family)',
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
        >
          Your ride, your way
        </motion.div>
      </motion.div>

      {/* Bottom loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: 80,
          display: 'flex',
          gap: 8,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#E8500A',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SplashScreen;
