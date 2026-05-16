import { useState, useEffect } from 'react';
import { getRides } from '../services/api';

const useRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRides = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRides();
      setRides(data);
    } catch (err) {
      setError('Could not load rides. Pull down to retry.');
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return { rides, loading, error, refetch: fetchRides };
};

export default useRides;
