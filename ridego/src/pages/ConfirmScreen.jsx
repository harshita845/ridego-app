import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import { useBookingContext } from '../context/BookingContext';
import useBooking from '../hooks/useBooking';
import Toast from '../components/common/Toast';
import { formatFare } from '../utils/formatFare';

const ConfirmScreen = () => {
  const navigate = useNavigate();
  const { destination, selectedRide, calculatedFare, setBooking } = useBookingContext();
  const { confirmBooking, loading, error, resetError } = useBooking();
  const [showToast, setShowToast] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | loading | success

  // Guards
  useEffect(() => {
    if (!destination) { navigate('/home'); return; }
    if (!selectedRide) { navigate('/ride-options'); return; }
  }, [destination, selectedRide, navigate]);

  // Show toast when error occurs
  useEffect(() => {
    if (error) {
      setPhase('idle');
      setShowToast(true);
    }
  }, [error]);

  const handleBook = async () => {
    if (phase !== 'idle') return;
    setPhase('loading');

    const result = await confirmBooking({
      destination,
      rideType: selectedRide?.type,
      fare: calculatedFare,
    });

    if (result) {
      setBooking(result);
      setPhase('success');
      setTimeout(() => navigate('/tracking'), 600);
    }
  };

  const getButtonContent = () => {
    if (phase === 'loading') {
      return (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Loader2 size={20} className="spin" />
          Finding your driver...
        </span>
      );
    }
    return 'Book Now';
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
          background: 'var(--color-surface)',
          padding: '52px 16px 16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/ride-options')}
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'var(--color-bg)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} color="var(--color-text-primary)" />
        </motion.button>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-family)',
          }}
        >
          Confirm Booking
        </div>
      </div>

      <div style={{ padding: '24px 16px' }}>
        {/* Trip summary card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            marginBottom: 20,
          }}
        >
          {/* From */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#EEF2FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#6366F1' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>
                FROM
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family)' }}>
                Mumbai
              </div>
            </div>
          </div>

          {/* Dotted line */}
          <div style={{ marginLeft: 17, marginBottom: 12, borderLeft: '2px dashed var(--color-border)', height: 20 }} />

          {/* To */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--color-brand-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <MapPin size={16} color="var(--color-brand)" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>
                TO
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family)' }}>
                {destination}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--color-border)', marginBottom: 20 }} />

          {/* Ride details */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 28 }}>{selectedRide?.emoji}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family)' }}>
                  {selectedRide?.type}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)' }}>
                  ETA: {selectedRide?.eta}
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: 'var(--color-brand)',
                fontFamily: 'var(--font-family)',
              }}
            >
              {formatFare(calculatedFare)}
            </div>
          </div>
        </motion.div>

        {/* Fare breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Fare Breakdown
          </div>
          {[
            { label: 'Base fare', value: formatFare(selectedRide?.baseFare) },
            { label: `Distance charge (${DISTANCES_DISPLAY[destination] || 100} km × ₹${selectedRide?.perKm}/km)`, value: formatFare(selectedRide?.perKm * (DISTANCES_DISPLAY[destination] || 100)) },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)' }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family)' }}>{value}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--color-border)', margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family)' }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-brand)', fontFamily: 'var(--font-family)' }}>{formatFare(calculatedFare)}</span>
          </div>
        </motion.div>

        {/* Book Now button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <motion.button
            whileTap={phase === 'idle' ? { scale: 0.96 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={handleBook}
            disabled={phase !== 'idle'}
            style={{
              width: '100%',
              padding: '17px',
              borderRadius: '16px',
              border: 'none',
              background: phase !== 'idle' ? '#C43D00' : 'var(--color-brand)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'var(--font-family)',
              cursor: phase !== 'idle' ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 24px rgba(232,80,10,0.4)',
              transition: 'background 0.2s ease',
              letterSpacing: '0.3px',
            }}
          >
            {getButtonContent()}
          </motion.button>

          {/* Cancel link */}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button
              onClick={() => navigate('/ride-options')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-family)',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 16px',
              }}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <Toast
            message={error || 'Booking failed. Please try again.'}
            type="error"
            onDismiss={() => { setShowToast(false); resetError(); }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DISTANCES_DISPLAY = {
  Pune: 148, Nashik: 167, Nagpur: 824, Aurangabad: 335, Lonavala: 83, Shirdi: 240,
};

export default ConfirmScreen;
