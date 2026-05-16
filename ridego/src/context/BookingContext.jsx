import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [calculatedFare, setCalculatedFare] = useState(null);
  const [booking, setBooking] = useState(null); // response from POST /api/bookings

  const resetBooking = () => {
    setDestination('');
    setSelectedRide(null);
    setCalculatedFare(null);
    setBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        destination,
        setDestination,
        selectedRide,
        setSelectedRide,
        calculatedFare,
        setCalculatedFare,
        booking,
        setBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookingContext must be used within BookingProvider');
  return ctx;
};

export default BookingContext;
