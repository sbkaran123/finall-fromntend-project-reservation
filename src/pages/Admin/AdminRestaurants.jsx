import React, { useState, useEffect } from 'react';
import AdminRestaurantCard from '../../components/AdminRestaurantCard';
import { fetchRestaurants } from '../../utils/api';
import Loading from '../../components/Loading';
import ProtectedRoute from '../../components/ProtectedRoute';
import AddRestaurantModal from '../../components/AddRestaurantModal';

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load restaurants:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute isAdmin={true}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Restaurants</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add Restaurant
          </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {restaurants.map((restaurant) => (
            <AdminRestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
        {showAddModal && <AddRestaurantModal onClose={() => setShowAddModal(false)} />}
      </div>
    </ProtectedRoute>
  );
};

export default AdminRestaurants;