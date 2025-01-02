import React, { useState, useEffect } from 'react';
import { fetchAllReservations } from '../../utils/api';
import AdminReservationCard from '../../components/AdminReservationCard';
import Loading from '../../components/Loading';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await fetchAllReservations();
        setReservations(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load reservations:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadReservations();
  }, []);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute isAdmin={true}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Reservations</h1>
        <div className="grid gap-4">
          {reservations.map((reservation) => (
            <AdminReservationCard
              key={reservation._id}
              reservation={reservation}
            />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminReservations;