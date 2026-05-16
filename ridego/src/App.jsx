import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import SplashScreen from './pages/SplashScreen';
import HomeScreen from './pages/HomeScreen';
import RideOptionsScreen from './pages/RideOptionsScreen';
import ConfirmScreen from './pages/ConfirmScreen';
import TrackingScreen from './pages/TrackingScreen';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            padding: '24px 0',
          }}
        >
          {/* Phone frame */}
          <div
            style={{
              width: 390,
              minHeight: 844,
              borderRadius: 40,
              overflow: 'hidden',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 100px rgba(0,0,0,0.5)',
              background: '#F7F7F7',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/splash" replace />} />
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/ride-options" element={<RideOptionsScreen />} />
              <Route path="/confirm" element={<ConfirmScreen />} />
              <Route path="/tracking" element={<TrackingScreen />} />
              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/splash" replace />} />
            </Routes>
          </div>
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
