import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingContext } from '../context/BookingContext';
import DriverCard from '../components/tracking/DriverCard';
import ProgressStep from '../components/tracking/ProgressStep';

const STEPS = [
  'Driver Accepted',
  'Driver En Route',
  'Driver Arrived',
  'Ride Started',
];

const etaToSeconds = (etaStr) => {
  if (!etaStr) return 300;
  const match = etaStr.match(/(\d+)/);
  return match ? parseInt(match[1]) * 60 : 300;
};

const formatTime = (s) => {
  const mins = Math.floor(s / 60).toString().padStart(2, '0');
  const secs = (s % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const TrackingScreen = () => {
  const navigate = useNavigate();
  const { booking, selectedRide, destination, resetBooking } = useBookingContext();
  const [activeStep, setActiveStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(etaToSeconds(selectedRide?.eta));
  const [arrived, setArrived] = useState(false);

  // Redirect if no booking
  useEffect(() => {
    if (!booking) navigate('/home');
  }, [booking, navigate]);

  // Step progression — every 3 seconds
  useEffect(() => {
    const intervals = STEPS.map((_, i) => {
      if (i === 0) return null;
      return setTimeout(() => setActiveStep(i), i * 3000);
    });
    return () => intervals.forEach((t) => t && clearTimeout(t));
  }, []);

  // ETA countdown
  useEffect(() => {
    if (arrived || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setArrived(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [arrived]);

  const handleNewRide = () => {
    resetBooking();
    navigate('/home');
  };

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          padding: '52px 16px 24px',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-family)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: 4,
          }}
        >
          Ride to
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#fff',
            fontFamily: 'var(--font-family)',
            marginBottom: 2,
          }}
        >
          {destination}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-family)',
          }}
        >
          Booking #{booking?.bookingId?.slice(-6)?.toUpperCase() || 'XXXXXX'}
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* Driver card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: 20 }}
        >
          <DriverCard
            driverName={booking?.driverName}
            vehicleNo={booking?.vehicleNo}
            rating={booking?.rating}
          />
        </motion.div>

        {/* ETA Timer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: 8,
            }}
          >
            {arrived ? 'Status' : 'Estimated Arrival'}
          </div>

          <AnimatePresence mode="wait">
            {!arrived ? (
              <motion.div
                key="timer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: 'var(--color-brand)',
                  fontFamily: 'var(--font-family)',
                  letterSpacing: '-2px',
                  lineHeight: 1,
                }}
              >
                {formatTime(timeLeft)}
              </motion.div>
            ) : (
              <motion.div
                key="arrived"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#22C55E',
                  fontFamily: 'var(--font-family)',
                }}
              >
                Driver has arrived! 🎉
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: 16,
            }}
          >
            Trip Progress
          </div>
          {STEPS.map((step, i) => (
            <ProgressStep
              key={step}
              label={step}
              isActive={i <= activeStep}
              isLast={i === STEPS.length - 1}
              index={i}
            />
          ))}
        </motion.div>

        {/* Ride info pill */}
        <div
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            padding: '14px 16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>{selectedRide?.emoji}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family)' }}>
                {selectedRide?.type}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)' }}>
                {booking?.vehicleNo}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)', fontWeight: 600 }}>
              PAID
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-brand)', fontFamily: 'var(--font-family)' }}>
              Booked ✓
            </div>
          </div>
        </div>

        {/* New ride button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleNewRide}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            border: '2px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'var(--font-family)',
            cursor: 'pointer',
          }}
        >
          Book Another Ride
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TrackingScreen;
