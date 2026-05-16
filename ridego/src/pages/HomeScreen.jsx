import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search, User, ChevronRight, RefreshCw } from 'lucide-react';
import { useBookingContext } from '../context/BookingContext';
import useRides from '../hooks/useRides';
import SkeletonCard from '../components/common/SkeletonCard';
import { getTimeGreeting } from '../utils/timeGreeting';
import { formatFare } from '../utils/formatFare';

const CITIES = ['Pune', 'Nashik', 'Lonavala', 'Nagpur', 'Aurangabad', 'Shirdi'];

const HomeScreen = () => {
  const navigate = useNavigate();
  const { setDestination, setSelectedRide } = useBookingContext();
  const { rides, loading, error, refetch } = useRides();

  const handleCitySelect = (city) => {
    setDestination(city);
    navigate('/ride-options');
  };

  const handleSearchClick = () => {
    navigate('/ride-options');
  };

  const handleRideCardClick = (ride) => {
    setSelectedRide(ride);
    navigate('/ride-options');
  };

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ paddingBottom: 32 }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '56px 16px 16px',
          background: 'var(--color-surface)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'var(--color-brand-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MapPin size={14} color="var(--color-brand)" />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-family)',
            }}
          >
            Mumbai
          </span>
          <ChevronRight size={14} color="var(--color-text-secondary)" />
        </div>

        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E8500A, #FF7A3D)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <User size={18} color="#fff" />
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            style={{
              fontSize: 15,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family)',
              fontWeight: 500,
              marginBottom: 4,
            }}
          >
            {getTimeGreeting()}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-family)',
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Where are you going?
          </div>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={handleSearchClick}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            marginBottom: 20,
            border: '1.5px solid transparent',
            transition: 'border-color 0.2s',
          }}
        >
          <Search size={18} color="var(--color-brand)" />
          <span
            style={{
              flex: 1,
              fontSize: 14,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family)',
            }}
          >
            Enter destination...
          </span>
          <MapPin size={18} color="var(--color-disabled)" />
        </motion.div>

        {/* Popular Destinations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family)',
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Popular Destinations
          </div>
          <div className="scroll-row" style={{ marginBottom: 24 }}>
            {CITIES.map((city, i) => (
              <motion.button
                key={city}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCitySelect(city)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '8px 14px',
                  borderRadius: '50px',
                  background: 'var(--color-surface)',
                  border: '1.5px solid var(--color-border)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-family)',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <MapPin size={11} color="var(--color-brand)" />
                {city}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Ride Category Section */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family)',
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Ride Categories
        </div>

        {/* Loading skeletons */}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {/* Error state */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '32px 16px',
            }}
          >
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-family)',
              }}
            >
              {error}
            </div>
            <button
              onClick={refetch}
              style={{
                marginTop: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--color-brand)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-family)',
              }}
            >
              <RefreshCw size={14} /> Retry
            </button>
          </motion.div>
        )}

        {/* Ride Cards */}
        {!loading && !error && rides.map((ride, i) => (
          <motion.div
            key={ride._id || ride.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 280, damping: 24 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRideCardClick(ride)}
            style={{
              background: 'var(--color-surface)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 12,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              border: '2px solid transparent',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: '#F7F7F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                flexShrink: 0,
              }}
            >
              {ride.emoji}
            </div>
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
                {ride.type}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-family)',
                }}
              >
                Up to {ride.capacity} {ride.capacity === 1 ? 'passenger' : 'passengers'}
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--color-brand)',
                fontFamily: 'var(--font-family)',
              }}
            >
              From {formatFare(ride.baseFare)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeScreen;
