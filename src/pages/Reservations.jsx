import React, { useState, useEffect } from 'react';
import { fetchMyReservations } from '../utils/api';
import ReservationCard from '../components/ReservationCard';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadReservations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchMyReservations();
        setReservations(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load reservations:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadReservations();
  }, [user]);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Reservations</h1>
      {user ? (
          <div className="grid gap-4">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation._id} reservation={reservation} isAdmin={false} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700">
          Please log in to view your reservations.
        </p>
      )}
    </div>
  );
};

export default Reservations;