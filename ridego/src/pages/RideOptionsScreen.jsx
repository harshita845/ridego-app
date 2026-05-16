import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useBookingContext } from '../context/BookingContext';
import useRides from '../hooks/useRides';
import RideCard from '../components/home/RideCard';
import ProceedButton from '../components/common/ProceedButton';
import SkeletonCard from '../components/common/SkeletonCard';

const DISTANCES = {
  Pune: 148,
  Nashik: 167,
  Nagpur: 824,
  Aurangabad: 335,
  Lonavala: 83,
  Shirdi: 240,
};

const calcFare = (ride, destination) => {
  const km = DISTANCES[destination] || 100;
  return ride.baseFare + ride.perKm * km;
};

const RideOptionsScreen = () => {
  const navigate = useNavigate();
  const {
    destination,
    selectedRide,
    setSelectedRide,
    setCalculatedFare,
  } = useBookingContext();

  const { rides, loading } = useRides();
  const [localSelected, setLocalSelected] = useState(selectedRide);

  // Guard: redirect if no destination
  useEffect(() => {
    if (!destination) navigate('/home');
  }, [destination, navigate]);

  const handleSelect = (ride) => {
    setLocalSelected(ride);
  };

  const handleProceed = () => {
    if (!localSelected) return;
    const fare = calcFare(localSelected, destination);
    setSelectedRide(localSelected);
    setCalculatedFare(fare);
    navigate('/confirm');
  };

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{ paddingBottom: 100 }}
    >
      {/* Top bar */}
      <div
        style={{
          background: 'var(--color-surface)',
          padding: '52px 16px 16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/home')}
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
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={18} color="var(--color-text-primary)" />
          </motion.button>

          {/* Route pill */}
          <div
            style={{
              flex: 1,
              background: 'var(--color-bg)',
              borderRadius: '50px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--color-brand)',
                }}
              />
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
            </div>
            <div
              style={{
                flex: 1,
                height: 1,
                background: 'var(--color-border)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 10,
                  color: 'var(--color-text-secondary)',
                  background: 'var(--color-bg)',
                  padding: '0 4px',
                }}
              >
                →
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={10} color="var(--color-brand)" />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-family)',
                }}
              >
                {destination || '---'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-family)',
            marginBottom: 4,
          }}
        >
          Choose your ride
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family)',
            marginBottom: 20,
          }}
        >
          {destination ? `Fares to ${destination} · ${DISTANCES[destination] || 100} km` : 'Select a ride type'}
        </div>

        {/* Loading */}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {/* Ride cards with dim/highlight logic */}
        {!loading && rides.map((ride, i) => {
          const isSelected = localSelected?._id === ride._id || localSelected?.type === ride.type;
          const isDeselected = localSelected && !isSelected;
          const fare = calcFare(ride, destination);

          return (
            <motion.div
              key={ride._id || ride.type}
              animate={{ opacity: isDeselected ? 0.55 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <RideCard
                ride={ride}
                isSelected={isSelected}
                onSelect={handleSelect}
                fare={fare}
                index={i}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Sticky proceed button */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '390px',
          maxWidth: '100vw',
          padding: '12px 16px 28px',
          background: 'linear-gradient(to top, var(--color-bg) 80%, transparent)',
          zIndex: 50,
        }}
      >
        <ProceedButton
          isEnabled={!!localSelected}
          onPress={handleProceed}
          label="Proceed to Book"
          disabledLabel="Select a Ride"
        />
      </div>
    </motion.div>
  );
};

export default RideOptionsScreen;
