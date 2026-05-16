import { useState, useRef } from 'react';
import { createBooking } from '../services/api';

const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const isSubmitting = useRef(false); // prevent double tap

  const confirmBooking = async ({ destination, rideType, fare }) => {
    if (isSubmitting.current) return null; // guard double tap
    isSubmitting.current = true;
    setLoading(true);
    setError(null);
    try {
      const data = await createBooking({ destination, rideType, fare });
      setBookingData(data);
      return data;
    } catch (err) {
      setError('Booking failed. Please try again.');
      return null;
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  const resetError = () => setError(null);

  return { confirmBooking, loading, error, bookingData, resetError };
};

export default useBooking;
